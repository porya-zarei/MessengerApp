namespace APIDataLayer.Models;

public class Chat
{
    [Key]
    public Guid ChatID { get; set; }

    [Required]
    public string Text { get; set; }

    public string Image { get; set; } = "";
    public string File { get; set; } = "";
    public string Voice { get; set; } = "";
    public string Video { get; set; } = "";
    public long FileSize { get; set; } = 0;
    public long ImageSize { get; set; } = 0;
    public long VoiceSize { get; set; } = 0;
    public long VideoSize { get; set; } = 0;

    [Required]
    public Guid SenderID { get; set; }

    [Required]
    public DateTime SendingTime { get; set; }
}