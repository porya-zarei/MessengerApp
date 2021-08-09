using APIDataLayer.DTOs;
using APIDataLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APIDataLayer.Interfaces
{
    public interface IChannelsRepository
    {
        bool AddChannel(Channel channel);

        List<OutputChannelChat> ChannelChatsToOutputChannelChats(List<Guid> chatsId);

        OutputChannel ChannelToOutputChannel(Channel channel);

        Task<List<string>> DeleteChannelComplete(Guid userId, Guid channelId);

        Task<Guid> GetChannelCreatorID(Guid id);

        Task<Guid> GetChannelIDWithChatID(Guid id);

        List<string> GetChannelUsersConnectionID(Guid channelID);

        Task<Channel> GetChannelWithChannelID(Guid id);

        Task<Channel> GetChannelWithChatID(Guid id);

        Task<string> GetConnectionIdWithUserId(Guid userId);

        Task<bool> JoinChannel(Guid userID, Guid channelID);

        Task<bool> LeaveChannel(Guid userId, Guid channelId);

        void SaveChanges();

        Task SaveChangesAsync();
    }
}