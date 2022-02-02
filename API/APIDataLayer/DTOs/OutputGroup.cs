namespace APIDataLayer.DTOs
{
    public class OutputGroup
    {
        public Guid GroupID { get; set; }

        public string Name { get; set; }
        public string GroupUserName { get; set; }
        public string GroupDescription { get; set; } = "";
        public string GroupProfileImage { get; set; } = "";
        public List<string> GroupMembersName { get; set; }
        public int OnlineUsers { get; set; } = 0;
        public List<string> AdminsName { get; set; }
        public List<string> AdminsUserName { get; set; }
        public List<OutputGroupChat> Chats { get; set; }
    }
}