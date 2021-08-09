using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APIDataLayer.DTOs
{
    public class OutputForwardGroupChats
    {
        public List<string> ConnectionsId { get; set; }
        public List<OutputGroupChat> OutputGroupChats { get; set; }
    }
}