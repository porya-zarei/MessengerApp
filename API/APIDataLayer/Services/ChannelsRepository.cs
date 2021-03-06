namespace APIDataLayer.Services;

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
            ChannelDescription = channel.ChannelDescription,
            ChannelProfileImage = channel.ChannelProfileImage
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
            user.UserChannelsID.Remove(channelId);
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

    public async Task<bool> UpdateChannel(UpdateChannel updateChannel, string profileImage, Guid userId)
    {
        try
        {
            var channel = await GetChannelWithChannelID(updateChannel.ChannelID);
            bool isCreator = channel.CreatorID == userId;
            if (!isCreator)
            {
                return false;
            }

            if (updateChannel.Name != null && updateChannel.Name.Length > 0)
            {
                channel.Name = updateChannel.Name;
            }
            if (updateChannel.ChannelUserName != null && updateChannel.ChannelUserName.Length > 0)
            {
                channel.ChannelUserName = updateChannel.ChannelUserName;
            }
            if (updateChannel.ChannelDescription != null && updateChannel.ChannelDescription.Length > 0)
            {
                channel.ChannelDescription = updateChannel.ChannelDescription;
            }
            if (profileImage != null)
            {
                channel.ChannelProfileImage = profileImage;
            }
            await SaveChangesAsync();
            return true;
        }
        catch (Exception)
        {
            return false;
        }
    }

    public async Task<List<OutputUser>> GetChannelUsers(Guid channelId)
    {
        try
        {
            var channel = await context.Channels.FindAsync(channelId);
            var users = context.Users.ToList();
            var res = users.Where(u => channel.ChannelUsersID.Contains(u.UserID)).Select(u => new OutputUser
            {
                UserID = u.UserID,
                FirstName = u.FirstName,
                LastName = u.LastName,
                Description = u.Description,
                UserName = u.UserName,
                ProfileImage = u.ProfileImage,
                IsAdmin = channel.AdminsID.Contains(u.UserID)
            }).ToList();
            return res;
        }
        catch (Exception)
        {
            return null;
        }
    }

    public async Task<bool> IsAdmin(Guid channelId, Guid userId)
    {
        try
        {
            var channel = await context.Channels.FindAsync(channelId);
            return channel.AdminsID.Contains(userId);
        }
        catch (Exception)
        {
            return false;
        }
    }

    public async Task<bool> IsCreator(Guid channelId, Guid userId)
    {
        try
        {
            var channel = await context.Channels.FindAsync(channelId);
            return channel.CreatorID == userId;
        }
        catch (Exception)
        {
            return false;
        }
    }

    public async Task<bool> AddAdminToChannel(Guid channelId, Guid senderId, Guid userId)
    {
        try
        {
            if (await IsCreator(channelId, senderId))
            {
                var channel = await context.Channels.FindAsync(channelId);
                if (!channel.AdminsID.Contains(userId))
                {
                    channel.AdminsID.Add(userId);
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

    public async Task<bool> RemoveAdminFromChannel(Guid channelId, Guid senderId, Guid userId)
    {
        try
        {
            if (await IsCreator(channelId, senderId))
            {
                var channel = await context.Channels.FindAsync(channelId);
                if (channel.AdminsID.Contains(userId))
                {
                    channel.AdminsID.Remove(userId);
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

    public async Task<bool> RemoveUserFromChannel(Guid userId, Guid channelId)
    {
        try
        {
            var user = await context.Users.FindAsync(userId);
            var channel = await context.Channels.FindAsync(channelId);
            user.UserChannelsID.Remove(channelId);
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
