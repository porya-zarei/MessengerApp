namespace APIDataLayer.DTOs
{
    public class CreateGroup
    {
        public string Name { get; set; }
        public string GroupUserName { get; set; }
        public Guid CreatorID { get; set; }
        public string GroupDescription { get; set; }

        public Group CreateGroupToGroup()
        {
            return new Group()
            {
                GroupID = Guid.NewGuid(),
                Name = Name,
                GroupUserName = GroupUserName,
                CreatorID = CreatorID,
                GroupDescription = GroupDescription,
                GroupProfileImage = "",
                GroupAdminsID = new List<Guid>() { CreatorID },
                GroupMembersID = new List<Guid>() { CreatorID },
                GroupChatsID = new List<Guid>() { }
            };
        }
    }
}