using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APIDataLayer.DTOs
{
    public class UpdateGroup
    {
        public Guid GroupID { get; set; }
        public string Name { get; set; }
        public string GroupUserName { get; set; }
        public string GroupDescription { get; set; }
        public IFormFile GroupProfileImage { get; set; }
    }
}