using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CallPrototype.Services
{
    public class IdentityService : IIdentity
    {
        private List<Connection_Identity_Item> _reservedIdentitties = new List<Connection_Identity_Item>();

        public Connection_Identity_Item GetConnectionIdentityItem(int id)
        {
            return this._reservedIdentitties.Single(o => o.Id == id);
        }

        public int GetIdentity(string connectionID)
        {
            if(String.IsNullOrEmpty(connectionID))
                throw new ArgumentNullException($"Argument {nameof(connectionID)} is null or empty");

            int identityNumber = _reservedIdentitties.Count > 0 ? _reservedIdentitties.Last().Id + 1 : 0;
            _reservedIdentitties.Add(new Connection_Identity_Item(connectionID, identityNumber));

            return identityNumber;
        }

        public void RemoveIdentity(string connectionID)
        {
            if (String.IsNullOrEmpty(connectionID))
                throw new ArgumentNullException($"Argument {nameof(connectionID)} is null or empty");

            var connection_identity_item = _reservedIdentitties.Single(o => o.ConnectionId == connectionID);

            _reservedIdentitties.Remove(connection_identity_item);
        }
    }
}
