using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APIDataLayer.DTOs
{
    public class ChangeChannelAdmin
    {
        public Guid ChannelID { get; set; }
        public Guid UserID { get; set; }
    }
}