using System.Text;
using System.Web;


namespace WebApi.Infrastructure.Helpers
{
    public static class UrlEncoding
    {
        public static string Base64ForUrlEncode(this string str)
        {
            byte[] encbuff = Encoding.UTF8.GetBytes(str);
            return HttpUtility.UrlDecode(encbuff, Encoding.UTF8);
        }

        public static string Base64ForUrlDecode(this string str)
        {
            byte[] decbuff = HttpUtility.UrlEncodeToBytes(str);
            return Encoding.UTF8.GetString(decbuff);
        }
    }
}
