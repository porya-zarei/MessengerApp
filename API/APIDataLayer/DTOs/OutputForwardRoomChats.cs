using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APIDataLayer.DTOs
{
    public class OutputForwardRoomChats
    {
        public List<string> ConnectionsId { get; set; }
        public List<OutputRoomChat> OutputRoomChats { get; set; }
    }
}