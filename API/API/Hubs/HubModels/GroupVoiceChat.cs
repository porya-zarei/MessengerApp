namespace API.Hubs.HubModels;
public class GroupVoiceChat
{
    public Guid GroupID { get; set; }
    public List<string> JoinedUsersConnectionId { get; set; } = new List<string>() { };
    public List<string> JoinedUsersFullName { get; set; } = new List<string>() { };
}