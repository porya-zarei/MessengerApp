namespace APIDataLayer.Interfaces;
public interface IUsersRepository
{
    Task<bool> AddUser(User newUser);

    bool CheckAccessToAllData(Guid userId, List<string> ownersEmail);

    AllData GetAllData();

    AllData GetAllDataForAdmin();

    UserInitialData GetInitialData(Guid id);

    OutputUser GetOutputUser(Guid userId);

    List<string> GetOwnersConnectionId(List<string> emails);

    string GetUserToken(Dictionary<string, string> pairs, IConfiguration _configuration);

    User GetUserWithEmailPassword(string email, string password);

    Task<User> GetUserWithUserID(Guid id);

    User GetUserWithUserName(string userName);

    bool IsUserNameUnique(string userName);

    string LoginUserAuth(LoginUser loginUser, IConfiguration configuration);

    Task<string> RegisterUserAuth(RegisterUser registerUser, IConfiguration configuration);

    Task SaveChangesAsync();

    Task<bool> SetConnectionId(Guid userId, string connId);

    Task<User> UpdateUserInfo(UpdateUser updateUser, Guid userId, string imageName);

    //Task<bool> SetUserConnectionID(string ID, string CID);
}