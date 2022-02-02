namespace APIDataLayer.Models;
public class ChannelChat : Chat
{
    [Required]
    public Guid ChannelID { get; set; }

    public long Seens { get; set; } = 0;
}