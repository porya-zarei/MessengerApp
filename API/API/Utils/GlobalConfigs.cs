namespace API.Utils;
public static class GlobalConfigs
{
    public static readonly CookieOptions CookieConfig = new()
    {
        HttpOnly = false,
        Domain = "http://localhost:3000",
        Expires = DateTime.Now.AddHours(2),
        Secure = false,
        SameSite = SameSiteMode.Unspecified
    };

    public const string TokenKey = "Token";
}