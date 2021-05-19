using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CallPrototype.Services
{
    public class Connection_Identity_Item
    {
        public string ConnectionId { get; }

        public int Id { get; }

        public Connection_Identity_Item(string connectionID, int id)
        {
            this.ConnectionId = connectionID;
            this.Id = id;
        }
    }
}
