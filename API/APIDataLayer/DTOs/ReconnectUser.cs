using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APIDataLayer.DTOs
{
    public class ReconnectUser
    {
        public Guid UserID { get; set; }
        public string ConnectionID { get; set; }
    }
}