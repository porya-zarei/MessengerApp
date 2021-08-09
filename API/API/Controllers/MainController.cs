using API.Hubs;
using APIDataLayer.Context;
using APIDataLayer.DTOs;
using APIDataLayer.Interfaces;
using APIDataLayer.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MainController : ControllerBase
    {
        private readonly IUsersRepository usersRepository;
        private IHubContext<MainHub> hubContext;
        private ILogger<MainController> logger;
        private IConfiguration configuration;
        private readonly IHubContext<UsersHub> usersHub;

        public MainController(IHubContext<UsersHub> _usersHub, APIContext context, IHubContext<MainHub> _hubContext, ILogger<MainController> _logger, IConfiguration _configuration)
        {
            usersRepository = new UsersRepository(context);
            hubContext = _hubContext;
            logger = _logger;
            configuration = _configuration;
            usersHub = _usersHub;
        }

        // GET: api/<MainController>
        [Authorize]
        [HttpGet("GetUserInitialData")]
        public UserInitialData GetUserInitialData()
        {
            var id = User.FindFirst("UserID").Value;
            return usersRepository.GetInitialData(new Guid(id));
        }

        [Authorize]
        [HttpGet("GetAllData")]
        public AllData GetAllData()
        {
            return usersRepository.GetAllData();
        }
    }
}