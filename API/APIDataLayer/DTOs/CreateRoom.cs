namespace APIDataLayer.DTOs
{
    public class CreateRoom
    {
        public Guid SenderUserID { get; set; }
        public string ReceiverUserName { get; set; }

        public Room CreateRoomToRoom(Guid receiverId)
        {
            return new Room()
            {
                RoomID = Guid.NewGuid(),
                SenderUserID = SenderUserID,
                ReceiverUserID = receiverId,
                CreateDate = DateTime.Now,
                RoomChatsID = new List<Guid>() { }
            };
        }
    }
}