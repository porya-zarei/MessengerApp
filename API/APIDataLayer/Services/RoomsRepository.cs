using APIDataLayer.Context;
using APIDataLayer.DTOs;
using APIDataLayer.Interfaces;
using APIDataLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APIDataLayer.Services
{
    public class RoomsRepository : IRoomsRepository
    {
        private readonly APIContext context;

        public RoomsRepository(APIContext _context)
        {
            context = _context;
        }

        //public async Task<bool> AddRoom(Room room)
        //{
        //    try
        //    {
        //        await context.Rooms.AddAsync(room);
        //        return true;
        //    }
        //    catch (Exception)
        //    {
        //        return false;
        //    }
        //}

        public async Task<bool> CreateRoom(Room room)
        {
            try
            {
                var sender = await context.Users.FindAsync(room.SenderUserID);
                if (sender.UserRoomsID == null)
                {
                    sender.UserRoomsID = new List<Guid>() { };
                }
                sender.UserRoomsID.Add(room.RoomID);
                var receiver = await context.Users.FindAsync(room.ReceiverUserID);
                if (receiver.UserRoomsID == null)
                {
                    receiver.UserRoomsID = new List<Guid>() { };
                }
                receiver.UserRoomsID.Add(room.RoomID);
                room.RoomChatsID = new List<Guid>() { };
                context.Rooms.Add(room);

                await SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public List<string> GetRoomUsersConnectionID(Guid roomID)
        {
            try
            {
                var res = new List<string>() { };
                var room = context.Rooms.Find(roomID);
                var sender = context.Users.Find(room.SenderUserID);
                var receiver = context.Users.Find(room.ReceiverUserID);

                res.Add(sender.CurrentConnectionID);
                res.Add(receiver.CurrentConnectionID);
                return res;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public List<string> GetRoomUsersConnectionID(Guid roomID, Guid senderId, Guid receiverId)
        {
            try
            {
                var res = new List<string>() { };

                var sender = context.Users.Find(senderId);
                var receiver = context.Users.Find(receiverId);

                res.Add(sender.CurrentConnectionID);
                res.Add(receiver.CurrentConnectionID);
                return res;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public OutputRoom RoomToOutputRoom(Room room, Guid userId)
        {
            var users = context.Users.ToList();
            var user = users.Find(u => u.UserID == userId);
            return new OutputRoom()
            {
                RoomID = room.RoomID,
                CreateDate = room.CreateDate,
                ReceiverUserID = room.ReceiverUserID,
                SenderUserID = room.SenderUserID,
                OtherName = (user.UserID == room.ReceiverUserID ? (users.Find(u => u.UserID == room.SenderUserID).FirstName + " " + users.Find(u => u.UserID == room.SenderUserID).LastName) : (users.Find(u => u.UserID == room.ReceiverUserID).FirstName + " " + users.Find(u => u.UserID == room.ReceiverUserID).LastName)),
                OtherUserImage = (user.UserID == room.ReceiverUserID ? users.Find(u => u.UserID == room.SenderUserID).ProfileImage : users.Find(u => u.UserID == room.ReceiverUserID).ProfileImage),
                OtherUserName = (user.UserID == room.ReceiverUserID ? users.Find(u => u.UserID == room.SenderUserID).UserName : users.Find(u => u.UserID == room.ReceiverUserID).UserName),
                OtherDescription = (user.UserID == room.ReceiverUserID ? users.Find(u => u.UserID == room.SenderUserID).Description : users.Find(u => u.UserID == room.ReceiverUserID).Description),
                SenderName = users.First(u => u.UserID == room.SenderUserID).FirstName + " " + users.First(u => u.UserID == room.SenderUserID).LastName,
                ReceiverName = users.First(u => u.UserID == room.ReceiverUserID).FirstName + " " + users.First(u => u.UserID == room.ReceiverUserID).LastName,
                Chats = room.RoomChatsID.Count > 0 ? RoomChatsToOutputRoomChats(room.RoomChatsID) : new List<OutputRoomChat>() { }
            };
        }

        public List<OutputRoomChat> RoomChatsToOutputRoomChats(List<Guid> chatsId)
        {
            var chats = context.RoomsChats.ToList().Where(cc => chatsId.Contains(cc.ChatID)).ToList();
            var result = chats.Select(ch => new OutputRoomChat()
            {
                ChatID = ch.ChatID,
                RoomID = ch.RoomID,
                Image = ch.Image,
                File = ch.File,
                ImageSize = ch.ImageSize,
                FileSize = ch.FileSize,
                SendingTime = ch.SendingTime,
                Text = ch.Text,
                RoomChatStatus = ch.RoomChatStatus,
                SenderID = ch.SenderID
            }).ToList();
            return result;
        }

        public User GetUserWithUserName(string userName)
        {
            var user = context.Users.ToList().Find(u => u.UserName == userName);
            return user;
        }

        public async Task<Guid> GetRoomIDWithChatID(Guid id)
        {
            return (await context.RoomsChats.FindAsync(id)).RoomID;
        }

        public async Task<Room> GetRoomWithChatID(Guid id)
        {
            var roId = (await context.RoomsChats.FindAsync(id)).RoomID;
            return (await context.Rooms.FindAsync(roId));
        }

        public async Task<Room> GetRoomWithRoomID(Guid id)
        {
            return (await context.Rooms.FindAsync(id));
        }

        public async Task SaveChangesAsync()
        {
            await context.SaveChangesAsync();
        }

        public void SaveChanges()
        {
            context.SaveChanges();
        }
    }
}