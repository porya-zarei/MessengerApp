namespace APIDataLayer.Models;

public class User
{
    [Key]
    public Guid UserID { get; set; }

    [Required]
    public string UserName { get; set; }

    public string CurrentConnectionID { get; set; }

    [Required]
    public string FirstName { get; set; }

    [Required]
    public string LastName { get; set; }

    [Required]
    public string Email { get; set; }

    [Required]
    public string Password { get; set; }

    public string ProfileImage { get; set; } = "";
    public string Description { get; set; } = "";
    public string Status { get; set; } = "";

    public List<Guid> UserRoomsID { get; set; }
    public List<Guid> UserGroupsID { get; set; }
    public List<Guid> UserChannelsID { get; set; }
}
