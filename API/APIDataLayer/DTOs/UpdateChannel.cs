using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APIDataLayer.DTOs
{
    public class UpdateChannel
    {
        public Guid ChannelID { get; set; }
        public string Name { get; set; }
        public string ChannelUserName { get; set; }
        public string ChannelDescription { get; set; }
        public IFormFile ChannelProfileImage { get; set; }
    }
}