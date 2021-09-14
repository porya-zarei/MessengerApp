using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Hubs.HubModels
{
    public class BoardUser
    {
        public Guid UserID { get; set; }
        public string FullName { get; set; }
        public string ConnectionID { get; set; }
        public Point MousePoint { get; set; }
    }

    public struct Point
    {
        public double X { get; set; }
        public double Y { get; set; }
    }
}