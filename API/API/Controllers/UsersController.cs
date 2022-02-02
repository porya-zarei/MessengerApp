namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UsersController : ControllerBase
{
    private readonly IUsersRepository usersRepository;
    private IHubContext<UsersHub> usersHub;
    private ILogger<UsersController> logger;

    private readonly IRoomsChatsRepository roomsChatsRepository;
    private readonly IGroupsChatsRepository groupsChatsRepository;
    private readonly IChannelsChatsRepository channelsChatsRepository;

    private readonly IWebHostEnvironment webHostEnvironment;

    public UsersController(
        APIContext context,
        IHubContext<UsersHub> _usersHub,
        ILogger<UsersController> _logger,
        IWebHostEnvironment _webHostEnvironment
        )
    {
        usersRepository = new UsersRepository(context);
        usersHub = _usersHub;
        logger = _logger;
        webHostEnvironment = _webHostEnvironment;
        roomsChatsRepository = new RoomsChatsRepository(context);
        groupsChatsRepository = new GroupsChatsRepository(context);
        channelsChatsRepository = new ChannelsChatsRepository(context);
    }

    [HttpPost("SetUserConnectionId")]
    [Authorize]
    public async Task<IActionResult> SetUserConnectionId(ReconnectUser reconnectUser)
    {
        var userID = new Guid(User.FindFirst("UserID").Value);
        if (reconnectUser.ConnectionID != null)
        {
            bool res = await usersRepository.SetConnectionId(userID, reconnectUser.ConnectionID);
            if (res)
            {
                var user = await usersRepository.GetUserWithUserID(userID);
                await usersHub.Clients.Client(reconnectUser.ConnectionID).SendAsync("GetMainUserData", user);
                return Ok(reconnectUser.ConnectionID);
            }
        }
        return BadRequest();
    }

    [Authorize]
    [HttpPost("UpdateUser")]
    public async Task<IActionResult> UpdateUser([FromForm] UpdateUser updateUser)
    {
        var userId = new Guid(User.FindFirst("UserID").Value);
        try
        {
            string imageName = null;
            if (updateUser.Image != null)
            {
                var uploader = new Uploader();
                imageName = await uploader.UploadProfileImage(updateUser.Image, webHostEnvironment.WebRootPath);
            }
            var user = await usersRepository.UpdateUserInfo(updateUser, userId, imageName);
            if (user != null)
            {
                await usersHub.Clients.Client(user.CurrentConnectionID).SendAsync("UpdatedUser", user);
                return Ok(user);
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
    [HttpPost("ForwardChats")]
    public async Task<IActionResult> ForwardChats(ForwardChat forwardChats)
    {
        var userId = new Guid(User.FindFirst("UserID").Value);
        var result = new OutputForwardChat
        {
            OutputRoomChats = new List<OutputRoomChat>() { },
            OutputGroupChats = new List<OutputGroupChat>() { },
            OutputChannelChats = new List<OutputChannelChat>() { }
        };
        if (forwardChats.Type == ChatType.Room)
        {
            var chatsToAdd = new List<ForwardChatContent>() { };
            foreach (var chId in forwardChats.ChatsID)
            {
                var chat = await roomsChatsRepository.GetRoomChatWithChatID(chId);
                var fChat = new ForwardChatContent()
                {
                    Text = chat.Text,
                    SenderID = userId,
                    SendingTime = DateTime.Now,
                    File = chat.File,
                    Image = chat.Image,
                    FileSize = chat.FileSize,
                    ImageSize = chat.ImageSize,
                    Video = chat.Video,
                    Voice = chat.Voice,
                    VideoSize = chat.VideoSize,
                    VoiceSize = chat.VoiceSize,
                };
                chatsToAdd.Add(fChat);
            }

            List<string> allConnections = new List<string>() { };

            if (forwardChats.RoomsID.Count > 0 && forwardChats.RoomsID != null)
            {
                var roomsOut = await roomsChatsRepository.ForwardChatsToRooms(forwardChats.RoomsID, chatsToAdd);
                allConnections.AddRange(roomsOut.ConnectionsId);
                result.OutputRoomChats.AddRange(roomsOut.OutputRoomChats);
            }

            if (forwardChats.GroupsID.Count > 0 && forwardChats.GroupsID != null)
            {
                var groupsOut = await groupsChatsRepository.ForwardChatsToGroups(forwardChats.GroupsID, chatsToAdd);
                allConnections.AddRange(groupsOut.ConnectionsId);
                result.OutputGroupChats.AddRange(groupsOut.OutputGroupChats);
            }
            if (forwardChats.ChannelsID.Count > 0 && forwardChats.ChannelsID != null)
            {
                var channelsOut = await channelsChatsRepository.ForwardChatsToChannels(forwardChats.ChannelsID, chatsToAdd);
                allConnections.AddRange(channelsOut.ConnectionsId);
                result.OutputChannelChats.AddRange(channelsOut.OutputChannelChats);
            }

            await usersHub.Clients.Clients(allConnections.Distinct()).SendAsync("NewForwardChatsSended", result);
            return Ok(result);
        }
        else if (forwardChats.Type == ChatType.Group)
        {
            var chatsToAdd = new List<ForwardChatContent>() { };
            foreach (var chId in forwardChats.ChatsID)
            {
                var chat = await groupsChatsRepository.GetGroupChatWithChatID(chId);
                var fChat = new ForwardChatContent()
                {
                    Text = chat.Text,
                    SenderID = userId,
                    SendingTime = DateTime.Now,
                    File = chat.File,
                    Image = chat.Image,
                    FileSize = chat.FileSize,
                    ImageSize = chat.ImageSize,
                    Video = chat.Video,
                    Voice = chat.Voice,
                    VideoSize = chat.VideoSize,
                    VoiceSize = chat.VoiceSize
                };
                chatsToAdd.Add(fChat);
            }

            List<string> allConnections = new List<string>() { };

            if (forwardChats.RoomsID.Count > 0 && forwardChats.RoomsID != null)
            {
                var roomsOut = await roomsChatsRepository.ForwardChatsToRooms(forwardChats.RoomsID, chatsToAdd);
                allConnections.AddRange(roomsOut.ConnectionsId);
                result.OutputRoomChats.AddRange(roomsOut.OutputRoomChats);
            }

            if (forwardChats.GroupsID.Count > 0 && forwardChats.GroupsID != null)
            {
                var groupsOut = await groupsChatsRepository.ForwardChatsToGroups(forwardChats.GroupsID, chatsToAdd);
                allConnections.AddRange(groupsOut.ConnectionsId);
                result.OutputGroupChats.AddRange(groupsOut.OutputGroupChats);
            }
            if (forwardChats.ChannelsID.Count > 0 && forwardChats.ChannelsID != null)
            {
                var channelsOut = await channelsChatsRepository.ForwardChatsToChannels(forwardChats.ChannelsID, chatsToAdd);
                allConnections.AddRange(channelsOut.ConnectionsId);
                result.OutputChannelChats.AddRange(channelsOut.OutputChannelChats);
            }

            await usersHub.Clients.Clients(allConnections.Distinct()).SendAsync("NewForwardChatsSended", result);
            return Ok(result);
        }
        else
        {
            var chatsToAdd = new List<ForwardChatContent>() { };
            foreach (var chId in forwardChats.ChatsID)
            {
                var chat = await channelsChatsRepository.GetChannelChatWithChatID(chId);
                var fChat = new ForwardChatContent()
                {
                    Text = chat.Text,
                    SenderID = userId,
                    SendingTime = DateTime.Now,
                    File = chat.File,
                    Image = chat.Image,
                    FileSize = chat.FileSize,
                    ImageSize = chat.ImageSize,
                    Video = chat.Video,
                    Voice = chat.Voice,
                    VideoSize = chat.VideoSize,
                    VoiceSize = chat.VoiceSize,
                };
                chatsToAdd.Add(fChat);
            }

            List<string> allConnections = new List<string>() { };

            if (forwardChats.RoomsID.Count > 0 && forwardChats.RoomsID != null)
            {
                var roomsOut = await roomsChatsRepository.ForwardChatsToRooms(forwardChats.RoomsID, chatsToAdd);
                allConnections.AddRange(roomsOut.ConnectionsId);
                result.OutputRoomChats.AddRange(roomsOut.OutputRoomChats);
            }
            if (forwardChats.GroupsID.Count > 0 && forwardChats.GroupsID != null)
            {
                var groupsOut = await groupsChatsRepository.ForwardChatsToGroups(forwardChats.GroupsID, chatsToAdd);
                allConnections.AddRange(groupsOut.ConnectionsId);
                result.OutputGroupChats.AddRange(groupsOut.OutputGroupChats);
            }
            if (forwardChats.ChannelsID.Count > 0 && forwardChats.ChannelsID != null)
            {
                var channelsOut = await channelsChatsRepository.ForwardChatsToChannels(forwardChats.ChannelsID, chatsToAdd);
                allConnections.AddRange(channelsOut.ConnectionsId);
                result.OutputChannelChats.AddRange(channelsOut.OutputChannelChats);
            }

            await usersHub.Clients.Clients(allConnections.Distinct()).SendAsync("NewForwardChats", result);
            return Ok(result);
        }
    }
}