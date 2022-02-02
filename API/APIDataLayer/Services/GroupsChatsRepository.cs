namespace APIDataLayer.Services;

public class GroupsChatsRepository : IGroupsChatsRepository
{
    private readonly APIContext context;

    public GroupsChatsRepository(APIContext _context)
    {
        context = _context;
    }

    public async Task<bool> AddChatToGroup(GroupChat groupChat)
    {
        try
        {
            context.GroupsChats.Add(groupChat);
            var group = await context.Groups.FindAsync(groupChat.GroupID);
            if (group.GroupChatsID == null)
            {
                group.GroupChatsID = new List<Guid>() { };
            }
            group.GroupChatsID.Add(groupChat.ChatID);
            await SaveChangesAsync();
            return true;
        }
        catch (Exception)
        {
            return false;
        }
    }

    public bool CheckUserAccess(Guid userID, Guid senderID, Guid groupID)
    {
        try
        {
            if (context.Groups.Find(groupID).GroupMembersID.Contains(userID) && senderID == userID)
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

    public OutputGroupChat GetOutputGroupChat(GroupChat groupChat)
    {
        return new OutputGroupChat()
        {
            GroupID = groupChat.GroupID,
            ChatID = groupChat.ChatID,
            Image = groupChat.Image,
            SendingTime = groupChat.SendingTime,
            Text = groupChat.Text,
            GroupChatStatus = groupChat.GroupChatStatus,
            File = groupChat.File,
            FileSize = groupChat.FileSize,
            ImageSize = groupChat.ImageSize,
            Video = groupChat.Video,
            Voice = groupChat.Voice,
            VideoSize = groupChat.VideoSize,
            VoiceSize = groupChat.VoiceSize
        };
    }

    public async Task<bool> UpdateGroupChat(ChatUpdate chatUpdate, string fileName, string imageName, Guid userId, string videoName, string voiceName)
    {
        try
        {
            var chat = await context.GroupsChats.FindAsync(chatUpdate.ChatID);
            var group = await context.Groups.FindAsync(chat.GroupID);
            if ((userId == chat.SenderID && group.GroupMembersID.Contains(userId)) || group.GroupAdminsID.Contains(userId))
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
                if (videoName != null)
                {
                    chat.Video = videoName;
                    chat.FileSize = chatUpdate.Video.Length;
                }
                if (voiceName != null)
                {
                    chat.Voice = voiceName;
                    chat.VoiceSize = chatUpdate.Voice.Length;
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

    public async Task<string> DeleteGroupChat(Guid chatId, Guid userId)
    {
        try
        {
            var chat = await context.GroupsChats.FindAsync(chatId);
            var group = await context.Groups.FindAsync(chat.GroupID);

            if ((userId == chat.SenderID && group.GroupMembersID.Contains(userId)) || group.GroupAdminsID.Contains(userId))
            {
                var groupID = group.GroupID;
                group.GroupChatsID.Remove(chat.ChatID);
                context.GroupsChats.Remove(chat); // remove permanently
                await SaveChangesAsync();
                return groupID.ToString();
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

    public async Task<OutputGroupChat> GroupChatIDToOutputGroupChat(Guid id)
    {
        var chat = await context.GroupsChats.FindAsync(id);
        return new OutputGroupChat()
        {
            ChatID = chat.ChatID,
            GroupID = chat.GroupID,
            Text = chat.Text,
            SendingTime = chat.SendingTime,
            Image = chat.Image,
            ImageSize = chat.ImageSize,
            File = chat.File,
            FileSize = chat.FileSize,
            Video = chat.Video,
            Voice = chat.Voice,
            VideoSize = chat.VideoSize,
            VoiceSize = chat.VoiceSize,
            SenderID = chat.SenderID,
            GroupChatStatus = chat.GroupChatStatus
        };
    }

    public async Task<OutputForwardGroupChats> ForwardChatsToGroups(List<Guid> groupsId, List<ForwardChatContent> chats)
    {
        OutputForwardGroupChats output = new OutputForwardGroupChats();
        List<GroupChat> newChats = new List<GroupChat>() { };
        List<string> connections = new List<string>() { };
        try
        {
            foreach (var groupId in groupsId)
            {
                foreach (var chat in chats)
                {
                    var newChat = new GroupChat()
                    {
                        ChatID = Guid.NewGuid(),
                        GroupID = groupId,
                        Text = chat.Text,
                        File = chat.File,
                        FileSize = chat.FileSize,
                        Image = chat.Image,
                        ImageSize = chat.ImageSize,
                        Video = chat.Video,
                        Voice = chat.Voice,
                        VideoSize = chat.VideoSize,
                        VoiceSize = chat.VoiceSize,
                        GroupChatStatus = GroupChatStatusEnum.SendedNotSeened,
                        SenderID = chat.SenderID,
                        SendingTime = chat.SendingTime
                    };
                    newChats.Add(newChat);
                }

                await context.GroupsChats.AddRangeAsync(newChats);

                var group = await context.Groups.FindAsync(groupId);

                if (group.GroupChatsID == null)
                {
                    group.GroupChatsID = new List<Guid>() { };
                }
                group.GroupChatsID.AddRange(newChats.ToList().Select(ch => ch.ChatID));

                connections.AddRange(context.Users.ToList()
                    .Where(u => group.GroupMembersID.Contains(u.UserID))
                    .Select(u => u.CurrentConnectionID)
                    .ToList());
            }
            await SaveChangesAsync();
            output.ConnectionsId = connections;
            var outChats = new List<OutputGroupChat>() { };
            foreach (var chat in newChats)
            {
                outChats.Add(await GroupChatIDToOutputGroupChat(chat.ChatID));
            }
            output.OutputGroupChats = outChats;
            return output;
        }
        catch (Exception)
        {
            return output;
        }
    }

    public async Task<GroupChat> GetGroupChatWithChatID(Guid id)
    {
        return (await context.GroupsChats.FindAsync(id));
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
