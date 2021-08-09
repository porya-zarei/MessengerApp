using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APIDataLayer.DTOs
{
    public class ChannelChatUpdate : ChatUpdate
    {
        public Guid ChannelID { get; set; }
    }
}