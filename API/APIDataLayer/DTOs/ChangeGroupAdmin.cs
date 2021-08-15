using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APIDataLayer.DTOs
{
    public class ChangeGroupAdmin
    {
        public Guid GroupID { get; set; }
        public Guid UserID { get; set; }
    }
}