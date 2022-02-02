namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IUsersRepository usersRepository;
    private ILogger<AuthController> logger;
    private IConfiguration configuration;
    private readonly IHubContext<UsersHub> usersHub;

    public AuthController(IHubContext<UsersHub> _usersHub, APIContext context, IHubContext<MainHub> _hubContext, ILogger<AuthController> _logger, IConfiguration _configuration)
    {
        usersRepository = new UsersRepository(context);
        logger = _logger;
        configuration = _configuration;
        usersHub = _usersHub;
    }

    // GET: api/<AuthController>
    [HttpPost("Register")]
    public async Task<IActionResult> Register(RegisterUser registerUser)
    {
        string token = await usersRepository.RegisterUserAuth(registerUser, configuration);
        if (token != null)
        {
            var registeredUser = usersRepository.GetUserWithEmailPassword(registerUser.Email, registerUser.Password);

            Response.Cookies.Append(GlobalConfigs.TokenKey, token, GlobalConfigs.CookieConfig);

            await usersHub.Clients.Client(registerUser.ConnectionID).SendAsync("GetMainUserData", registeredUser);

            return Ok(token);
        }
        else
        {
            return BadRequest();
        }
    }

    // POST api/<AuthController>
    [HttpPost("Login")]
    public async Task<IActionResult> Login(LoginUser loginUser)
    {
        var token = usersRepository.LoginUserAuth(loginUser, configuration);
        if (token == null)
        {
            return BadRequest();
        }
        var loginedUser = usersRepository.GetUserWithEmailPassword(loginUser.Email, loginUser.Password);

        Response.Cookies.Append(GlobalConfigs.TokenKey, token, GlobalConfigs.CookieConfig);

        //await usersRepository.SetConnectionId(loginedUser.UserID, loginUser.ConnectionID);

        await usersHub.Clients.Client(loginUser.ConnectionID).SendAsync("GetMainUserData", loginedUser);

        return Ok(token);
    }
}
