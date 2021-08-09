using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APIDataLayer.DTOs
{
    public class ForwardChatContent
    {
        public string Text { get; set; }
        public string Image { get; set; }
        public string File { get; set; }
        public long ImageSize { get; set; }
        public long FileSize { get; set; }
        public string Video { get; set; }
        public string Voice { get; set; }
        public long VideoSize { get; set; }
        public long VoiceSize { get; set; }
        public Guid SenderID { get; set; }
        public DateTime SendingTime { get; set; }
    }
}