using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APIDataLayer.DTOs
{
    public class OutputForwardChat
    {
        public List<OutputRoomChat> OutputRoomChats { get; set; }
        public List<OutputGroupChat> OutputGroupChats { get; set; }
        public List<OutputChannelChat> OutputChannelChats { get; set; }
    }
}