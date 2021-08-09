using APIDataLayer.DTOs;
using APIDataLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APIDataLayer.Interfaces
{
    public interface IRoomsChatsRepository
    {
        Task<bool> AddChatToRoom(RoomChat roomChat);

        bool CheckUserAccess(Guid userID, Guid senderID, Guid roomID);

        Task<string> DeleteRoomChat(Guid chatId, Guid userId);

        Task<OutputForwardRoomChats> ForwardChatsToRooms(List<Guid> roomsId, List<ForwardChatContent> chats);

        OutputRoomChat GetOutputRoomChat(RoomChat roomChat);

        Task<RoomChat> GetRoomChatWithChatID(Guid id);

        Task<OutputRoomChat> RoomChatIDToOutputRoomChat(Guid id);

        void SaveChanges();

        Task SaveChangesAsync();

        Task<bool> UpdateRoomChat(ChatUpdate chatUpdate, string fileName, string imageName, Guid userId, string videoName, string voiceName);
    }
}