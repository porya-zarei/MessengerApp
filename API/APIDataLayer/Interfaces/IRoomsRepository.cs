namespace APIDataLayer.Interfaces;
public interface IRoomsRepository
{
    Task<bool> CreateRoom(Room room);

    Task<Guid> GetRoomIDWithChatID(Guid id);

    List<string> GetRoomUsersConnectionID(Guid roomID, Guid senderId, Guid receiverId);

    List<string> GetRoomUsersConnectionID(Guid roomID);

    Task<Room> GetRoomWithChatID(Guid id);

    Task<Room> GetRoomWithRoomID(Guid id);

    User GetUserWithUserName(string userName);

    List<OutputRoomChat> RoomChatsToOutputRoomChats(List<Guid> chatsId);

    OutputRoom RoomToOutputRoom(Room room, Guid userId);

    void SaveChanges();

    Task SaveChangesAsync();
}