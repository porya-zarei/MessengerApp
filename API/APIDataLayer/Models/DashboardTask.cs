namespace APIDataLayer.Models;
public class DashboardTask
{
    [Key]
    public Guid TaskID { get; set; }

    [Required]
    public string Title { get; set; } = "";

    [Required]
    public string Content { get; set; } = "";

    [Required]
    public DateTime StartDate { get; set; }

    public DateTime FinishDate { get; set; }
    public bool Finished { get; set; } = false;

    [Required]
    public Guid SenderID { get; set; }

    public Guid ForWhoID { get; set; }
    public string StatusColor { get; set; } = "primary";
}