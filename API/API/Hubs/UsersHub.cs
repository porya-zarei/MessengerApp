using API.Hubs.HubModels;
using APIDataLayer.Context;
using APIDataLayer.Interfaces;
using APIDataLayer.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading;
using System.Threading.Channels;
using System.Threading.Tasks;

namespace API.Hubs
{
    public class UsersHub : Hub
    {
        private readonly static List<GroupVoiceChat> GroupVoiceChats = new List<GroupVoiceChat>() { };
        private readonly static List<BoardUser> BoardUsers = new List<BoardUser>() { };
        private static List<BoardElement> BoardElements = new List<BoardElement>() { };
        private readonly IUsersRepository usersRepository;

        public UsersHub(APIContext context)
        {
            usersRepository = new UsersRepository(context);
        }

        public async override Task OnConnectedAsync()
        {
            // var id = Context.User.FindFirst("UserID").Value;
            await base.OnConnectedAsync();
        }

        //public async Task<string> ReconnectUser(string connectionId, Guid userId)
        //{
        //    var userID = new Guid(Context.User.FindFirst("UserID").Value);
        //    bool res = await usersRepository.SetConnectionId(userId, connectionId);
        //    if (res)
        //    {
        //        return connectionId;
        //    }
        //    else
        //    {
        //        return null;
        //    }
        //}

        public async override Task OnDisconnectedAsync(Exception exception)
        {
            await base.OnDisconnectedAsync(exception);
        }

        //public async Task OnConnectionStarted(string cid)
        //{
        //    //var id = Context.User.FindFirst("Identity").Value;
        //    //await userRepository.SetUserConnectionID(id, Context.ConnectionId);
        //}
        public async Task JoinGroupVoiceChat(Guid groupId, string connectionId, string fullName)
        {
            if (GroupVoiceChats.Any(gr => gr.GroupID == groupId))
            {
                GroupVoiceChats.Find(gr => gr.GroupID == groupId).JoinedUsersConnectionId.Add(connectionId);
                GroupVoiceChats.Find(gr => gr.GroupID == groupId).JoinedUsersFullName.Add(fullName);
            }
            else
            {
                GroupVoiceChats.Add(new GroupVoiceChat()
                {
                    GroupID = groupId,
                    JoinedUsersConnectionId = new List<string>() { connectionId },
                    JoinedUsersFullName = new List<string>() { fullName }
                });
            }
            await Groups.AddToGroupAsync(connectionId, groupId.ToString());
            await Clients.Group(groupId.ToString()).SendAsync("NewUserJoinedGroupVoiceChat", GroupVoiceChats.Find(g => g.GroupID == groupId));
        }

        public async Task LeaveGroupVoiceChat(Guid groupId, string connectionId, string fullName)
        {
            try
            {
                if (GroupVoiceChats.Any(g => g.GroupID == groupId) && GroupVoiceChats.Find(g => g.GroupID == groupId).JoinedUsersConnectionId.Contains(connectionId))
                {
                    GroupVoiceChats.Find(g => g.GroupID == groupId).JoinedUsersConnectionId.Remove(connectionId);
                    GroupVoiceChats.Find(g => g.GroupID == groupId).JoinedUsersFullName.Remove(fullName);
                    await Groups.RemoveFromGroupAsync(connectionId, groupId.ToString());
                    await Clients.Group(groupId.ToString()).SendAsync("UserLeavedGroupVoiceChat", GroupVoiceChats.Find(g => g.GroupID == groupId));
                }
            }
            catch (Exception)
            {
            }
        }

        public GroupVoiceChat GetGroupVoiceChatInfo(Guid groupId)
        {
            return GroupVoiceChats.Find(g => g.GroupID == groupId);
        }

        public async Task SendGroupVoiceChat(int[] data, Guid groupId)
        {
            await Clients.Group(groupId.ToString()).SendAsync("GetGroupVoiceChat", data);
        }

