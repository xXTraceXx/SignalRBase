using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace SQL_Identity_SIgnalR_Base.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public DbSet<Avatar> Avatars { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
    }
}
