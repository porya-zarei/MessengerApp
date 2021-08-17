using API.Hubs;
using API.Utils;
using APIDataLayer.Context;
using APIDataLayer.DTOs;
using APIDataLayer.Interfaces;
using APIDataLayer.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomsController : ControllerBase
    {
        private readonly IRoomsRepository roomsRepository;
        private readonly IRoomsChatsRepository roomsChatsRepository;
        private readonly IHubContext<UsersHub> usersHub;
        private readonly IWebHostEnvironment webHostEnvironment;

        public RoomsController(APIContext context, IHubContext<UsersHub> _usersHub, IWebHostEnvironment _webHostEnvironment)
        {
            roomsRepository = new RoomsRepository(context);
            roomsChatsRepository = new RoomsChatsRepository(context);
            usersHub = _usersHub;
            webHostEnvironment = _webHostEnvironment;
        }

        [Authorize]
        [HttpPost("CreateRoom")]
        public async Task<IActionResult> UserCreateRoom(CreateRoom createRoom)
        {
            var receiver = roomsRepository.GetUserWithUserName(createRoom.ReceiverUserName);
            var ro = createRoom.CreateRoomToRoom(receiver.UserID);
            var res = await roomsRepository.CreateRoom(ro);
            var userId = new Guid(User.FindFirst("UserID").Value);
            if (!res)
            {
                return BadRequest();
            }

            var connections = roomsRepository.GetRoomUsersConnectionID(ro.RoomID, ro.SenderUserID, ro.ReceiverUserID);
            if (connections != null)
            {
                await usersHub.Clients
                        .Client(connections[0])
                        .SendAsync("NewRoom", roomsRepository.RoomToOutputRoom(ro, ro.SenderUserID));
                await usersHub.Clients
                        .Client(connections[1])
                        .SendAsync("NewRoom", roomsRepository.RoomToOutputRoom(ro, ro.ReceiverUserID));
                return Created("createRoom", "Room Created successfully");
            }
            return BadRequest();
        }

        [Authorize]
        [HttpPost("SendRoomChat")]
        public async Task<IActionResult> SendRoomChat([FromForm] SendRoomChat sendRoomChat)
        {
            var userID = new Guid(User.FindFirst("UserID").Value);
            sendRoomChat.SenderID = userID;
            if (roomsChatsRepository.CheckUserAccess(userID, sendRoomChat.SenderID, sendRoomChat.RoomID))
            {
                var roomChat = sendRoomChat.SendRoomChatToRoomChat();
                // upload =>
                if (sendRoomChat.File != null || sendRoomChat.Image != null || sendRoomChat.Video != null || sendRoomChat.Voice != null)
                {
                    var uploader = new Uploader();

                    if (sendRoomChat.File != null)
                    {
                        roomChat.File = await uploader.UploadFile(sendRoomChat.File, webHostEnvironment.WebRootPath);
                        roomChat.FileSize = sendRoomChat.File.Length;
                    }
                    if (sendRoomChat.Image != null && sendRoomChat.Video == null)
                    {
                        roomChat.Image = await uploader.UploadImage(sendRoomChat.Image, webHostEnvironment.WebRootPath);
                        roomChat.ImageSize = sendRoomChat.Image.Length;
                    }
                    if (sendRoomChat.Video != null && sendRoomChat.Image == null)
                    {
                        roomChat.Video = await uploader.UploadVideo(sendRoomChat.Video, webHostEnvironment.WebRootPath);
                        roomChat.VideoSize = sendRoomChat.Video.Length;
                    }
                    if (sendRoomChat.Voice != null)
                    {
                        roomChat.Voice = await uploader.UploadVoice(sendRoomChat.Voice, webHostEnvironment.WebRootPath);
                        roomChat.VoiceSize = sendRoomChat.Voice.Length;
                    }
                }
                // end upload
                await roomsChatsRepository.AddChatToRoom(roomChat);
                var rc = roomsChatsRepository.GetOutputRoomChat(roomChat);

                rc.SenderID = userID;

                await usersHub.Clients
                    .Clients(roomsRepository.GetRoomUsersConnectionID(sendRoomChat.RoomID))
                    .SendAsync("NewRoomChat", rc);

                return Created("Created at SendRoomChat", "created successfully");
            }
            else
            {
                return BadRequest("access denied");
            }
        }

        [Authorize]
        [HttpPost("UpdateRoomChat")]
        public async Task<IActionResult> UpdateRoomChat(ChatUpdate chatUpdate)
        {
            var userId = new Guid(User.FindFirst("UserID").Value);
            try
            {
                string fileName = null, imageName = null, voiceName = null, videoName = null;
                if (chatUpdate.File != null || chatUpdate.Image != null)
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
                        videoName = await uploader.UploadVideo(chatUpdate.Voice, webHostEnvironment.WebRootPath);
                    }
                }
                var res = await roomsChatsRepository.UpdateRoomChat(chatUpdate, fileName, imageName, userId, videoName, voiceName);
                if (res)
                {
                    var room = await roomsRepository.GetRoomWithChatID(chatUpdate.ChatID);
                    var connectionsId = roomsRepository.GetRoomUsersConnectionID(room.RoomID);
                    var chat = await roomsChatsRepository.RoomChatIDToOutputRoomChat(chatUpdate.ChatID);
                    await usersHub.Clients.Clients(connectionsId).SendAsync("RoomChatUpdated", chat);
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
        [HttpPost("DeleteRoomChat")]
        public async Task<IActionResult> DeleteRoomChat(ChatDelete chatDelete)
        {
            var userId = new Guid(User.FindFirst("UserID").Value);
            try
            {
                var roomId = await roomsChatsRepository.DeleteRoomChat(chatDelete.ChatID, userId);
                if (roomId != null)
                {
                    var room = await roomsRepository.GetRoomWithRoomID(new Guid(roomId));
                    var connectionsId = roomsRepository.GetRoomUsersConnectionID(room.RoomID);
                    var resp = new Dictionary<string, Guid>()
                    {
                        { "ChatID", chatDelete.ChatID },
                        { "RoomID", new Guid(roomId) }
                    };
                    await usersHub.Clients.Clients(connectionsId).SendAsync("RoomChatDeleted", resp);
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
    }
}