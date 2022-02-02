namespace APIDataLayer.DTOs
{
    public class CreateChannel
    {
        public string ChannelUserName { get; set; }
        public string Name { get; set; }
        public Guid CreatorID { get; set; }
        public string ChannelDescription { get; set; } = "";

        public Channel CreateChannelToChannel()
        {
            return new Channel()
            {
                ChannelID = Guid.NewGuid(),
                Name = Name,
                ChannelUserName = ChannelUserName,
                CreatorID = CreatorID,
                AdminsID = new List<Guid>() { CreatorID },
                ChannelUsersID = new List<Guid>() { CreatorID },
                ChannelChatsID = new List<Guid>() { },
                ChannelDescription = ChannelDescription,
                ChannelProfileImage = ""
            };
        }
    }
}