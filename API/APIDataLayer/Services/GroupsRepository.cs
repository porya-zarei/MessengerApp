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
    public class GroupsRepository : IGroupsRepository
    {
        private readonly APIContext context;

        public GroupsRepository(APIContext _context)
        {
            context = _context;
        }

        public bool AddGroup(Group group)
        {
            try
            {
                group.GroupChatsID = new List<Guid>() { };
                context.Groups.Add(group);
                var creator = context.Users.Find(group.CreatorID);
                if (creator.UserGroupsID == null)
                {
                    creator.UserGroupsID = new List<Guid>() { };
                }
                creator.UserGroupsID.Add(group.GroupID);
                SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<bool> JoinGroup(Guid userID, Guid groupID)
        {
            try
            {
                var user = await context.Users.FindAsync(userID);
                if (user.UserGroupsID == null)
                {
                    user.UserGroupsID = new List<Guid>() { };
                }
                user.UserGroupsID.Add(groupID);

                var group = await context.Groups.FindAsync(groupID);
                if (group.GroupMembersID == null)
                {
                    group.GroupMembersID = new List<Guid>() { };
                }
                group.GroupMembersID.Add(userID);
                await SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public List<string> GetGroupUsersConnectionID(Guid groupID)
        {
            var group = context.Groups.Find(groupID);
            return context.Users
                .AsEnumerable()
                .Where(u => group.GroupMembersID.Contains(u.UserID))
                .Select(u => u.CurrentConnectionID)
                .ToList();
        }

        public OutputGroup GroupToOutputGroup(Group group)
        {
            var users = context.Users.ToList();
            return new OutputGroup()
            {
                GroupID = group.GroupID,
                Name = group.Name,
                AdminsName = users.Where(u => group.GroupAdminsID.Contains(u.UserID)).Select(u => u.FirstName + " " + u.LastName).ToList(),
                AdminsUserName = users.Where(u => group.GroupAdminsID.Contains(u.UserID)).Select(u => u.UserName).ToList(),
                GroupDescription = group.GroupDescription,
                Chats = group.GroupChatsID.Count > 0 ? GroupChatsToOutputGroupChats(group.GroupChatsID) : new List<OutputGroupChat>() { },
                GroupProfileImage = group.GroupProfileImage,
                GroupUserName = group.GroupUserName,
                OnlineUsers = group.OnlineUsers,
                GroupMembersName = users.Where(u => group.GroupMembersID.Contains(u.UserID)).Select(u => u.FirstName + " " + u.LastName).ToList()
            };
        }

        public List<OutputGroupChat> GroupChatsToOutputGroupChats(List<Guid> chatsId)
        {
            var chats = context.GroupsChats.ToList().Where(gc => chatsId.Contains(gc.ChatID)).ToList();
            var result = chats.Select(ch => new OutputGroupChat()
            {
                ChatID = ch.ChatID,
                GroupID = ch.GroupID,
                GroupChatStatus = ch.GroupChatStatus,
                Image = ch.Image,
                File = ch.File,
                ImageSize = ch.ImageSize,
                FileSize = ch.FileSize,
                SenderID = ch.SenderID,
                SendingTime = ch.SendingTime,
                Text = ch.Text
            }).ToList();
            return result;
        }

        public async Task<string> GetConnectionIdWithUserId(Guid userId)
        {
            var user = await context.Users.FindAsync(userId);
            return (user.CurrentConnectionID);
        }

        public async Task<bool> LeaveGroup(Guid userId, Guid groupId)
        {
            try
            {
                var user = await context.Users.FindAsync(userId);
                var group = await context.Groups.FindAsync(groupId);
                user.UserGroupsID.Remove(groupId);
                if (group.GroupAdminsID.Contains(userId))
                {
                    group.GroupAdminsID.Remove(userId);
                }
                if (group.GroupMembersID.Contains(userId))
                {
                    group.GroupMembersID.Remove(userId);
                }
                await SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<List<string>> DeleteGroupComplete(Guid userId, Guid groupId)
        {
            try
            {
                var connsId = GetGroupUsersConnectionID(groupId);
                var group = await context.Groups.FindAsync(groupId);
                if (group.CreatorID == userId)
                {
                    foreach (var id in group.GroupMembersID)
                    {
                        (await context.Users.FindAsync(id)).UserGroupsID.Remove(groupId);
                    }

                    context.Groups.Remove(group);
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

        public async Task<bool> UpdateGroup(UpdateGroup updateGroup, string profileImage, Guid userId)
        {
            try
            {
                var group = await GetGroupWithGroupID(updateGroup.GroupID);
                bool isCreator = group.CreatorID == userId;
                if (!isCreator)
                {
                    return false;
                }

                if (updateGroup.Name != null && updateGroup.Name.Length > 0)
                {
                    group.Name = updateGroup.Name;
                }
                if (updateGroup.GroupUserName != null && updateGroup.GroupUserName.Length > 0)
                {
                    group.GroupUserName = updateGroup.GroupUserName;
                }
                if (updateGroup.GroupDescription != null && updateGroup.GroupDescription.Length > 0)
                {
                    group.GroupDescription = updateGroup.GroupDescription;
                }
                if (profileImage != null)
                {
                    group.GroupProfileImage = profileImage;
                }
                await SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<List<OutputUser>> GetGroupUsers(Guid groupId)
        {
            try
            {
                var group = await context.Groups.FindAsync(groupId);
                var users = context.Users.ToList();
                var res = users.Where(u => group.GroupMembersID.Contains(u.UserID)).Select(u => new OutputUser
                {
                    UserID = u.UserID,
                    FirstName = u.FirstName,
                    LastName = u.LastName,
                    Description = u.Description,
                    UserName = u.UserName,
                    ProfileImage = u.ProfileImage,
                    IsAdmin = group.GroupAdminsID.Contains(u.UserID)
                }).ToList();
                return res;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<bool> IsAdmin(Guid groupId, Guid userId)
        {
            try
            {
                var group = await context.Groups.FindAsync(groupId);
                return group.GroupAdminsID.Contains(userId);
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<bool> IsCreator(Guid groupId, Guid userId)
        {
            try
            {
                var group = await context.Groups.FindAsync(groupId);
                return group.CreatorID == userId;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<bool> AddAdminToGroup(Guid groupId, Guid senderId, Guid userId)
        {
            try
            {
                if (await IsCreator(groupId, senderId))
                {
                    var group = await context.Groups.FindAsync(groupId);
                    if (!group.GroupAdminsID.Contains(userId))
                    {
                        group.GroupAdminsID.Add(userId);
                        await SaveChangesAsync();
                    }
                    return true;
                }
                return false;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<bool> RemoveAdminFromGroup(Guid groupId, Guid senderId, Guid userId)
        {
            try
            {
                if (await IsCreator(groupId, senderId))
                {
                    var group = await context.Groups.FindAsync(groupId);
                    if (group.GroupAdminsID.Contains(userId))
                    {
                        group.GroupAdminsID.Remove(userId);
                        await SaveChangesAsync();
                    }
                    return true;
                }
                return false;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<bool> RemoveUserFromGroup(Guid userId, Guid groupId)
        {
            try
            {
                var user = await context.Users.FindAsync(userId);
                var group = await context.Groups.FindAsync(groupId);
                user.UserGroupsID.Remove(groupId);
                if (group.GroupAdminsID.Contains(userId))
                {
                    group.GroupAdminsID.Remove(userId);
                }
                if (group.GroupMembersID.Contains(userId))
                {
                    group.GroupMembersID.Remove(userId);
                }
                await SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<Guid> GetGroupCreatorID(Guid id)
        {
            return (await context.Groups.FindAsync(id)).CreatorID;
        }

        public async Task<Guid> GetGroupIDWithChatID(Guid id)
        {
            return (await context.GroupsChats.FindAsync(id)).GroupID;
        }

        public async Task<Group> GetGroupWithChatID(Guid id)
        {
            var grId = (await context.GroupsChats.FindAsync(id)).GroupID;
            return (await context.Groups.FindAsync(grId));
        }

        public async Task<Group> GetGroupWithGroupID(Guid id)
        {
            return (await context.Groups.FindAsync(id));
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