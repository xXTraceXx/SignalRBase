using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace SQL_Identity_SIgnalR_Base
{
    internal class ViewerHub : Hub
    {
        public async Task ClientStopVideo()
        {
            await Clients.All.SendAsync("stopVideo");
        }

        public async Task ClientStartVideo()
        {
            await Clients.All.SendAsync("startVideo");
        }

    }
}