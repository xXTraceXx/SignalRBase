using CallPrototype.Services;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CallPrototype.SignalR
{
    public class ViewerHub : Hub
    {
        private readonly IIdentity _identityService;

        public ViewerHub(IIdentity identityService)
        {
            this._identityService = identityService;
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            _identityService.RemoveIdentity(Context.ConnectionId);

            return base.OnDisconnectedAsync(exception);
        }

        public int JoinHome()
        {
            return _identityService.GetIdentity(Context.ConnectionId);
        }

        public void Call()
        {
            var connectionID = this._identityService.GetConnectionIdentityItem(1).ConnectionId;

            Clients.Client(connectionID).SendAsync("incomingCall");
        }

        public void HangUpPhone()
        {

        }
    }
}
