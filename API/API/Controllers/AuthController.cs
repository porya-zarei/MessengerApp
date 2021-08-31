using API.Hubs;
using APIDataLayer.Context;
using APIDataLayer.DTOs;
using APIDataLayer.Interfaces;
using APIDataLayer.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
{
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
                var cookieConfig = new CookieOptions()
                {
                    HttpOnly = false,
                    Domain = "http://localhost:3000",
                    Expires = DateTime.Now.AddHours(2),
                    Secure = false,
                    SameSite = SameSiteMode.Unspecified
                };
                Response.Cookies.Append("Token", token, cookieConfig);

                //await usersRepository.SetConnectionId(registeredUser.UserID, registerUser.ConnectionID);

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
            var cookieConfig = new CookieOptions()
            {
                HttpOnly = false,
                Domain = "http://localhost:3000",
                Path = "/",
                Expires = DateTime.Now.AddHours(2),
                Secure = false,
                SameSite = SameSiteMode.Unspecified,
                MaxAge = TimeSpan.FromHours(2)
            };
            Response.Cookies.Append("Token", token, cookieConfig);

            //await usersRepository.SetConnectionId(loginedUser.UserID, loginUser.ConnectionID);

            await usersHub.Clients.Client(loginUser.ConnectionID).SendAsync("GetMainUserData", loginedUser);

            return Ok(token);
        }
    }
}