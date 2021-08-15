using APIDataLayer.Context;
using APIDataLayer.Interfaces;
using APIDataLayer.Services;
using APIDataLayer.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using API.Hubs;
using Microsoft.AspNetCore.Hosting;
using API.Utils;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroupsController : ControllerBase
    {
        private readonly IGroupsRepository groupsRepository;
        private readonly IGroupsChatsRepository groupsChatsRepository;
        private readonly IHubContext<UsersHub> usersHub;
        private IWebHostEnvironment webHostEnvironment;

        public GroupsController(APIContext context, IHubContext<UsersHub> _usersHub, IWebHostEnvironment _webHostEnvironment)
        {
            groupsRepository = new GroupsRepository(context);
            groupsChatsRepository = new GroupsChatsRepository(context);
            usersHub = _usersHub;
            webHostEnvironment = _webHostEnvironment;
        }

        [Authorize]
        [HttpPost("CreateGroup")]
        public async Task<IActionResult> UserCreateGroup(CreateGroup group)
        {
            var g = group.CreateGroupToGroup();
            var res = groupsRepository.AddGroup(g);
            if (!res)
            {
                return BadRequest();
            }
            await usersHub.Clients
                    .Clients(groupsRepository.GetGroupUsersConnectionID(g.GroupID))
                    .SendAsync("NewGroup", groupsRepository.GroupToOutputGroup(g));
            return Created("createGroup", "Group Created successfully");
        }

        [Authorize]
        [HttpPost("JoinGroup")]
        public async Task<IActionResult> UserJoinGroup(JoiningGroup joiningGroup)
        {
            var res = await groupsRepository.JoinGroup(joiningGroup.UserID, joiningGroup.GroupID);
            if (!res)
            {
                return BadRequest();
            }
            var group = await groupsRepository.GetGroupWithGroupID(joiningGroup.GroupID);
            var connId = await groupsRepository.GetConnectionIdWithUserId(joiningGroup.UserID);
            await usersHub.Clients
                    .Client(connId)
                    .SendAsync("JoinGroup", groupsRepository.GroupToOutputGroup(group));
            var others = groupsRepository.GetGroupUsersConnectionID(joiningGroup.GroupID);
            others.Remove(connId);
            await usersHub.Clients
                    .Clients(others)
                    .SendAsync("UserJoinedGroup", groupsRepository.GroupToOutputGroup(group));
            return Ok(res);
        }

        [Authorize]
        [HttpPost("SendGroupChat")]
        public async Task<IActionResult> SendGroupChat([FromForm] SendGroupChat sendGroupChat)
        {
            var userID = new Guid(User.FindFirst("UserID").Value);
            sendGroupChat.SenderID = userID;
            if (groupsChatsRepository.CheckUserAccess(userID, sendGroupChat.SenderID, sendGroupChat.GroupID))
            {
                var groupChat = sendGroupChat.SendGroupChatToGroupChat();
                // upload =>
                if (sendGroupChat.File != null || sendGroupChat.Image != null)
                {
                    var uploader = new Uploader();
                    if (sendGroupChat.File != null)
                    {
                        groupChat.File = await uploader.UploadFile(sendGroupChat.File, webHostEnvironment.WebRootPath);
                        groupChat.FileSize = sendGroupChat.File.Length;
                    }
                    if (sendGroupChat.Image != null && sendGroupChat.Video == null)
                    {
                        groupChat.Image = await uploader.UploadImage(sendGroupChat.Image, webHostEnvironment.WebRootPath);
                        groupChat.ImageSize = sendGroupChat.Image.Length;
                    }
                    if (sendGroupChat.Video != null && sendGroupChat.Image == null)
                    {
                        groupChat.Video = await uploader.UploadVideo(sendGroupChat.Video, webHostEnvironment.WebRootPath);
                        groupChat.VideoSize = sendGroupChat.Video.Length;
                    }
                    if (sendGroupChat.Voice != null)
                    {
                        groupChat.Voice = await uploader.UploadVoice(sendGroupChat.Voice, webHostEnvironment.WebRootPath);
                        groupChat.VoiceSize = sendGroupChat.Voice.Length;
                    }
                }
                // end upload
                await groupsChatsRepository.AddChatToGroup(groupChat);
                var gc = groupsChatsRepository.GetOutputGroupChat(groupChat);
                gc.SenderID = userID;
                await usersHub.Clients
                    .Clients(groupsRepository.GetGroupUsersConnectionID(sendGroupChat.GroupID))
                    .SendAsync("NewGroupChat", gc);
                return Created("Created at SendGroupChat", "created successfully");
            }
            else
            {
                return BadRequest("access denied");
            }
        }

        [Authorize]
        [HttpPost("LeaveGroup")]
        public async Task<IActionResult> LeaveGroup(LeaveTheGroup leaveGroup)
        {
            var authId = new Guid(User.FindFirst("UserID").Value);
            if (leaveGroup.UserID != authId)
            {
                return BadRequest();
            }
            try
            {
                var userConnection = await groupsRepository.GetConnectionIdWithUserId(leaveGroup.UserID);
                var creatorId = await groupsRepository.GetGroupCreatorID(leaveGroup.GroupID);
                if (creatorId == leaveGroup.UserID)
                {
                    var connectionIds = await groupsRepository.DeleteGroupComplete(leaveGroup.UserID, leaveGroup.GroupID);
                    if (connectionIds != null)
                    {
                        connectionIds.Add(userConnection);
                        await usersHub.Clients
                                       .Clients(connectionIds.Distinct())
                                       .SendAsync("GroupDeletedComplete", leaveGroup.GroupID);
                        return Ok();
                    }
                    else
                    {
                        return BadRequest();
                    }
                }
                else
                {
                    var res = await groupsRepository.LeaveGroup(leaveGroup.UserID, leaveGroup.GroupID);
                    if (res)
                    {
                        var otherConnectionsId = groupsRepository.GetGroupUsersConnectionID(leaveGroup.GroupID);
                        var group = await groupsRepository.GetGroupWithGroupID(leaveGroup.GroupID);
                        await usersHub.Clients.Clients(otherConnectionsId).SendAsync("UserLeavedGroup", groupsRepository.GroupToOutputGroup(group));
                        await usersHub.Clients.Client(userConnection).SendAsync("GroupRemoved", leaveGroup.GroupID);
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
        [HttpPost("UpdateGroupChat")]
        public async Task<IActionResult> UpdateGroupChat(ChatUpdate chatUpdate)
        {
            var userId = new Guid(User.FindFirst("UserID").Value);
            try
            {
                string fileName = null, imageName = null, voiceName = null, videoName = null;
                if (chatUpdate.File != null || chatUpdate.Image != null || chatUpdate.Voice != null || chatUpdate.Video != null)
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
                    if (chatUpdate.Video != null)
                    {
                        videoName = await uploader.UploadVideo(chatUpdate.Video, webHostEnvironment.WebRootPath);
                    }
                    if (chatUpdate.Voice != null)
                    {
                        voiceName = await uploader.UploadVoice(chatUpdate.Voice, webHostEnvironment.WebRootPath);
                    }
                }
                var res = await groupsChatsRepository.UpdateGroupChat(chatUpdate, fileName, imageName, userId, videoName, voiceName);
                if (res)
                {
                    var group = await groupsRepository.GetGroupWithChatID(chatUpdate.ChatID);
                    var connectionsId = groupsRepository.GetGroupUsersConnectionID(group.GroupID);
                    var chat = await groupsChatsRepository.GroupChatIDToOutputGroupChat(chatUpdate.ChatID);
                    await usersHub.Clients.Clients(connectionsId).SendAsync("GroupChatUpdated", chat);
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
        [HttpPost("DeleteGroupChat")]
        public async Task<IActionResult> DeleteGroupChat(ChatDelete chatDelete)
        {
            var userId = new Guid(User.FindFirst("UserID").Value);
            try
            {
                var groupId = await groupsChatsRepository.DeleteGroupChat(chatDelete.ChatID, userId);
                if (groupId != null)
                {
                    var group = await groupsRepository.GetGroupWithGroupID(new Guid(groupId));
                    var connectionsId = groupsRepository.GetGroupUsersConnectionID(group.GroupID);
                    var resp = new Dictionary<string, Guid>()
                    {
                        { "ChatID", chatDelete.ChatID },
                        { "GroupID", new Guid(groupId) }
                    };
                    await usersHub.Clients.Clients(connectionsId).SendAsync("GroupChatDeleted", resp);
                    return Ok(resp);
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
        [HttpPost("UpdateGroup")]
        public async Task<IActionResult> UpdateGroup([FromForm] UpdateGroup updateGroup)
        {
            var userId = new Guid(User.FindFirst("UserID").Value);
            string imageName = null;
            if (updateGroup.GroupProfileImage != null)
            {
                var uploader = new Uploader();
                imageName = await uploader.UploadImageWithPath(updateGroup.GroupProfileImage, "groups", webHostEnvironment.WebRootPath);
            }

            var res = await groupsRepository.UpdateGroup(updateGroup, imageName, userId);

            if (res)
            {
                var group = await groupsRepository.GetGroupWithGroupID(updateGroup.GroupID);
                var output = groupsRepository.GroupToOutputGroup(group);
                var connections = groupsRepository.GetGroupUsersConnectionID(updateGroup.GroupID);
                await usersHub.Clients.Clients(connections).SendAsync("GroupUpdated", output);
                return Ok(res);
            }
            else
                return BadRequest(res);
        }

        [Authorize]
        [HttpPost("GetGroupUsers")]
        public async Task<IActionResult> GetGroupUsers(ID id)
        {
            var userId = new Guid(User.FindFirst("UserID").Value);
            if (await groupsRepository.IsAdmin(id.Id, userId))
            {
                var res = await groupsRepository.GetGroupUsers(id.Id);
                if (res == null)
                    return BadRequest();
                return Ok(res);
            }
            return BadRequest();
        }

        [Authorize]
        [HttpPost("AddAdminToGroup")]
        public async Task<IActionResult> AddAdmin(ChangeGroupAdmin change)
        {
            var userId = new Guid(User.FindFirst("UserID").Value);
            var res = await groupsRepository.AddAdminToGroup(change.GroupID, userId, change.UserID);

            if (!res)
                return BadRequest(res);

            var group = await groupsRepository.GetGroupWithGroupID(change.GroupID);
            var output = groupsRepository.GroupToOutputGroup(group);
            var connections = groupsRepository.GetGroupUsersConnectionID(change.GroupID);
            var users = await groupsRepository.GetGroupUsers(change.GroupID);
            await usersHub.Clients.Clients(connections).SendAsync("GroupUpdated", output);
            return Ok(users);
        }

        [Authorize]
        [HttpPost("RemoveAdminFromGroup")]
        public async Task<IActionResult> RemoveAdmin(ChangeGroupAdmin change)
        {
            var userId = new Guid(User.FindFirst("UserID").Value);
            var res = await groupsRepository.RemoveAdminFromGroup(change.GroupID, userId, change.UserID);

            if (!res)
                return BadRequest(res);

            var group = await groupsRepository.GetGroupWithGroupID(change.GroupID);
            var output = groupsRepository.GroupToOutputGroup(group);
            var connections = groupsRepository.GetGroupUsersConnectionID(change.GroupID);
            var users = await groupsRepository.GetGroupUsers(change.GroupID);
            await usersHub.Clients.Clients(connections).SendAsync("GroupUpdated", group);
            return Ok(users);
        }

        [Authorize]
        [HttpPost("RemoveUserFromGroup")]
        public async Task<IActionResult> RemoveUserFromGroup(LeaveTheGroup leaveGroup)
        {
            var authId = new Guid(User.FindFirst("UserID").Value);
            try
            {
                if (
                    (
                        (await groupsRepository.IsAdmin(leaveGroup.GroupID, authId)) &&
                        !(await groupsRepository.IsCreator(leaveGroup.GroupID, leaveGroup.UserID)) &&
                        !(await groupsRepository.IsAdmin(leaveGroup.GroupID, leaveGroup.UserID)
                    )
                    ||
                    (
                        await groupsRepository.IsCreator(leaveGroup.GroupID, authId)) &&
                        !(await groupsRepository.IsCreator(leaveGroup.GroupID, leaveGroup.UserID))
                    )
                   )
                {
                    var res = await groupsRepository.RemoveUserFromGroup(leaveGroup.UserID, leaveGroup.GroupID);
                    if (res)
                    {
                        var userConnection = await groupsRepository.GetConnectionIdWithUserId(leaveGroup.UserID);
                        var otherConnectionsId = groupsRepository.GetGroupUsersConnectionID(leaveGroup.GroupID);
                        var group = await groupsRepository.GetGroupWithGroupID(leaveGroup.GroupID);
                        var users = await groupsRepository.GetGroupUsers(leaveGroup.GroupID);
                        await usersHub.Clients.Clients(otherConnectionsId).SendAsync("UserLeavedGroup", groupsRepository.GroupToOutputGroup(group));
                        await usersHub.Clients.Client(userConnection).SendAsync("GroupRemoved", leaveGroup.GroupID);
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
}