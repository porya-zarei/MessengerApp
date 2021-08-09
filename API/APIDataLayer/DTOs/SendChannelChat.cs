using APIDataLayer.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APIDataLayer.DTOs
{
    public class SendChannelChat
    {
        public string Text { get; set; }
        public string ImageName { get; set; } = "";
        public string FileName { get; set; } = "";
        public string VoiceName { get; set; } = "";
        public string VideoName { get; set; } = "";
        public Guid SenderID { get; set; }
        public Guid ChannelID { get; set; }
        public IFormFile Image { get; set; }
        public IFormFile File { get; set; }
        public IFormFile Voice { get; set; }
        public IFormFile Video { get; set; }

        public ChannelChat SendChannelChatToChannelChat()
        {
            return new ChannelChat()
            {
                Text = Text,
                Image = ImageName,
                File = FileName,
                Voice = VoiceName,
                Video = VideoName,
                FileSize = 0,
                ImageSize = 0,
                VoiceSize = 0,
                VideoSize = 0,
                SenderID = SenderID,
                ChannelID = ChannelID,
                ChatID = Guid.NewGuid(),
                Seens = 1,
                SendingTime = DateTime.Now
            };
        }
    }
}