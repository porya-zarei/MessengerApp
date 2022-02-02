namespace APIDataLayer.DTOs
{
    public class UserInitialData
    {
        public List<OutputChannel> Channels { get; set; }
        public List<OutputGroup> Groups { get; set; }
        public List<OutputRoom> Rooms { get; set; }
    }
}