namespace APIDataLayer.DTOs
{
    public class SendGroupChat
    {
        public string Text { get; set; }
        public string ImageName { get; set; } = "";
        public string FileName { get; set; } = "";
        public string VoiceName { get; set; } = "";
        public string VideoName { get; set; } = "";
        public Guid SenderID { get; set; }
        public Guid GroupID { get; set; }
        public IFormFile Image { get; set; }
        public IFormFile File { get; set; }
        public IFormFile Voice { get; set; }
        public IFormFile Video { get; set; }

        public GroupChat SendGroupChatToGroupChat()
        {
            return new GroupChat()
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
                GroupID = GroupID,
                ChatID = Guid.NewGuid(),
                GroupChatStatus = GroupChatStatusEnum.SendedNotSeened,
                SendingTime = DateTime.Now
            };
        }
    }
}