using APIDataLayer.Context;
using APIDataLayer.DTOs;
using APIDataLayer.Interfaces;
using APIDataLayer.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APIDataLayer.Services
{
    public class ChannelsRepository : IChannelsRepository
    {
        private readonly APIContext context;

        public ChannelsRepository(APIContext _context)
        {
            context = _context;
        }

        public bool AddChannel(Channel channel)
        {
            try
            {
                channel.ChannelChatsID = new List<Guid>() { };
                context.Channels.Add(channel);
                var creator = context.Users.Find(channel.CreatorID);
                if (creator.UserChannelsID == null)
                {
                    creator.UserChannelsID = new List<Guid>() { };
                }
                creator.UserChannelsID.Add(channel.ChannelID);
                SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<bool> JoinChannel(Guid userID, Guid channelID)
        {
            try
            {
                var user = await context.Users.FindAsync(userID);
                if (user.UserChannelsID == null)
                {
                    user.UserChannelsID = new List<Guid>() { };
                }
                user.UserChannelsID.Add(channelID);
                var channel = await context.Channels.FindAsync(channelID);
                if (channel.ChannelUsersID == null)
                {
                    channel.ChannelUsersID = new List<Guid>() { };
                }
                channel.ChannelUsersID.Add(userID);
                await SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public List<string> GetChannelUsersConnectionID(Guid channelID)
        {
            var channel = context.Channels.Find(channelID);
            return context.Users
                .AsEnumerable()
                .Where(u => channel.ChannelUsersID.Contains(u.UserID))
                .Select(u => u.CurrentConnectionID)
                .ToList();
        }

        public OutputChannel ChannelToOutputChannel(Channel channel)
        {
            var users = context.Users.ToList();
            return new OutputChannel()
            {
                ChannelID = channel.ChannelID,
                Name = channel.Name,
                AdminsUserName = users.Where(u => channel.AdminsID.Contains(u.UserID)).Select(u => u.UserName).ToList(),
                Chats = channel.ChannelChatsID.Count > 0 ? ChannelChatsToOutputChannelChats(channel.ChannelChatsID) : new List<OutputChannelChat>() { },
                ChannelUserName = channel.ChannelUserName,
                CreatorName = users.Find(u => u.UserID == channel.CreatorID).FirstName + " " + users.Find(u => u.UserID == channel.CreatorID).LastName,
                ChannelChatsID = channel.ChannelChatsID,
                ChannelDescription = channel.ChannelDescription
            };
        }

        public List<OutputChannelChat> ChannelChatsToOutputChannelChats(List<Guid> chatsId)
        {
            var chats = context.ChannelsChats.ToList().Where(cc => chatsId.Contains(cc.ChatID)).ToList();
            var result = chats.Select(ch => new OutputChannelChat()
            {
                ChatID = ch.ChatID,
                ChannelID = ch.ChannelID,
                Image = ch.Image,
                File = ch.File,
                ImageSize = ch.ImageSize,
                FileSize = ch.FileSize,
                SendingTime = ch.SendingTime,
                Text = ch.Text,
                Seens = ch.Seens
            }).ToList();
            return result;
        }

        public async Task<string> GetConnectionIdWithUserId(Guid userId)
        {
            var user = await context.Users.FindAsync(userId);
            return (user.CurrentConnectionID);
        }

        public async Task<bool> LeaveChannel(Guid userId, Guid channelId)
        {
            try
            {
                var user = await context.Users.FindAsync(userId);
                var channel = await context.Channels.FindAsync(channelId);
                user.UserGroupsID.Remove(channelId);
                if (channel.AdminsID.Contains(userId))
                {
                    channel.AdminsID.Remove(userId);
                }
                if (channel.ChannelUsersID.Contains(userId))
                {
                    channel.ChannelUsersID.Remove(userId);
                }
                await SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<List<string>> DeleteChannelComplete(Guid userId, Guid channelId)
        {
            try
            {
                var connsId = GetChannelUsersConnectionID(channelId);
                var channel = await context.Channels.FindAsync(channelId);
                if (channel.CreatorID == userId)
                {
                    foreach (var id in channel.ChannelUsersID)
                    {
                        (await context.Users.FindAsync(id)).UserChannelsID.Remove(channelId);
                    }

                    context.Channels.Remove(channel);
                    await SaveChangesAsync();
                    return connsId;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<Guid> GetChannelCreatorID(Guid id)
        {
            return (await context.Channels.FindAsync(id)).CreatorID;
        }

        public async Task<Guid> GetChannelIDWithChatID(Guid id)
        {
            return (await context.ChannelsChats.FindAsync(id)).ChannelID;
        }

        public async Task<Channel> GetChannelWithChatID(Guid id)
        {
            var chId = (await context.ChannelsChats.FindAsync(id)).ChannelID;
            return (await context.Channels.FindAsync(chId));
        }

        public async Task<Channel> GetChannelWithChannelID(Guid id)
        {
            return (await context.Channels.FindAsync(id));
        }

        public async Task SaveChangesAsync()
        {
            await context.SaveChangesAsync();
        }

        public void SaveChanges()
        {
            context.SaveChanges();
        }
    }
}