namespace APIDataLayer.DTOs
{
    public class OutputForwardGroupChats
    {
        public List<string> ConnectionsId { get; set; }
        public List<OutputGroupChat> OutputGroupChats { get; set; }
    }
}