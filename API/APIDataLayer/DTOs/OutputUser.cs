namespace APIDataLayer.DTOs
{
    public class OutputUser
    {
        public Guid UserID { get; set; }

        public string UserName { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string ProfileImage { get; set; }

        public string Description { get; set; }

        public bool IsAdmin { get; set; }
    }
}