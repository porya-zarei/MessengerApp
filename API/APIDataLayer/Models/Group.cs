using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APIDataLayer.Models
{
    public class Group
    {
        [Key]
        public Guid GroupID { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string GroupUserName { get; set; }

        public string GroupDescription { get; set; } = "";
        public string GroupProfileImage { get; set; } = "";

        public List<Guid> GroupMembersID { get; set; }
        public int OnlineUsers { get; set; } = 0;

        [Required]
        public Guid CreatorID { get; set; }

        public List<Guid> GroupAdminsID { get; set; }
        public List<Guid> GroupChatsID { get; set; }
    }
}