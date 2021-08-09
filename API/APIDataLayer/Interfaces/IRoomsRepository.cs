using APIDataLayer.DTOs;
using APIDataLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APIDataLayer.Interfaces
{
    public interface IRoomsRepository
    {
        Task<bool> CreateRoom(Room room);
        Task<Guid> GetRoomIDWithChatID(Guid id);
        List<string> GetRoomUsersConnectionID(Guid roomID);
        Task<Room> GetRoomWithChatID(Guid id);
        Task<Room> GetRoomWithRoomID(Guid id);
        List<OutputRoomChat> RoomChatsToOutputRoomChats(List<Guid> chatsId);
        OutputRoom RoomToOutputRoom(Room room, Guid userId);
        void SaveChanges();

        Task SaveChangesAsync();
    }
}