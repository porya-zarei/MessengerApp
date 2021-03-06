namespace APIDataLayer.Models;
public class Channel
{
    [Key]
    public Guid ChannelID { get; set; }

    [Required]
    public string ChannelUserName { get; set; }

    [Required]
    public string Name { get; set; }

    [Required]
    public Guid CreatorID { get; set; }

    public string ChannelDescription { get; set; } = "";

    public string ChannelProfileImage { get; set; } = "";

    public List<Guid> AdminsID { get; set; }

    public List<Guid> ChannelUsersID { get; set; }

    public List<Guid> ChannelChatsID { get; set; }
}