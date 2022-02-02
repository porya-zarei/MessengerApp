namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class DashboardController : ControllerBase
{
    private readonly IUsersRepository usersRepository;
    private IHubContext<UsersHub> usersHub;
    private ILogger<DashboardController> logger;

    private readonly IRoomsChatsRepository roomsChatsRepository;
    private readonly IGroupsChatsRepository groupsChatsRepository;
    private readonly IChannelsChatsRepository channelsChatsRepository;
    private readonly IRoomsRepository roomsRepository;
    private readonly IGroupsRepository groupsRepository;
    private readonly IChannelsRepository channelsRepository;
    private readonly IDashboardTaskRepository dashboardTaskRepository;

    private readonly IWebHostEnvironment webHostEnvironment;
    private IConfiguration configuration;

    public DashboardController(IHubContext<UsersHub> _usersHub, APIContext context, IHubContext<MainHub> _hubContext, ILogger<DashboardController> _logger, IConfiguration _configuration, IWebHostEnvironment environment)
    {
        logger = _logger;
        configuration = _configuration;
        usersHub = _usersHub;
        webHostEnvironment = environment;

        roomsChatsRepository = new RoomsChatsRepository(context);
        groupsChatsRepository = new GroupsChatsRepository(context);
        channelsChatsRepository = new ChannelsChatsRepository(context);

        roomsRepository = new RoomsRepository(context);
        groupsRepository = new GroupsRepository(context);
        channelsRepository = new ChannelsRepository(context);

        usersRepository = new UsersRepository(context);
        dashboardTaskRepository = new DashboardTaskRepository(context);
    }

    [HttpGet("GetAllDataForAdmin")]
    [Authorize]
    public ActionResult<AllData> GetAllDataForAdmin()
    {
        var userID = new Guid(User.FindFirst("UserID").Value);

        if (!usersRepository.CheckAccessToAllData(userID, OwnersHelper.OwnersEmail))
        {
            return BadRequest();
        }
        else
        {
            var allData = usersRepository.GetAllDataForAdmin();

            if (allData != null)
            {
                return Ok(allData);
            }
            else
            {
                return BadRequest();
            }
        }
    }

    [HttpGet("GetUserDataForAdmin")]
    [Authorize]
    public ActionResult<OutputUser> GetUserDataForAdmin(Guid? userId)
    {
        var userID = new Guid(User.FindFirst("UserID").Value);

        if (!usersRepository.CheckAccessToAllData(userID, OwnersHelper.OwnersEmail))
        {
            return BadRequest();
        }
        else
        {
            var userData = usersRepository.GetOutputUser(userId ?? userID);

            if (userData != null)
            {
                return Ok(userData);
            }
            else
            {
                return BadRequest();
            }
        }
    }

    [HttpGet("GetAllTasks")]
    [Authorize]
    public ActionResult<List<OutputDashboardTask>> GetAllTasks()
    {
        var userID = new Guid(User.FindFirst("UserID").Value);

        if (!usersRepository.CheckAccessToAllData(userID, OwnersHelper.OwnersEmail))
        {
            return BadRequest();
        }
        else
        {
            var tasks = dashboardTaskRepository.GetAllDashboardTasks();

            if (tasks != null)
            {
                return Ok(tasks);
            }
            else
            {
                return BadRequest();
            }
        }
    }

    [HttpPost("CreateTask")]
    [Authorize]
    public async Task<ActionResult<bool>> CreateTask(CreateDashboardTask createTask)
    {
        var userID = new Guid(User.FindFirst("UserID").Value);

        if (!usersRepository.CheckAccessToAllData(userID, OwnersHelper.OwnersEmail))
        {
            return BadRequest();
        }
        else
        {
            var t = createTask.GetDashboardTask(userID);
            var res = await dashboardTaskRepository.CreateDashboardTask(t);
            if (res)
            {
                var task = await dashboardTaskRepository.GetOutputDashboardTask(t.TaskID);
                await usersHub.Clients.Clients(usersRepository.GetOwnersConnectionId(OwnersHelper.OwnersEmail)).SendAsync("TaskCreated", task);
                return Ok(task);
            }
            else
            {
                return BadRequest();
            }
        }
    }

    [HttpPost("UpdateTask")]
    [Authorize]
    public async Task<ActionResult<OutputDashboardTask>> UpdateTask(UpdateDashboardTask updateTask)
    {
        var userID = new Guid(User.FindFirst("UserID").Value);

        if (!usersRepository.CheckAccessToAllData(userID, OwnersHelper.OwnersEmail))
        {
            return BadRequest();
        }
        else
        {
            var task = await dashboardTaskRepository.UpdateDashboardTask(updateTask);

            if (task != null)
            {
                await usersHub.Clients.Clients(usersRepository.GetOwnersConnectionId(OwnersHelper.OwnersEmail)).SendAsync("TaskUpdated", task);
                return Ok(task);
            }
            else
            {
                return BadRequest();
            }
        }
    }

    [HttpPost("DeleteTask")]
    [Authorize]
    public async Task<ActionResult<OutputDashboardTask>> DeleteTask(Guid taskId)
    {
        var userID = new Guid(User.FindFirst("UserID").Value);

        if (!usersRepository.CheckAccessToAllData(userID, OwnersHelper.OwnersEmail))
        {
            return BadRequest();
        }
        else
        {
            var res = await dashboardTaskRepository.DeleteDashboardTask(userID, taskId, OwnersHelper.OwnersEmail);

            if (res)
            {
                await usersHub.Clients.Clients(usersRepository.GetOwnersConnectionId(OwnersHelper.OwnersEmail)).SendAsync("TaskDeleted", taskId);
                return Ok(res);
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
