namespace APIDataLayer.DTOs
{
    public class OutputDashboardTask
    {
        public Guid TaskID { get; set; }
        public string Title { get; set; } = "";
        public string Content { get; set; } = "";
        public DateTime StartDate { get; set; }
        public DateTime FinishDate { get; set; }
        public bool Finished { get; set; } = false;
        public Guid SenderID { get; set; }
        public string SenderName { get; set; }
        public Guid ForWhoID { get; set; }
        public string ForWhoName { get; set; }
        public string StatusColor { get; set; } = "primary";
    }
}