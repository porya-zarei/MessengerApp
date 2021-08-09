using APIDataLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APIDataLayer.DTOs
{
    public class CreateGroup
    {
        public string Name { get; set; }
        public string GroupUserName { get; set; }
        public Guid CreatorID { get; set; }

        public Group CreateGroupToGroup()
        {
            return new Group()
            {
                GroupID = Guid.NewGuid(),
                Name = Name,
                GroupUserName = GroupUserName,
                CreatorID = CreatorID,
                GroupAdminsID = new List<Guid>() { CreatorID },
                GroupMembersID = new List<Guid>() { CreatorID },
                GroupChatsID = new List<Guid>() { }
            };
        }
    }
}