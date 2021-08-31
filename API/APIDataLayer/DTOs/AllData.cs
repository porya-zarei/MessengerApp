using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APIDataLayer.DTOs
{
    public class AllData
    {
        public List<OutputChannel> Channels { get; set; }
        public List<OutputGroup> Groups { get; set; }
        public List<OutputRoom> Rooms { get; set; }
        public List<OutputUser> Users { get; set; }
    }
}