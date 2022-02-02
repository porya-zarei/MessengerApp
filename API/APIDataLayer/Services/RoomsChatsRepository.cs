namespace APIDataLayer.Services;

public class RoomsChatsRepository : IRoomsChatsRepository
{
    private readonly APIContext context;

    public RoomsChatsRepository(APIContext _context)
    {
        context = _context;
    }

    public async Task<bool> AddChatToRoom(RoomChat roomChat)
    {
        try
        {
            context.RoomsChats.Add(roomChat);
            var room = await context.Rooms.FindAsync(roomChat.RoomID);
            if (room.RoomChatsID == null)
            {
                room.RoomChatsID = new List<Guid>() { };
            }
            room.RoomChatsID.Add(roomChat.ChatID);
            await SaveChangesAsync();
            return true;
        }
        catch (Exception)
        {
            return false;
        }
    }

    public bool CheckUserAccess(Guid userID, Guid senderID, Guid roomID)
    {
        try
        {
            var room = context.Rooms.Find(roomID);
            if ((room.ReceiverUserID == userID || room.SenderUserID == userID) && senderID == userID)
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

    public async Task<OutputForwardRoomChats> ForwardChatsToRooms(List<Guid> roomsId, List<ForwardChatContent> chats)
    {
        OutputForwardRoomChats output = new OutputForwardRoomChats();
        List<string> connections = new List<string>() { };
        List<RoomChat> newChats = new List<RoomChat>() { };
        try
        {
            foreach (var roomId in roomsId)
            {
                foreach (var chat in chats)
                {
                    var newChat = new RoomChat()
                    {
                        ChatID = Guid.NewGuid(),
                        RoomID = roomId,
                        Text = chat.Text,
                        File = chat.File,
                        FileSize = chat.FileSize,
                        Image = chat.Image,
                        ImageSize = chat.ImageSize,
                        Video = chat.Video,
                        Voice = chat.Voice,
                        VideoSize = chat.VideoSize,
                        VoiceSize = chat.VoiceSize,
                        RoomChatStatus = RoomChatStatusEnum.SendedNotSeened,
                        SenderID = chat.SenderID,
                        SendingTime = chat.SendingTime
                    };
                    newChats.Add(newChat);
                }

                await context.RoomsChats.AddRangeAsync(newChats);

                var room = await context.Rooms.FindAsync(roomId);

                if (room.RoomChatsID == null)
                {
                    room.RoomChatsID = new List<Guid>() { };
                }
                room.RoomChatsID.AddRange(newChats.ToList().Select(ch => ch.ChatID));

                connections.AddRange(context.Users.ToList()
                    .Where(u => room.ReceiverUserID == u.UserID || room.SenderUserID == u.UserID)
                    .Select(u => u.CurrentConnectionID)
                    .ToList());
            }
            await SaveChangesAsync();
            output.ConnectionsId = connections;
            var outChats = new List<OutputRoomChat>() { };
            foreach (var chat in newChats)
            {
                outChats.Add(await RoomChatIDToOutputRoomChat(chat.ChatID));
            }
            output.OutputRoomChats = outChats;
            return output;
        }
        catch (Exception)
        {
            return output;
        }
    }

    public OutputRoomChat GetOutputRoomChat(RoomChat roomChat)
    {
        return new OutputRoomChat()
        {
            RoomID = roomChat.RoomID,
            ChatID = roomChat.ChatID,
            Image = roomChat.Image,
            SendingTime = roomChat.SendingTime,
            Text = roomChat.Text,
            RoomChatStatus = roomChat.RoomChatStatus,
            File = roomChat.File,
            FileSize = roomChat.FileSize,
            ImageSize = roomChat.ImageSize,
            SenderID = roomChat.SenderID,
            Video = roomChat.Video,
            Voice = roomChat.Voice,
            VideoSize = roomChat.VideoSize,
            VoiceSize = roomChat.VoiceSize
        };
    }

    public async Task<bool> UpdateRoomChat(ChatUpdate chatUpdate, string fileName, string imageName, Guid userId, string videoName, string voiceName)
    {
        try
        {
            var chat = await context.RoomsChats.FindAsync(chatUpdate.ChatID);
            var room = await context.Rooms.FindAsync(chat.RoomID);
            if (userId == chat.SenderID)
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
                    chat.VideoSize = chatUpdate.Video.Length;
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

    public async Task<string> DeleteRoomChat(Guid chatId, Guid userId)
    {
        try
        {
            var chat = await context.RoomsChats.FindAsync(chatId);
            var room = await context.Rooms.FindAsync(chat.RoomID);

            if (userId == chat.SenderID)
            {
                var roomID = room.RoomID;
                room.RoomChatsID.Remove(chat.ChatID);
                context.RoomsChats.Remove(chat); // remove permanently
                await SaveChangesAsync();
                return roomID.ToString();
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

    public async Task<OutputRoomChat> RoomChatIDToOutputRoomChat(Guid id)
    {
        var chat = await context.RoomsChats.FindAsync(id);
        return new OutputRoomChat()
        {
            ChatID = chat.ChatID,
            RoomID = chat.RoomID,
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
            RoomChatStatus = chat.RoomChatStatus
        };
    }

    public async Task<RoomChat> GetRoomChatWithChatID(Guid id)
    {
        return (await context.RoomsChats.FindAsync(id));
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
