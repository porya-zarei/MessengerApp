using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Hubs.HubModels
{
    public class GroupVoiceChat
    {
        public Guid GroupID { get; set; }
        public List<string> JoinedUsersConnectionId { get; set; } = new List<string>() { };
        public List<string> JoinedUsersFullName { get; set; } = new List<string>() { };
    }
}