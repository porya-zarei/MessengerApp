using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APIDataLayer.DTOs
{
    public class OutputChannel
    {
        public Guid ChannelID { get; set; }

        public string ChannelUserName { get; set; }

        public string ChannelDescription { get; set; } = "";

        public string ChannelProfileImage { get; set; } = "";

        public string Name { get; set; }

        public string CreatorName { get; set; }

        public List<string> AdminsUserName { get; set; }

        public List<OutputChannelChat> Chats { get; set; }

        public List<Guid> ChannelChatsID { get; set; }
    }
}