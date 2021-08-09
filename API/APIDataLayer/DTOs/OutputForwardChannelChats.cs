using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APIDataLayer.DTOs
{
    public class OutputForwardChannelChats
    {
        public List<string> ConnectionsId { get; set; }
        public List<OutputChannelChat> OutputChannelChats { get; set; }
    }
}