namespace APIDataLayer.Interfaces;
public interface IChannelsChatsRepository
{
    Task<bool> AddChatToChannel(ChannelChat channelChat);

    Task<OutputChannelChat> ChannelChatIDToOutputChannelChat(Guid id);

    bool CheckUserAccess(Guid userID, Guid senderID, Guid channelID);

    Task<string> DeleteChannelChat(Guid chatId, Guid userId);

    Task<OutputForwardChannelChats> ForwardChatsToChannels(List<Guid> channelsId, List<ForwardChatContent> chats);

    Task<ChannelChat> GetChannelChatWithChatID(Guid id);

    OutputChannelChat GetOutputChannelChat(ChannelChat channelChat);

    void SaveChanges();

    Task SaveChangesAsync();

    Task<bool> UpdateChannelChat(ChatUpdate chatUpdate, string fileName, string imageName, Guid userId, string videoName, string voiceName);
}