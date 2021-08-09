using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APIDataLayer.Models
{
    public class ChannelChat : Chat
    {
        [Required]
        public Guid ChannelID { get; set; }

        public long Seens { get; set; } = 0;
    }
}