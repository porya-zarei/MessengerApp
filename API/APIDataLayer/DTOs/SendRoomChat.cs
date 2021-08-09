using APIDataLayer.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APIDataLayer.DTOs
{
    public class SendRoomChat
    {
        public string Text { get; set; }
        public string ImageName { get; set; } = "";
        public string FileName { get; set; } = "";
        public string VoiceName { get; set; } = "";
        public string VideoName { get; set; } = "";
        public Guid SenderID { get; set; }
        public Guid RoomID { get; set; }
        public IFormFile Image { get; set; }
        public IFormFile File { get; set; }
        public IFormFile Voice { get; set; }
        public IFormFile Video { get; set; }

        public RoomChat SendRoomChatToRoomChat()
        {
            return new RoomChat()
            {
                Text = Text,
                Image = ImageName,
                File = FileName,
                Voice = VoiceName,
                Video = VideoName,
                VoiceSize = 0,
                VideoSize = 0,
                FileSize = 0,
                ImageSize = 0,
                SenderID = SenderID,
                RoomID = RoomID,
                ChatID = Guid.NewGuid(),
                SendingTime = DateTime.Now,
                RoomChatStatus = RoomChatStatusEnum.SendedNotSeened
            };
        }
    }
}