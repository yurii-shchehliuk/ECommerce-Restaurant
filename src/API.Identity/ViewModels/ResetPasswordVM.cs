namespace API.Identity.ViewModels
{
    public class ResetPasswordVM
    {
        public string Email { get; internal set; }
        public string Token { get; internal set; }
        public string Password { get; internal set; }
    }
}
