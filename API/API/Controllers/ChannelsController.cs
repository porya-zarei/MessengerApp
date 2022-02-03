namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ChannelsController : ControllerBase
{
    private readonly IChannelsRepository channelsRepository;
    private readonly IChannelsChatsRepository channelsChatsRepository;
    private readonly IHubContext<UsersHub> usersHub;
    private readonly IWebHostEnvironment webHostEnvironment;

    public ChannelsController(APIContext _context, IHubContext<UsersHub> _usersHub, IWebHostEnvironment _webHostEnvironment)
    {
        channelsRepository = new ChannelsRepository(_context);
        channelsChatsRepository = new ChannelsChatsRepository(_context);
        usersHub = _usersHub;
        webHostEnvironment = _webHostEnvironment;
    }

    [Authorize]
    [HttpPost("CreateChannel")]
    public async Task<IActionResult> UserCreateChannel(CreateChannel channel)
    {
        var ch = channel.CreateChannelToChannel();
        var res = channelsRepository.AddChannel(ch);
        if (!res)
        {
            return BadRequest();
        }
        await usersHub.Clients
                .Clients(channelsRepository.GetChannelUsersConnectionID(ch.ChannelID))
                .SendAsync("NewChannel", channelsRepository.ChannelToOutputChannel(ch));
        return Created("createChannel", "Channel Created successfully");
    }

    [Authorize]
    [HttpPost("JoinChannel")]
    public async Task<IActionResult> UserJoinChannel(JoiningChannel joiningChannel)
    {
        var res = await channelsRepository.JoinChannel(joiningChannel.UserID, joiningChannel.ChannelID);
        if (!res)
        {
            return BadRequest();
        }
        var channel = await channelsRepository.GetChannelWithChannelID(joiningChannel.ChannelID);
        var connId = await channelsRepository.GetConnectionIdWithUserId(joiningChannel.UserID);
        await usersHub.Clients
                .Client(connId)
                .SendAsync("JoinChannel", channelsRepository.ChannelToOutputChannel(channel));
        var others = channelsRepository.GetChannelUsersConnectionID(joiningChannel.ChannelID);
        others.Remove(connId);
        await usersHub.Clients
                .Clients(others)
                .SendAsync("UserJoinedChannel", channelsRepository.ChannelToOutputChannel(channel));
        return Ok(res);
    }

    [Authorize]
    [HttpPost("SendChannelChat")]
    public async Task<IActionResult> SendChannelChat([FromForm] SendChannelChat sendChannelChat)
    {
        var userID = new Guid(User.FindFirst("UserID").Value);
        sendChannelChat.SenderID = userID;
        if (channelsChatsRepository.CheckUserAccess(userID, sendChannelChat.SenderID, sendChannelChat.ChannelID))
        {
            var channelChat = sendChannelChat.SendChannelChatToChannelChat();
            // upload =>

            var uploader = new Uploader();

            if (sendChannelChat.File != null)
            {
                channelChat.File = await uploader.UploadFile(sendChannelChat.File, webHostEnvironment.WebRootPath);
                channelChat.FileSize = sendChannelChat.File.Length;
            }
            if (sendChannelChat.Image != null && sendChannelChat.Video == null)
            {
                channelChat.Image = await uploader.UploadImage(sendChannelChat.Image, webHostEnvironment.WebRootPath);
                channelChat.ImageSize = sendChannelChat.Image.Length;
            }
            if (sendChannelChat.Video != null && sendChannelChat.Image == null)
            {
                channelChat.Video = await uploader.UploadVideo(sendChannelChat.Video, webHostEnvironment.WebRootPath);
                channelChat.VideoSize = sendChannelChat.Video.Length;
            }
            if (sendChannelChat.Voice != null)
            {
                channelChat.Voice = await uploader.UploadVoice(sendChannelChat.Voice, webHostEnvironment.WebRootPath);
                channelChat.VoiceSize = sendChannelChat.Voice.Length;
            }

            // end upload
            await channelsChatsRepository.AddChatToChannel(channelChat);
            await usersHub.Clients
                .Clients(channelsRepository.GetChannelUsersConnectionID(sendChannelChat.ChannelID))
                .SendAsync("NewChannelChat", channelsChatsRepository.GetOutputChannelChat(channelChat));
            return Created("Created at SendChannelChat", "created successfully");
        }
        else
        {
            return BadRequest("access denied");
        }
    }

    [Authorize]
    [HttpPost("LeaveChannel")]
    public async Task<IActionResult> LeaveChannel(LeaveTheChannel leaveChannel)
    {
        var authId = new Guid(User.FindFirst("UserID").Value);
        if (leaveChannel.UserID != authId)
        {
            return BadRequest();
        }
        try
        {
            var userConnection = await channelsRepository.GetConnectionIdWithUserId(leaveChannel.UserID);
            var creatorId = await channelsRepository.GetChannelCreatorID(leaveChannel.ChannelID);
            if (creatorId == leaveChannel.UserID)
            {
                var connectionIds = await channelsRepository.DeleteChannelComplete(leaveChannel.UserID, leaveChannel.ChannelID);
                if (connectionIds != null)
                {
                    await usersHub.Clients
                                   .Clients(connectionIds)
                                   .SendAsync("ChannelDeletedComplete", leaveChannel.ChannelID);
                    return Ok();
                }
                else
                {
                    return BadRequest();
                }
            }
            else
            {
                var res = await channelsRepository.LeaveChannel(leaveChannel.UserID, leaveChannel.ChannelID);
                if (res)
                {
                    var otherConnectionsId = channelsRepository.GetChannelUsersConnectionID(leaveChannel.ChannelID);
                    var channel = await channelsRepository.GetChannelWithChannelID(leaveChannel.ChannelID);
                    await usersHub.Clients.Clients(otherConnectionsId).SendAsync("UserLeavedChannel", channelsRepository.ChannelToOutputChannel(channel));
                    await usersHub.Clients.Client(userConnection).SendAsync("ChannelRemoved", leaveChannel.ChannelID);
                    return Ok();
                }
                else
                {
                    return BadRequest();
                }
            }
        }
        catch (Exception)
        {
            return BadRequest();
        }
    }

    [Authorize]
    [HttpPost("UpdateChannelChat")]
    public async Task<IActionResult> UpdateChannelChat(ChatUpdate chatUpdate)
    {
        var userId = new Guid(User.FindFirst("UserID").Value);
        try
        {
            string fileName = null, imageName = null, voiceName = null, videoName = null;
            if (chatUpdate.File != null || chatUpdate.Image != null || chatUpdate.Video != null || chatUpdate.Voice != null)
            {
                var uploader = new Uploader();
                if (chatUpdate.File != null)
                {
                    fileName = await uploader.UploadFile(chatUpdate.File, webHostEnvironment.WebRootPath);
                }
                if (chatUpdate.Image != null)
                {
                    imageName = await uploader.UploadImage(chatUpdate.Image, webHostEnvironment.WebRootPath);
                }
                if (chatUpdate.Voice != null)
                {
                    voiceName = await uploader.UploadVoice(chatUpdate.Voice, webHostEnvironment.WebRootPath);
                }
                if (chatUpdate.Video != null)
                {
                    videoName = await uploader.UploadVideo(chatUpdate.Video, webHostEnvironment.WebRootPath);
                }
            }
            var res = await channelsChatsRepository.UpdateChannelChat(chatUpdate, fileName, imageName, userId, videoName, voiceName);
            if (res)
            {
                var channel = await channelsRepository.GetChannelWithChatID(chatUpdate.ChatID);
                var connectionsId = channelsRepository.GetChannelUsersConnectionID(channel.ChannelID);
                var chat = await channelsChatsRepository.ChannelChatIDToOutputChannelChat(chatUpdate.ChatID);
                await usersHub.Clients.Clients(connectionsId).SendAsync("ChannelChatUpdated", chat);
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }
        catch (Exception)
        {
            return BadRequest();
        }
    }

    [Authorize]
    [HttpPost("DeleteChannelChat")]
    public async Task<IActionResult> DeleteChannelChat(ChatDelete chatDelete)
    {
        var userId = new Guid(User.FindFirst("UserID").Value);
        try
        {
            var channelId = await channelsChatsRepository.DeleteChannelChat(chatDelete.ChatID, userId);
            if (channelId != null)
            {
                var channel = await channelsRepository.GetChannelWithChannelID(new Guid(channelId));
                var connectionsId = channelsRepository.GetChannelUsersConnectionID(channel.ChannelID);
                var resp = new Dictionary<string, Guid>()
                    {
                        { "ChatID", chatDelete.ChatID },
                        { "ChannelID", new Guid(channelId) }
                    };
                await usersHub.Clients.Clients(connectionsId).SendAsync("ChannelChatDeleted", resp);
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }
        catch (Exception)
        {
            return BadRequest();
        }
    }

    [Authorize]
    [HttpPost("UpdateChannel")]
    public async Task<IActionResult> UpdateChannel([FromForm] UpdateChannel updateChannel)
    {
        var userId = new Guid(User.FindFirst("UserID").Value);
        string imageName = null;
        if (updateChannel.ChannelProfileImage != null)
        {
            var uploader = new Uploader();
            imageName = await uploader.UploadImageWithPath(updateChannel.ChannelProfileImage, "channels", webHostEnvironment.WebRootPath);
        }

        var res = await channelsRepository.UpdateChannel(updateChannel, imageName, userId);

        if (res)
        {
            var channel = await channelsRepository.GetChannelWithChannelID(updateChannel.ChannelID);
            var output = channelsRepository.ChannelToOutputChannel(channel);
            var connections = channelsRepository.GetChannelUsersConnectionID(updateChannel.ChannelID);
            await usersHub.Clients.Clients(connections).SendAsync("ChannelUpdated", output);
            return Ok(res);
        }
        else
            return BadRequest(res);
    }

    [Authorize]
    [HttpPost("GetChannelUsers")]
    public async Task<IActionResult> GetChannelUsers(ID id)
    {
        var userId = new Guid(User.FindFirst("UserID").Value);
        if (await channelsRepository.IsAdmin(id.Id, userId))
        {
            var res = await channelsRepository.GetChannelUsers(id.Id);
            if (res == null)
                return BadRequest();
            return Ok(res);
        }
        return BadRequest();
    }

    [Authorize]
    [HttpPost("AddAdminToChannel")]
    public async Task<IActionResult> AddAdmin(ChangeChannelAdmin change)
    {
        var userId = new Guid(User.FindFirst("UserID").Value);
        var res = await channelsRepository.AddAdminToChannel(change.ChannelID, userId, change.UserID);

        if (!res)
            return BadRequest(res);

        var channel = await channelsRepository.GetChannelWithChannelID(change.ChannelID);
        var output = channelsRepository.ChannelToOutputChannel(channel);
        var connections = channelsRepository.GetChannelUsersConnectionID(change.ChannelID);
        var users = await channelsRepository.GetChannelUsers(change.ChannelID);
        await usersHub.Clients.Clients(connections).SendAsync("ChannelUpdated", output);
        return Ok(users);
    }

    [Authorize]
    [HttpPost("RemoveAdminFromChannel")]
    public async Task<IActionResult> RemoveAdmin(ChangeChannelAdmin change)
    {
        var userId = new Guid(User.FindFirst("UserID").Value);
        var res = await channelsRepository.RemoveAdminFromChannel(change.ChannelID, userId, change.UserID);

        if (!res)
            return BadRequest(res);

        var channel = await channelsRepository.GetChannelWithChannelID(change.ChannelID);
        var output = channelsRepository.ChannelToOutputChannel(channel);
        var connections = channelsRepository.GetChannelUsersConnectionID(change.ChannelID);
        var users = await channelsRepository.GetChannelUsers(change.ChannelID);
        await usersHub.Clients.Clients(connections).SendAsync("ChannelUpdated", output);
        return Ok(users);
    }

    [Authorize]
    [HttpPost("RemoveUserFromChannel")]
    public async Task<IActionResult> RemoveUserFromChannel(LeaveTheChannel leaveChannel)
    {
        var authId = new Guid(User.FindFirst("UserID").Value);
        try
        {
            if (
                (
                    (await channelsRepository.IsAdmin(leaveChannel.ChannelID, authId)) &&
                    !(await channelsRepository.IsCreator(leaveChannel.ChannelID, leaveChannel.UserID)) &&
                    !(await channelsRepository.IsAdmin(leaveChannel.ChannelID, leaveChannel.UserID)
                )
                ||
                (
                    await channelsRepository.IsCreator(leaveChannel.ChannelID, authId)) &&
                    !(await channelsRepository.IsCreator(leaveChannel.ChannelID, leaveChannel.UserID))
                )
               )
            {
                var res = await channelsRepository.RemoveUserFromChannel(leaveChannel.UserID, leaveChannel.ChannelID);
                if (res)
                {
                    var userConnection = await channelsRepository.GetConnectionIdWithUserId(leaveChannel.UserID);
                    var otherConnectionsId = channelsRepository.GetChannelUsersConnectionID(leaveChannel.ChannelID);
                    var channel = await channelsRepository.GetChannelWithChannelID(leaveChannel.ChannelID);
                    var users = await channelsRepository.GetChannelUsers(leaveChannel.ChannelID);
                    await usersHub.Clients.Clients(otherConnectionsId).SendAsync("UserLeavedChannel", channelsRepository.ChannelToOutputChannel(channel));
                    await usersHub.Clients.Client(userConnection).SendAsync("ChannelRemoved", leaveChannel.ChannelID);
                    return Ok(users);
                }
                else
                {
                    return BadRequest();
                }
            }
            else
            {
                return BadRequest();
            }
        }
        catch (Exception)
        {
            return BadRequest();
        }
    }
}
