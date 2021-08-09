﻿using APIDataLayer.DTOs;
using APIDataLayer.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APIDataLayer.Interfaces
{
    public interface IUsersRepository
    {
        Task<bool> AddUser(User newUser);

        AllData GetAllData();

        UserInitialData GetInitialData(Guid id);

        string GetUserToken(Dictionary<string, string> pairs, IConfiguration _configuration);

        User GetUserWithEmailPassword(string email, string password);

        string LoginUserAuth(LoginUser loginUser, IConfiguration configuration);

        Task<string> RegisterUserAuth(RegisterUser registerUser, IConfiguration configuration);

        Task SaveChangesAsync();

        Task<bool> SetConnectionId(Guid userId, string connId);

        Task<User> UpdateUserInfo(UpdateUser updateUser, Guid userId, string imageName);

        //Task<bool> SetUserConnectionID(string ID, string CID);
    }
}