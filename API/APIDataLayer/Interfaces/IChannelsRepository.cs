namespace APIDataLayer.Interfaces;
public interface IChannelsRepository
{
    Task<bool> AddAdminToChannel(Guid channelId, Guid senderId, Guid userId);
    bool AddChannel(Channel channel);

    List<OutputChannelChat> ChannelChatsToOutputChannelChats(List<Guid> chatsId);

    OutputChannel ChannelToOutputChannel(Channel channel);

    Task<List<string>> DeleteChannelComplete(Guid userId, Guid channelId);

    Task<Guid> GetChannelCreatorID(Guid id);

    Task<Guid> GetChannelIDWithChatID(Guid id);
    Task<List<OutputUser>> GetChannelUsers(Guid channelId);
    List<string> GetChannelUsersConnectionID(Guid channelID);

    Task<Channel> GetChannelWithChannelID(Guid id);

    Task<Channel> GetChannelWithChatID(Guid id);

    Task<string> GetConnectionIdWithUserId(Guid userId);
    Task<bool> IsAdmin(Guid channelId, Guid userId);
    Task<bool> IsCreator(Guid channelId, Guid userId);
    Task<bool> JoinChannel(Guid userID, Guid channelID);

    Task<bool> LeaveChannel(Guid userId, Guid channelId);
    Task<bool> RemoveAdminFromChannel(Guid channelId, Guid senderId, Guid userId);
    Task<bool> RemoveUserFromChannel(Guid userId, Guid channelId);
    void SaveChanges();

    Task SaveChangesAsync();
    Task<bool> UpdateChannel(UpdateChannel updateChannel, string profileImage, Guid userId);
}