namespace API.Hubs;

public class MainHub : Hub
{
    public static int OnlineUsers { get; set; } = 0;

    public async Task UpdateOnlineUsers()
    {
        OnlineUsers++;
        await Clients.All.SendAsync("OnlineUsersUpdated", OnlineUsers);
    }

    public async override Task OnConnectedAsync()
    {
        OnlineUsers++;
        await Clients.All.SendAsync("OnlineUsersUpdated", OnlineUsers);
        await base.OnConnectedAsync();
    }

    public async override Task OnDisconnectedAsync(Exception exception)
    {
        OnlineUsers--;
        await Clients.All.SendAsync("OnlineUsersUpdated", OnlineUsers);
        await base.OnDisconnectedAsync(exception);
    }
}