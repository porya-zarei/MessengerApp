namespace APIDataLayer.DTOs
{
    public class OutputRoomChat
    {
        public Guid ChatID { get; set; }
        public string Text { get; set; }
        public string Image { get; set; } = "";
        public string File { get; set; } = "";
        public long FileSize { get; set; } = 0;
        public long ImageSize { get; set; } = 0;
        public string Video { get; set; } = "";
        public string Voice { get; set; } = "";
        public long VideoSize { get; set; } = 0;
        public long VoiceSize { get; set; } = 0;
        public Guid SenderID { get; set; }
        public DateTime SendingTime { get; set; }
        public Guid RoomID { get; set; }
        public RoomChatStatusEnum RoomChatStatus { get; set; } = RoomChatStatusEnum.NotSended;
    }
}