namespace APIDataLayer.Interfaces;

public interface IGroupsRepository
{
    bool AddGroup(Group group);

    Task<List<string>> DeleteGroupComplete(Guid userId, Guid groupId);

    Task<Group> GetGroupWithChatID(Guid id);

    Task<string> GetConnectionIdWithUserId(Guid userId);

    Task<Guid> GetGroupCreatorID(Guid id);

    Task<Guid> GetGroupIDWithChatID(Guid id);

    List<string> GetGroupUsersConnectionID(Guid groupID);

    List<OutputGroupChat> GroupChatsToOutputGroupChats(List<Guid> chatsId);

    OutputGroup GroupToOutputGroup(Group group);

    Task<bool> JoinGroup(Guid userID, Guid groupID);

    Task<bool> LeaveGroup(Guid userId, Guid groupId);

    void SaveChanges();

    Task SaveChangesAsync();

    Task<Group> GetGroupWithGroupID(Guid id);

    Task<bool> UpdateGroup(UpdateGroup updateGroup, string profileImage, Guid userId);

    Task<List<OutputUser>> GetGroupUsers(Guid groupId);

    Task<bool> IsAdmin(Guid groupId, Guid userId);

    Task<bool> IsCreator(Guid groupId, Guid userId);

    Task<bool> AddAdminToGroup(Guid groupId, Guid senderId, Guid userId);

    Task<bool> RemoveAdminFromGroup(Guid groupId, Guid senderId, Guid userId);

    Task<bool> RemoveUserFromGroup(Guid userId, Guid groupId);
}