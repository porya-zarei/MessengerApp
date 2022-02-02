namespace APIDataLayer.Models;
public class Room
{
    [Key]
    public Guid RoomID { get; set; }

    [Required]
    public Guid SenderUserID { get; set; }

    [Required]
    public Guid ReceiverUserID { get; set; }

    [Required]
    public DateTime CreateDate { get; set; }

    public List<Guid> RoomChatsID { get; set; }
}