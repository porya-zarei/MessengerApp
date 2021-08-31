using API.Hubs;
using APIDataLayer.Context;
using APIDataLayer.DTOs;
using APIDataLayer.Interfaces;
using APIDataLayer.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
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

        private readonly IWebHostEnvironment webHostEnvironment;
        private IConfiguration configuration;

        public DashboardController(IHubContext<UsersHub> _usersHub, APIContext context, IHubContext<MainHub> _hubContext, ILogger<DashboardController> _logger, IConfiguration _configuration)
        {
            logger = _logger;
            configuration = _configuration;
            usersHub = _usersHub;

            roomsChatsRepository = new RoomsChatsRepository(context);
            groupsChatsRepository = new GroupsChatsRepository(context);
            channelsChatsRepository = new ChannelsChatsRepository(context);

            roomsRepository = new RoomsRepository(context);
            groupsRepository = new GroupsRepository(context);
            channelsRepository = new ChannelsRepository(context);

            usersRepository = new UsersRepository(context);
        }

        [HttpGet("GetAllDataForAdmin")]
        [Authorize]
        public ActionResult<AllData> GetAllDataForAdmin()
        {
            var userID = new Guid(User.FindFirst("UserID").Value);

            if (!usersRepository.CheckAccessToAllData(userID))
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

            if (!usersRepository.CheckAccessToAllData(userID))
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
    }
}