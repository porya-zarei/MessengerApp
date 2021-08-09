using APIDataLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APIDataLayer.DTOs
{
    public class CreateChannel
    {
        public string ChannelUserName { get; set; }
        public string Name { get; set; }
        public Guid CreatorID { get; set; }

        public Channel CreateChannelToChannel()
        {
            return new Channel()
            {
                ChannelID = Guid.NewGuid(),
                Name = Name,
                ChannelUserName = ChannelUserName,
                CreatorID = CreatorID,
                AdminsID = new List<Guid>() { CreatorID },
                ChannelUsersID = new List<Guid>() { CreatorID },
                ChannelChatsID = new List<Guid>() { }
            };
        }
    }
}