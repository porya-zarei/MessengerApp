using APIDataLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APIDataLayer.DTOs
{
    public class CreateRoom
    {
        public Guid SenderUserID { get; set; }
        public string ReceiverUserName { get; set; }

        public Room CreateRoomToRoom(Guid receiverId)
        {
            return new Room()
            {
                RoomID = Guid.NewGuid(),
                SenderUserID = SenderUserID,
                ReceiverUserID = receiverId,
                CreateDate = DateTime.Now,
                RoomChatsID = new List<Guid>() { }
            };
        }
    }
}