namespace APIDataLayer.Models;

public class GroupChat : Chat
{
    [Required]
    public Guid GroupID { get; set; }

    public GroupChatStatusEnum GroupChatStatus { get; set; } = GroupChatStatusEnum.NotSended;
}

public enum GroupChatStatusEnum
{
    NotSended = 0,
    SendedNotSeened = 1,
    sendedAndSeened = 2
}