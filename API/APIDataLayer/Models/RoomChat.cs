namespace APIDataLayer.Models;
public class RoomChat : Chat
{
    [Required]
    public Guid RoomID { get; set; }

    public RoomChatStatusEnum RoomChatStatus { get; set; } = RoomChatStatusEnum.NotSended;
}

public enum RoomChatStatusEnum
{
    NotSended = 0,
    SendedNotSeened = 1,
    sendedAndSeened = 2
}