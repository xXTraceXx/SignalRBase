using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CallPrototype.Services
{
    public interface IIdentity
    {
        public int GetIdentity(string connectionID);

        public void RemoveIdentity(string connectionID);

        public Connection_Identity_Item GetConnectionIdentityItem(int id);
    }
}
