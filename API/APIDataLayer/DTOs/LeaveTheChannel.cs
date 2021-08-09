using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APIDataLayer.DTOs
{
    public class LeaveTheChannel
    {
        public Guid UserID { get; set; }
        public Guid ChannelID { get; set; }
    }
}