        //public async Task SendGroupVoiceChat(IAsyncEnumerable<string> stream, Guid groupId)
        //{
        //    await foreach (var item in stream)
        //    {
        //        await Clients.Group(groupId.ToString()).SendAsync("GetGroupVoiceChat", item);
        //    }
        //}

        public async Task NotifyUser(Guid senderId, string receiverUserName)
        {
            var receiver = usersRepository.GetUserWithUserName(receiverUserName);
            var sender = await usersRepository.GetUserWithUserID(senderId);
            if (sender != null && receiver != null)
            {
                string notification = $"user {sender.FirstName} {sender.LastName} : see my messages !";
                await Clients.Client(receiver.CurrentConnectionID).SendAsync("GetNotification", notification);
            }
        }

        public async Task<string> ChackConnection(Guid userId, string connectionId)
        {
            var user = await usersRepository.GetUserWithUserID(userId);

            if (user.CurrentConnectionID != connectionId)
            {
                var res = await usersRepository.SetConnectionId(userId, connectionId);
                if (res)
                {
                    return connectionId;
                }
                else
                {
                    return null;
                }
            }
            else
            {
                return connectionId;
            }
        }

        public async Task SendCheckUserStatus(string userName, string connectionId)
        {
            var user = usersRepository.GetUserWithUserName(userName);
            await Clients.Client(user.CurrentConnectionID).SendAsync("CheckThisUserStatus", connectionId);
        }

        public async Task GetCheckUserStatus(string connectionId)
        {
            await Clients.Client(connectionId).SendAsync("GetUserStatus", true);
        }

        public async Task UserJoinBoard(Guid userId)
        {
            var user = await usersRepository.GetUserWithUserID(userId);
            var boardUser = new BoardUser
            {
                UserID = user.UserID,
                FullName = user.FirstName,
                MousePoint = new Point { X = 0, Y = 0 },
                ConnectionID = user.CurrentConnectionID
            };
            BoardUsers.Add(boardUser);
            await Clients.Clients(BoardUsers.Select(bu => bu.ConnectionID).ToList()).SendAsync("GetAllBoardUsers", BoardUsers);
        }

        public async Task UserLeaveBoard(Guid userId)
        {
            var boardUser = BoardUsers.Find(bu => bu.UserID == userId);
            if (boardUser != null)
            {
                BoardUsers.Remove(boardUser);
                await Clients.Clients(BoardUsers.Select(bu => bu.ConnectionID).ToList()).SendAsync("GetAllBoardUsers", BoardUsers);
            }
        }

        public async Task UserMoveMouseOnBoard(Guid userId, Point point)
        {
            var boardUser = BoardUsers.Find(bu => bu.UserID == userId);
            if (boardUser != null)
            {
                boardUser.MousePoint = point;
                await Clients.Clients(BoardUsers.Select(bu => bu.ConnectionID).ToList()).SendAsync("GetAllBoardUsers", BoardUsers);
            }
        }

        public async Task SendAllBoardUsers(Guid userId)
        {
            await Clients.Clients(BoardUsers.Find(bu => bu.UserID == userId).ConnectionID).SendAsync("GetAllBoardUsers", BoardUsers);
        }

        public async Task CreateBoardElement(BoardElement element)
        {
            element.ElementID = Guid.NewGuid();
            BoardElements.Add(element);
            await Clients.Clients(BoardUsers.Select(bu => bu.ConnectionID).ToList()).SendAsync("GetAllBoardElements", BoardElements);
        }

        public async Task SendBoardElements()
        {
            await Clients.Clients(BoardUsers.Select(bu => bu.ConnectionID).ToList()).SendAsync("GetAllBoardElements", BoardElements);
        }

        public List<BoardElement> SendBoardElementsToUser()
        {
            return BoardElements;
        }

        public async Task UserMoveElementOnBoard(Guid elementId, Point point)
        {
            var boardElement = BoardElements.Find(bu => bu.ElementID == elementId);
            if (boardElement != null)
            {
                boardElement.Position = point;
                await Clients.Clients(BoardUsers.Select(bu => bu.ConnectionID).ToList()).SendAsync("GetAllBoardElements", BoardElements);
            }
        }
    }
}