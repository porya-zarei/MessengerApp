using APIDataLayer.DTOs;
using APIDataLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APIDataLayer.Interfaces
{
    public interface IGroupsChatsRepository
    {
        Task<bool> AddChatToGroup(GroupChat groupChat);

        bool CheckUserAccess(Guid userID, Guid senderID, Guid groupID);

        Task<string> DeleteGroupChat(Guid chatId, Guid userId);

        Task<OutputForwardGroupChats> ForwardChatsToGroups(List<Guid> groupsId, List<ForwardChatContent> chats);

        Task<GroupChat> GetGroupChatWithChatID(Guid id);

        OutputGroupChat GetOutputGroupChat(GroupChat groupChat);

        Task<OutputGroupChat> GroupChatIDToOutputGroupChat(Guid id);

        void SaveChanges();

        Task SaveChangesAsync();

        Task<bool> UpdateGroupChat(ChatUpdate chatUpdate, string fileName, string imageName, Guid userId, string videoName, string voiceName);
    }
}