using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APIDataLayer.Models
{
    public class Channel
    {
        [Key]
        public Guid ChannelID { get; set; }

        [Required]
        public string ChannelUserName { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public Guid CreatorID { get; set; }

        public List<Guid> AdminsID { get; set; }

        public List<Guid> ChannelUsersID { get; set; }

        public List<Guid> ChannelChatsID { get; set; }
    }
}