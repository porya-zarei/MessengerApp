namespace APIDataLayer.DTOs
{
    public class CreateDashboardTask
    {
        public string Title { get; set; } = "";
        public string Content { get; set; } = "";
        public bool Finished { get; set; } = false;
        public Guid ForWhoID { get; set; }
        public string StatusColor { get; set; } = "primary";

        public DashboardTask GetDashboardTask(Guid senderId)
        {
            return new DashboardTask
            {
                TaskID = Guid.NewGuid(),
                Title = Title,
                Content = Content,
                StartDate = DateTime.Now,
                FinishDate = DateTime.Now,
                SenderID = senderId,
                Finished = false,
                ForWhoID = ForWhoID,
                StatusColor = StatusColor
            };
        }
    }
}