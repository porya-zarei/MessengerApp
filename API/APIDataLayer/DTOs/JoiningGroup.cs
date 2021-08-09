using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APIDataLayer.DTOs
{
    public class JoiningGroup
    {
        public Guid UserID { get; set; }
        public Guid GroupID { get; set; }
    }
}