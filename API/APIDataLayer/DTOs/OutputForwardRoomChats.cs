namespace APIDataLayer.DTOs
{
    public class OutputForwardRoomChats
    {
        public List<string> ConnectionsId { get; set; }
        public List<OutputRoomChat> OutputRoomChats { get; set; }
    }
}