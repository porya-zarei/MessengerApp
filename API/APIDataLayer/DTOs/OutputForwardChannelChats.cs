namespace APIDataLayer.DTOs
{
    public class OutputForwardChannelChats
    {
        public List<string> ConnectionsId { get; set; }
        public List<OutputChannelChat> OutputChannelChats { get; set; }
    }
}