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
        public static List<GroupVoiceChat> GroupVoiceChats = new List<GroupVoiceChat>() { };
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
    }
}