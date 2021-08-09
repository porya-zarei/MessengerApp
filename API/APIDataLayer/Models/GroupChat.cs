using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APIDataLayer.Models
{
    public class GroupChat : Chat
    {
        [Required]
        public Guid GroupID { get; set; }

        public GroupChatStatusEnum GroupChatStatus { get; set; } = GroupChatStatusEnum.NotSended;
    }

    public enum GroupChatStatusEnum
    {
        NotSended = 0,
        SendedNotSeened = 1,
        sendedAndSeened = 2
    }
}