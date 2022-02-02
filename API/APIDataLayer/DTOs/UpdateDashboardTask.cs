namespace APIDataLayer.DTOs
{
    public class UpdateDashboardTask
    {
        public Guid TaskID { get; set; }
        public string Title { get; set; } = "";
        public string Content { get; set; } = "";
        public bool Finished { get; set; } = false;
        public Guid ForWhoID { get; set; }
        public string StatusColor { get; set; } = "primary";
    }
}