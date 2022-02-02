namespace APIDataLayer.Interfaces;

public interface IDashboardTaskRepository
{
    Task<bool> CheckAccess(Guid userId, Guid taskId, List<string> ownersEmail);

    Task<bool> CreateDashboardTask(DashboardTask task);

    Task<bool> DeleteDashboardTask(Guid userId, Guid taskId, List<string> ownersEmail);

    List<OutputDashboardTask> GetAllDashboardTasks();

    Task<OutputDashboardTask> GetOutputDashboardTask(Guid taskId);

    void SaveChanges();

    Task SaveChangesAsync();

    Task<OutputDashboardTask> UpdateDashboardTask(UpdateDashboardTask updateTask);
}