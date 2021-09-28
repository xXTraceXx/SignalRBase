using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace SQL_Identity_SIgnalR_Base
{
    internal class ViewerHub : Hub
    {
        public async Task<bool> Hello()
        {
            return false;
        }

    }
}