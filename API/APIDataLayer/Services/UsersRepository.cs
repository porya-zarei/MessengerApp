using APIDataLayer.Context;
using APIDataLayer.Interfaces;
using APIDataLayer.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.SignalR;
using APIDataLayer.DTOs;

namespace APIDataLayer.Services
{
    public class UsersRepository : IUsersRepository
    {
        private readonly APIContext context;

        public UsersRepository(APIContext _context)
        {
            context = _context;
        }

        public async Task<bool> AddUser(User newUser)
        {
            try
            {
                newUser.UserChannelsID = new List<Guid>() { };
                newUser.UserGroupsID = new List<Guid>() { };
                newUser.UserRoomsID = new List<Guid>() { };
                await context.Users.AddAsync(newUser);
                await SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task SaveChangesAsync() => await context.SaveChangesAsync();

        public void SaveChanges()
        {
            context.SaveChanges();
        }

        public string GetUserToken(Dictionary<string, string> pairs, IConfiguration _configuration)
        {
            var claims = new[]
                           {
                            new Claim(JwtRegisteredClaimNames.Jti,_configuration["Jwt:Subject"]),
                            new Claim(JwtRegisteredClaimNames.Iat,Guid.NewGuid().ToString()),
                            new Claim(JwtRegisteredClaimNames.Sub,DateTime.UtcNow.ToString()),
                        };
            foreach (var _key in pairs.Keys)
            {
                claims = claims.Append(new Claim(_key, pairs[_key])).ToArray();
            }
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var SignIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                _configuration["Jwt:Issuer"],
                _configuration["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddHours(5),
                signingCredentials: SignIn
            );

            var t = new JwtSecurityTokenHandler().WriteToken(token);
            return t;
        }

        public async Task<string> RegisterUserAuth(RegisterUser registerUser, IConfiguration configuration)
        {
            try
            {
                var newUser = registerUser.RegisterUserToUser();
                newUser.UserID = Guid.NewGuid();
                await AddUser(newUser);
                await SaveChangesAsync();
                var userDict = new Dictionary<string, string>()
                {
                    { "UserID", newUser.UserID.ToString() },
                    { "FullName", newUser.FirstName + "|" + newUser.LastName }
                };
                var token = GetUserToken(userDict, configuration);
                return token;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public string LoginUserAuth(LoginUser loginUser, IConfiguration configuration)
        {
            try
            {
                var loginedUser = GetUserWithEmailPassword(loginUser.Email, loginUser.Password);
                var userDict = new Dictionary<string, string>()
                {
                    { "UserID", loginedUser.UserID.ToString() },
                    { "FullName", loginedUser.FirstName + "|" + loginedUser.LastName }
                };
                var token = GetUserToken(userDict, configuration);
                return token;
            }
            catch (Exception)
            {
                return null;
            }
        }

        //public async Task<bool> SetUserConnectionID(string ID, string CID)
        //{
        //    try
        //    {
        //        var user = await context.Users.FindAsync(ID);
        //        user.CurrentConnectionID = CID;
        //        await SaveChangesAsync();
        //        return true;
        //    }
        //    catch (Exception)
        //    {
        //        return false;
        //    }
        //}

        public User GetUserWithEmailPassword(string email, string password)
        {
            try
            {
                var user = context.Users.AsQueryable().FirstOrDefault(u => u.Email == email);
                if (user.Password == password)
                {
                    return user;
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

        public User GetUserWithID(Guid id)
        {
            return context.Users.Find(id);
        }

        public async Task<bool> SetConnectionId(Guid userId, string connId)
        {
            try
            {
                var user = await context.Users.FindAsync(userId);
                user.CurrentConnectionID = connId;
                await SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public UserInitialData GetInitialData(Guid id)
        {
            try
            {
                var users = context.Users.AsEnumerable().ToList();
                var channels = context.Channels.AsEnumerable().ToList();
                var groups = context.Groups.AsEnumerable().ToList();
                var rooms = context.Rooms.AsEnumerable().ToList();
                var channelsChats = context.ChannelsChats.AsEnumerable().ToList();
                var groupsChats = context.GroupsChats.AsEnumerable().ToList();
                var roomsChats = context.RoomsChats.AsEnumerable().ToList();

                var initial = new UserInitialData();
                var user = GetUserWithID(id);

                initial.Rooms = new List<OutputRoom>() { };
                initial.Groups = new List<OutputGroup>() { };
                initial.Channels = new List<OutputChannel>() { };

                if (user != null)
                {
                    initial.Rooms
                        .AddRange(
                        rooms.Where(room => user.UserRoomsID.Contains(room.RoomID))
                            .Select(r => new OutputRoom()
                            {
                                RoomID = r.RoomID,
                                CreateDate = r.CreateDate,
                                ReceiverUserID = r.ReceiverUserID,
                                SenderUserID = r.SenderUserID,
                                OtherUserImage = (user.UserID == r.ReceiverUserID ? users.Find(u => u.UserID == r.SenderUserID).ProfileImage : users.Find(u => u.UserID == r.ReceiverUserID).ProfileImage),
                                OtherName = (user.UserID == r.ReceiverUserID ? (users.Find(u => u.UserID == r.SenderUserID).FirstName + " " + users.Find(u => u.UserID == r.SenderUserID).LastName) : (users.Find(u => u.UserID == r.ReceiverUserID).FirstName + " " + users.Find(u => u.UserID == r.ReceiverUserID).LastName)),
                                OtherUserName = (user.UserID == r.ReceiverUserID ? users.Find(u => u.UserID == r.SenderUserID).UserName : users.Find(u => u.UserID == r.ReceiverUserID).UserName),
                                SenderName = users.First(u => u.UserID == r.SenderUserID).FirstName + " " + users.First(u => u.UserID == r.SenderUserID).LastName,
                                OtherDescription = (user.UserID == r.ReceiverUserID ? users.Find(u => u.UserID == r.SenderUserID).Description : users.Find(u => u.UserID == r.ReceiverUserID).Description),
                                ReceiverName = users.First(u => u.UserID == r.ReceiverUserID).FirstName + " " + users.First(u => u.UserID == r.ReceiverUserID).LastName,
                                Chats = roomsChats.Where(rc => r.RoomChatsID.Contains(rc.ChatID)).Select(rc => new OutputRoomChat()
                                {
                                    ChatID = rc.ChatID,
                                    Image = rc.Image,
                                    File = rc.File,
                                    FileSize = rc.FileSize,
                                    ImageSize = rc.ImageSize,
                                    RoomChatStatus = rc.RoomChatStatus,
                                    RoomID = rc.RoomID,
                                    SendingTime = rc.SendingTime,
                                    Text = rc.Text,
                                    Video = rc.Video,
                                    Voice = rc.Voice,
                                    VideoSize = rc.VideoSize,
                                    VoiceSize = rc.VoiceSize,
                                    SenderID = rc.SenderID
                                }).OrderBy(ch => ch.SendingTime).ToList()
                            })
                            .ToList());
                    initial.Groups
                        .AddRange(context.Groups
                            .AsEnumerable()
                            .Where(group => user.UserGroupsID.Contains(group.GroupID))
                            .Select(g => new OutputGroup()
                            {
                                GroupID = g.GroupID,
                                Name = g.Name,
                                OnlineUsers = g.OnlineUsers,
                                GroupDescription = g.GroupDescription,
                                GroupProfileImage = g.GroupProfileImage,
                                GroupUserName = g.GroupUserName,
                                AdminsUserName = users.Where(u => g.GroupAdminsID.Contains(u.UserID)).Select(u => u.UserName).ToList(),
                                AdminsName = users.Where(u => g.GroupAdminsID.Contains(u.UserID)).Select(u => u.FirstName + " " + u.LastName).ToList(),
                                GroupMembersName = users.Where(u => g.GroupMembersID.Contains(u.UserID)).Select(u => u.FirstName + " " + u.LastName).ToList(),
                                Chats = groupsChats.Where(gc => g.GroupChatsID.Contains(gc.ChatID)).Select(gc => new OutputGroupChat()
                                {
                                    ChatID = gc.ChatID,
                                    Image = gc.Image,
                                    File = gc.File,
                                    FileSize = gc.FileSize,
                                    ImageSize = gc.ImageSize,
                                    GroupChatStatus = gc.GroupChatStatus,
                                    GroupID = gc.GroupID,
                                    SendingTime = gc.SendingTime,
                                    Text = gc.Text,
                                    SenderID = gc.SenderID,
                                    Video = gc.Video,
                                    Voice = gc.Voice,
                                    VideoSize = gc.VideoSize,
                                    VoiceSize = gc.VoiceSize,
                                }).OrderBy(ch => ch.SendingTime).ToList()
                            })
                            .ToList());
                    initial.Channels
                        .AddRange(context.Channels
                            .AsEnumerable()
                            .Where(channel => user.UserChannelsID.Contains(channel.ChannelID))
                            .Select(c => new OutputChannel()
                            {
                                ChannelID = c.ChannelID,
                                Name = c.Name,
                                ChannelUserName = c.ChannelUserName,
                                ChannelDescription = c.ChannelDescription,
                                AdminsUserName = users.AsEnumerable().Where(cu => c.AdminsID.Contains(cu.UserID)).Select(cu => cu.UserName).ToList(),
                                CreatorName = users.First(u => u.UserID == c.CreatorID).FirstName + " " + users.First(u => u.UserID == c.CreatorID).LastName,
                                ChannelChatsID = c.ChannelChatsID,
                                Chats = channelsChats.Where(cc => c.ChannelChatsID.Contains(cc.ChatID)).Select(cc => new OutputChannelChat()
                                {
                                    ChannelID = cc.ChannelID,
                                    ChatID = cc.ChatID,
                                    Image = cc.Image,
                                    File = cc.File,
                                    FileSize = cc.FileSize,
                                    ImageSize = cc.ImageSize,
                                    Text = cc.Text,
                                    Video = cc.Video,
                                    Voice = cc.Voice,
                                    VideoSize = cc.VideoSize,
                                    VoiceSize = cc.VoiceSize,
                                    Seens = cc.Seens,
                                    SendingTime = cc.SendingTime,
                                }).OrderBy(ch => ch.SendingTime).ToList()
                            })
                            .ToList());
                    return initial;
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

        public AllData GetAllData()
        {
            try
            {
                var users = context.Users.AsEnumerable().ToList();
                var channels = context.Channels.AsEnumerable().ToList();
                var groups = context.Groups.AsEnumerable().ToList();
                var channelsChats = context.ChannelsChats.AsEnumerable().ToList();
                var groupsChats = context.GroupsChats.AsEnumerable().ToList();

                var all = new AllData();

                all.Groups = new List<OutputGroup>() { };
                all.Channels = new List<OutputChannel>() { };

                all.Groups
                    .AddRange(
                        groups.Select(g => new OutputGroup()
                        {
                            GroupID = g.GroupID,
                            Name = g.Name,
                            OnlineUsers = g.OnlineUsers,
                            GroupDescription = g.GroupDescription,
                            GroupProfileImage = g.GroupProfileImage,
                            GroupUserName = g.GroupUserName,
                            AdminsUserName = users.Where(u => g.GroupAdminsID.Contains(u.UserID)).Select(u => u.UserName).ToList(),
                            AdminsName = users.Where(u => g.GroupAdminsID.Contains(u.UserID)).Select(u => u.FirstName + " " + u.LastName).ToList(),
                            GroupMembersName = users.Where(u => g.GroupMembersID.Contains(u.UserID)).Select(u => u.FirstName + " " + u.LastName).ToList(),
                            Chats = groupsChats.Where(gc => g.GroupChatsID.Contains(gc.ChatID)).Select(gc => new OutputGroupChat()
                            {
                                ChatID = gc.ChatID,
                                Image = gc.Image,
                                File = gc.File,
                                FileSize = gc.FileSize,
                                ImageSize = gc.ImageSize,
                                GroupChatStatus = gc.GroupChatStatus,
                                GroupID = gc.GroupID,
                                SendingTime = gc.SendingTime,
                                Text = gc.Text,
                                SenderID = gc.SenderID,
                                Video = gc.Video,
                                Voice = gc.Voice,
                                VideoSize = gc.VideoSize,
                                VoiceSize = gc.VoiceSize,
                            }).OrderBy(ch => ch.SendingTime).ToList(),
                        }).ToList());

                var chs = channels.Select(c => new OutputChannel()
                {
                    ChannelID = c.ChannelID,
                    Name = c.Name,
                    ChannelUserName = c.ChannelUserName,
                    ChannelDescription = c.ChannelDescription,
                    AdminsUserName = users.Where(cu => c.AdminsID.Contains(cu.UserID)).Select(cu => cu.UserName).ToList(),
                    CreatorName = (users.First(u => u.UserID == c.CreatorID).FirstName + " " + users.First(u => u.UserID == c.CreatorID).LastName) ?? "null ",
                    ChannelChatsID = c.ChannelChatsID,
                    Chats = channelsChats.Where(cc => c.ChannelChatsID.Contains(cc.ChatID)).Select(cc => new OutputChannelChat()
                    {
                        ChannelID = cc.ChannelID,
                        ChatID = cc.ChatID,
                        Image = cc.Image,
                        File = cc.File,
                        FileSize = cc.FileSize,
                        ImageSize = cc.ImageSize,
                        Text = cc.Text,
                        Seens = cc.Seens,
                        Video = cc.Video,
                        Voice = cc.Voice,
                        VideoSize = cc.VideoSize,
                        VoiceSize = cc.VoiceSize,
                        SendingTime = cc.SendingTime
                    }).OrderBy(ch => ch.SendingTime).ToList()
                }).ToList();

                chs.ForEach(c => all.Channels.Add(c));

                return all;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<User> UpdateUserInfo(UpdateUser updateUser, Guid userId, string imageName)
        {
            try
            {
                var user = await context.Users.FindAsync(userId);
                if (updateUser.FirstName != null && updateUser.FirstName != user.FirstName && updateUser.FirstName != "")
                {
                    user.FirstName = updateUser.FirstName;
                }
                if (updateUser.LastName != null && updateUser.LastName != user.LastName && updateUser.LastName != "")
                {
                    user.LastName = updateUser.LastName;
                }
                if (updateUser.Email != null && updateUser.Email != user.Email && updateUser.Email != "")
                {
                    user.Email = updateUser.Email;
                }
                if (updateUser.Password != null && updateUser.Password != user.Password && updateUser.Password != "")
                {
                    user.Password = updateUser.Password;
                }
                if (updateUser.Description != null && updateUser.Description != user.Description && updateUser.Description != "")
                {
                    user.Description = updateUser.Description;
                }
                if (updateUser.UserName != null && updateUser.UserName != user.UserName && updateUser.UserName != "")
                {
                    if (!context.Users.Any(u => u.UserName == updateUser.UserName))
                    {
                        user.UserName = updateUser.UserName;
                    }
                }
                if (imageName != null)
                {
                    user.ProfileImage = imageName;
                }
                await SaveChangesAsync();
                return user;
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}