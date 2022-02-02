namespace APIDataLayer.DTOs
{
    public class ForwardChat
    {
        public List<Guid> ChatsID { get; set; }
        public ChatType Type { get; set; }
        public List<Guid> RoomsID { get; set; }
        public List<Guid> GroupsID { get; set; }
        public List<Guid> ChannelsID { get; set; }
    }

    public enum ChatType
    {
        Room = 0,
        Group = 1,
        Channel = 2
    }
}