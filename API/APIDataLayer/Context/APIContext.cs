using APIDataLayer.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APIDataLayer.Context
{
    public class APIContext : DbContext
    {
        public APIContext(DbContextOptions<APIContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<Channel> Channels { get; set; }
        public DbSet<RoomChat> RoomsChats { get; set; }
        public DbSet<GroupChat> GroupsChats { get; set; }
        public DbSet<ChannelChat> ChannelsChats { get; set; }
    }
}