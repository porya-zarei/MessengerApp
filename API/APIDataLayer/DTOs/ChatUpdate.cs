namespace APIDataLayer.DTOs
{
    public class ChatUpdate
    {
        public Guid ChatID { get; set; }
        public IFormFile File { get; set; }
        public IFormFile Image { get; set; }
        public IFormFile Voice { get; set; }
        public IFormFile Video { get; set; }
        public string Text { get; set; }
    }
}