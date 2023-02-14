using System.ComponentModel.DataAnnotations;

namespace API.Identity.ViewModels
{
    public class ForgotPasswordVM
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
