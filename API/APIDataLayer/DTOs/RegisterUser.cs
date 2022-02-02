namespace APIDataLayer.DTOs
{
    public class RegisterUser
    {
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        public string ConnectionID { get; set; }

        public User RegisterUserToUser()
        {
            return new User()
            {
                UserName = UserName,
                FirstName = FirstName,
                LastName = LastName,
                Email = Email,
                Password = Password
            };
        }
    }
}