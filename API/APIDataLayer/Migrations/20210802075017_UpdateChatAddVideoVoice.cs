using Microsoft.EntityFrameworkCore.Migrations;

namespace APIDataLayer.Migrations
{
    public partial class UpdateChatAddVideoVoice : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Video",
                table: "RoomsChats",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "VideoSize",
                table: "RoomsChats",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<string>(
                name: "Voice",
                table: "RoomsChats",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "VoiceSize",
                table: "RoomsChats",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<string>(
                name: "Video",
                table: "GroupsChats",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "VideoSize",
                table: "GroupsChats",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<string>(
                name: "Voice",
                table: "GroupsChats",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "VoiceSize",
                table: "GroupsChats",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<string>(
                name: "Video",
                table: "ChannelsChats",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "VideoSize",
                table: "ChannelsChats",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<string>(
                name: "Voice",
                table: "ChannelsChats",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "VoiceSize",
                table: "ChannelsChats",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Video",
                table: "RoomsChats");

            migrationBuilder.DropColumn(
                name: "VideoSize",
                table: "RoomsChats");

            migrationBuilder.DropColumn(
                name: "Voice",
                table: "RoomsChats");

            migrationBuilder.DropColumn(
                name: "VoiceSize",
                table: "RoomsChats");

            migrationBuilder.DropColumn(
                name: "Video",
                table: "GroupsChats");

            migrationBuilder.DropColumn(
                name: "VideoSize",
                table: "GroupsChats");

            migrationBuilder.DropColumn(
                name: "Voice",
                table: "GroupsChats");

            migrationBuilder.DropColumn(
                name: "VoiceSize",
                table: "GroupsChats");

            migrationBuilder.DropColumn(
                name: "Video",
                table: "ChannelsChats");

            migrationBuilder.DropColumn(
                name: "VideoSize",
                table: "ChannelsChats");

            migrationBuilder.DropColumn(
                name: "Voice",
                table: "ChannelsChats");

            migrationBuilder.DropColumn(
                name: "VoiceSize",
                table: "ChannelsChats");
        }
    }
}
