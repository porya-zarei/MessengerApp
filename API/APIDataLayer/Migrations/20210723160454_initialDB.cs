using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace APIDataLayer.Migrations
{
    public partial class initialDB : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Channels",
                columns: table => new
                {
                    ChannelID = table.Column<Guid>(type: "uuid", nullable: false),
                    ChannelUserName = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    CreatorID = table.Column<Guid>(type: "uuid", nullable: false),
                    AdminsID = table.Column<List<Guid>>(type: "uuid[]", nullable: true),
                    ChannelChatsID = table.Column<List<Guid>>(type: "uuid[]", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Channels", x => x.ChannelID);
                });

            migrationBuilder.CreateTable(
                name: "ChannelsChats",
                columns: table => new
                {
                    ChatID = table.Column<Guid>(type: "uuid", nullable: false),
                    ChannelID = table.Column<Guid>(type: "uuid", nullable: false),
                    Seens = table.Column<long>(type: "bigint", nullable: false),
                    Text = table.Column<string>(type: "text", nullable: false),
                    Image = table.Column<string>(type: "text", nullable: true),
                    SenderID = table.Column<Guid>(type: "uuid", nullable: false),
                    SendingTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChannelsChats", x => x.ChatID);
                });

            migrationBuilder.CreateTable(
                name: "Groups",
                columns: table => new
                {
                    GroupID = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    GroupUserName = table.Column<string>(type: "text", nullable: false),
                    GroupDescription = table.Column<string>(type: "text", nullable: true),
                    GroupProfileImage = table.Column<string>(type: "text", nullable: true),
                    GroupMembersID = table.Column<List<Guid>>(type: "uuid[]", nullable: true),
                    OnlineUsers = table.Column<int>(type: "integer", nullable: false),
                    CreatorID = table.Column<Guid>(type: "uuid", nullable: false),
                    GroupAdminsID = table.Column<List<Guid>>(type: "uuid[]", nullable: true),
                    GroupChatsID = table.Column<List<Guid>>(type: "uuid[]", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Groups", x => x.GroupID);
                });

            migrationBuilder.CreateTable(
                name: "GroupsChats",
                columns: table => new
                {
                    ChatID = table.Column<Guid>(type: "uuid", nullable: false),
                    GroupID = table.Column<Guid>(type: "uuid", nullable: false),
                    GroupChatStatus = table.Column<int>(type: "integer", nullable: false),
                    Text = table.Column<string>(type: "text", nullable: false),
                    Image = table.Column<string>(type: "text", nullable: true),
                    SenderID = table.Column<Guid>(type: "uuid", nullable: false),
                    SendingTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GroupsChats", x => x.ChatID);
                });

            migrationBuilder.CreateTable(
                name: "Rooms",
                columns: table => new
                {
                    RoomID = table.Column<Guid>(type: "uuid", nullable: false),
                    SenderUserID = table.Column<Guid>(type: "uuid", nullable: false),
                    ReceiverUserID = table.Column<Guid>(type: "uuid", nullable: false),
                    CreateDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    RoomChatsID = table.Column<List<Guid>>(type: "uuid[]", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rooms", x => x.RoomID);
                });

            migrationBuilder.CreateTable(
                name: "RoomsChats",
                columns: table => new
                {
                    ChatID = table.Column<Guid>(type: "uuid", nullable: false),
                    RoomID = table.Column<Guid>(type: "uuid", nullable: false),
                    RoomChatStatus = table.Column<int>(type: "integer", nullable: false),
                    Text = table.Column<string>(type: "text", nullable: false),
                    Image = table.Column<string>(type: "text", nullable: true),
                    SenderID = table.Column<Guid>(type: "uuid", nullable: false),
                    SendingTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoomsChats", x => x.ChatID);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserID = table.Column<Guid>(type: "uuid", nullable: false),
                    UserName = table.Column<string>(type: "text", nullable: false),
                    CurrentConnectionID = table.Column<string>(type: "text", nullable: false),
                    FirstName = table.Column<string>(type: "text", nullable: false),
                    LastName = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    ProfileImage = table.Column<string>(type: "text", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    Status = table.Column<string>(type: "text", nullable: true),
                    UserRoomsID = table.Column<List<Guid>>(type: "uuid[]", nullable: true),
                    UserGroupsID = table.Column<List<Guid>>(type: "uuid[]", nullable: true),
                    UserChannelsID = table.Column<List<Guid>>(type: "uuid[]", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Channels");

            migrationBuilder.DropTable(
                name: "ChannelsChats");

            migrationBuilder.DropTable(
                name: "Groups");

            migrationBuilder.DropTable(
                name: "GroupsChats");

            migrationBuilder.DropTable(
                name: "Rooms");

            migrationBuilder.DropTable(
                name: "RoomsChats");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
