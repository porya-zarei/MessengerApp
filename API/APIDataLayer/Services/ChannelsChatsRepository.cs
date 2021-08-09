using APIDataLayer.Context;
using APIDataLayer.DTOs;
using APIDataLayer.Interfaces;
using APIDataLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APIDataLayer.Services
{
    public class ChannelsChatsRepository : IChannelsChatsRepository
    {
        private readonly APIContext context;

        public ChannelsChatsRepository(APIContext _context)
        {
            context = _context;
        }

        public async Task<bool> AddChatToChannel(ChannelChat channelChat)
        {
            try
            {
                context.ChannelsChats.Add(channelChat);
                var channel = await context.Channels.FindAsync(channelChat.ChannelID);
                if (channel.ChannelChatsID == null)
                {
                    channel.ChannelChatsID = new List<Guid>() { };
                }
                channel.ChannelChatsID.Add(channelChat.ChatID);
                await SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool CheckUserAccess(Guid userID, Guid senderID, Guid channelID)
        {
            try
            {
                if (context.Channels.Find(channelID).AdminsID.Contains(userID) && userID == senderID)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception)
            {
                return false;
            }
        }

        public OutputChannelChat GetOutputChannelChat(ChannelChat channelChat)
        {
            return new OutputChannelChat()
            {
                ChannelID = channelChat.ChannelID,
                ChatID = channelChat.ChatID,
                Image = channelChat.Image,
                Seens = channelChat.Seens,
                SendingTime = channelChat.SendingTime,
                Text = channelChat.Text,
                File = channelChat.File,
                FileSize = channelChat.FileSize,
                ImageSize = channelChat.ImageSize,
                Video = channelChat.Video,
                Voice = channelChat.Voice,
                VideoSize = channelChat.VideoSize,
                VoiceSize = channelChat.VoiceSize
            };
        }

        public async Task<bool> UpdateChannelChat(ChatUpdate chatUpdate, string fileName, string imageName, Guid userId, string videoName, string voiceName)
        {
            try
            {
                var chat = await context.ChannelsChats.FindAsync(chatUpdate.ChatID);
                var channel = await context.Channels.FindAsync(chat.ChannelID);
                if ((userId == chat.SenderID && channel.AdminsID.Contains(userId)) || userId == channel.CreatorID)
                {
                    if (chatUpdate.Text != null)
                    {
                        chat.Text = chatUpdate.Text;
                    }
                    if (fileName != null)
                    {
                        chat.File = fileName;
                        chat.FileSize = chatUpdate.File.Length;
                    }
                    if (imageName != null)
                    {
                        chat.Image = imageName;
                        chat.ImageSize = chatUpdate.Image.Length;
                    }
                    await SaveChangesAsync();
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<string> DeleteChannelChat(Guid chatId, Guid userId)
        {
            try
            {
                var chat = await context.ChannelsChats.FindAsync(chatId);
                var channel = await context.Channels.FindAsync(chat.ChannelID);

                if ((userId == chat.SenderID && channel.AdminsID.Contains(userId)) || userId == channel.CreatorID)
                {
                    var channelID = channel.ChannelID;
                    channel.ChannelChatsID.Remove(chat.ChatID);
                    context.ChannelsChats.Remove(chat); // remove permanently
                    await SaveChangesAsync();
                    return channelID.ToString();
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

        public async Task<OutputChannelChat> ChannelChatIDToOutputChannelChat(Guid id)
        {
            var chat = await context.ChannelsChats.FindAsync(id);
            return new OutputChannelChat()
            {
                ChatID = chat.ChatID,
                ChannelID = chat.ChannelID,
                Text = chat.Text,
                SendingTime = chat.SendingTime,
                Image = chat.Image,
                ImageSize = chat.ImageSize,
                File = chat.File,
                Video = chat.Video,
                Voice = chat.Voice,
                VideoSize = chat.VideoSize,
                VoiceSize = chat.VoiceSize,
                FileSize = chat.FileSize,
                Seens = chat.Seens
            };
        }

        public async Task<OutputForwardChannelChats> ForwardChatsToChannels(List<Guid> channelsId, List<ForwardChatContent> chats)
        {
            OutputForwardChannelChats output = new OutputForwardChannelChats();
            List<string> connections = new List<string>() { };
            List<ChannelChat> newChats = new List<ChannelChat>() { };
            try
            {
                foreach (var channelId in channelsId)
                {
                    foreach (var chat in chats)
                    {
                        var newChat = new ChannelChat()
                        {
                            ChatID = Guid.NewGuid(),
                            ChannelID = channelId,
                            Text = chat.Text,
                            File = chat.File,
                            FileSize = chat.FileSize,
                            Image = chat.Image,
                            ImageSize = chat.ImageSize,
                            Video = chat.Video,
                            Voice = chat.Voice,
                            VideoSize = chat.VideoSize,
                            VoiceSize = chat.VoiceSize,
                            Seens = 1,
                            SenderID = chat.SenderID,
                            SendingTime = chat.SendingTime
                        };
                        newChats.Add(newChat);
                    }

                    await context.ChannelsChats.AddRangeAsync(newChats);

                    var channel = await context.Channels.FindAsync(channelId);

                    if (channel.ChannelChatsID == null)
                    {
                        channel.ChannelChatsID = new List<Guid>() { };
                    }
                    channel.ChannelChatsID.AddRange(newChats.ToList().Select(ch => ch.ChatID));

                    connections.AddRange(context.Users.ToList()
                        .Where(u => channel.ChannelUsersID.Contains(u.UserID))
                        .Select(u => u.CurrentConnectionID)
                        .ToList());
                }
                await SaveChangesAsync();
                output.ConnectionsId = connections;
                var outChats = new List<OutputChannelChat>() { };
                foreach (var chat in newChats)
                {
                    outChats.Add(await ChannelChatIDToOutputChannelChat(chat.ChatID));
                }
                output.OutputChannelChats = output.OutputChannelChats = outChats;
                return output;
            }
            catch (Exception)
            {
                return output;
            }
        }

        public async Task<ChannelChat> GetChannelChatWithChatID(Guid id)
        {
            return (await context.ChannelsChats.FindAsync(id));
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