using APIDataLayer.Context;
using APIDataLayer.DTOs;
using APIDataLayer.Interfaces;
using APIDataLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APIDataLayer.Services
{
    public class DashboardTaskRepository : IDashboardTaskRepository
    {
        private readonly APIContext context;

        public DashboardTaskRepository(APIContext db)

        {
            context = db;
        }

        public async Task<bool> CreateDashboardTask(DashboardTask task)
        {
            try
            {
                await context.DashboardTasks.AddAsync(task);
                await SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<OutputDashboardTask> UpdateDashboardTask(UpdateDashboardTask updateTask)
        {
            try
            {
                var task = await context.DashboardTasks.FindAsync(updateTask.TaskID);
                if (task != null)
                {
                    if (updateTask.Title != null && updateTask.Title.Length > 0 && updateTask.Title != task.Title)
                    {
                        task.Title = updateTask.Title;
                    }
                    if (updateTask.Content != null && updateTask.Content.Length > 0 && updateTask.Content != task.Content)
                    {
                        task.Content = updateTask.Content;
                    }
                    if (updateTask.Finished != task.Finished)
                    {
                        task.Finished = updateTask.Finished;
                        if (updateTask.Finished)
                        {
                            task.FinishDate = DateTime.Now;
                        }
                    }
                    if (updateTask.ForWhoID != task.ForWhoID)
                    {
                        task.ForWhoID = updateTask.ForWhoID;
                    }
                    if (updateTask.StatusColor != null && updateTask.StatusColor.Length > 0 && updateTask.StatusColor != task.StatusColor)
                    {
                        task.StatusColor = updateTask.StatusColor;
                    }

                    await SaveChangesAsync();
                    return await GetOutputDashboardTask(updateTask.TaskID);
                }
                return null;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<OutputDashboardTask> GetOutputDashboardTask(Guid taskId)
        {
            try
            {
                var task = await context.DashboardTasks.FindAsync(taskId);
                var sender = await context.Users.FindAsync(task.SenderID);
                var forWho = await context.Users.FindAsync(task.ForWhoID);
                return new OutputDashboardTask
                {
                    TaskID = task.TaskID,
                    Title = task.Title,
                    Content = task.Content,
                    StartDate = task.StartDate,
                    FinishDate = task.FinishDate,
                    Finished = task.Finished,
                    StatusColor = task.StatusColor,
                    SenderID = task.SenderID,
                    ForWhoID = task.ForWhoID,
                    SenderName = sender.FirstName + " " + sender.LastName,
                    ForWhoName = forWho.FirstName + " " + forWho.LastName
                };
            }
            catch (Exception)
            {
                return null;
            }
        }

        public List<OutputDashboardTask> GetAllDashboardTasks()
        {
            var tasks = context.DashboardTasks.ToList();
            var outputTasks = tasks.Select(task => new OutputDashboardTask
            {
                TaskID = task.TaskID,
                Title = task.Title,
                Content = task.Content,
                StartDate = task.StartDate,
                FinishDate = task.FinishDate,
                Finished = task.Finished,
                StatusColor = task.StatusColor,
                SenderID = task.SenderID,
                ForWhoID = task.ForWhoID,
                SenderName = context.Users.Find(task.SenderID).FirstName + " " + context.Users.Find(task.SenderID).LastName,
                ForWhoName = context.Users.Find(task.ForWhoID).FirstName + " " + context.Users.Find(task.ForWhoID).LastName
            }).ToList();
            return outputTasks;
        }

        public async Task<bool> CheckAccess(Guid userId, Guid taskId, List<string> ownersEmail)
        {
            var user = await context.Users.FindAsync(userId);
            var task = await context.DashboardTasks.FindAsync(taskId);
            if (ownersEmail.Contains(user.Email))
            {
                return true;
            }
            else if (task.SenderID == user.UserID)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public async Task<bool> DeleteDashboardTask(Guid userId, Guid taskId, List<string> ownersEmail)
        {
            try
            {
                if (await CheckAccess(userId, taskId, ownersEmail))
                {
                    var task = await context.DashboardTasks.FindAsync(taskId);
                    context.DashboardTasks.Remove(task);
                    await SaveChangesAsync();
                    return true;
                }
                return false;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public void SaveChanges()
        {
            context.SaveChanges();
        }

        public async Task SaveChangesAsync()
        {
            await context.SaveChangesAsync();
        }
    }
}