using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APIDataLayer.DTOs
{
    public class LoginUser
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string ConnectionID { get; set; }
    }
}