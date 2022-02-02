namespace APIDataLayer.DTOs
{
    public class UpdateGroup
    {
        public Guid GroupID { get; set; }
        public string Name { get; set; }
        public string GroupUserName { get; set; }
        public string GroupDescription { get; set; }
        public IFormFile GroupProfileImage { get; set; }
    }
}