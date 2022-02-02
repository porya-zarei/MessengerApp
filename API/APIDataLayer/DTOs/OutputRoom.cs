namespace APIDataLayer.DTOs
{
    public class OutputRoom
    {
        public Guid RoomID { get; set; }
        public Guid SenderUserID { get; set; }
        public Guid ReceiverUserID { get; set; }
        public string SenderName { get; set; }
        public string ReceiverName { get; set; }
        public DateTime CreateDate { get; set; }
        public List<OutputRoomChat> Chats { get; set; }
        public string OtherUserName { get; set; }
        public string OtherName { get; set; }
        public string OtherUserImage { get; set; }
        public string OtherDescription { get; set; }
    }
}