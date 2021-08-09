using Microsoft.EntityFrameworkCore.Migrations;

namespace APIDataLayer.Migrations
{
    public partial class updateChat : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "File",
                table: "RoomsChats",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "FileSize",
                table: "RoomsChats",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "ImageSize",
                table: "RoomsChats",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<string>(
                name: "File",
                table: "GroupsChats",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "FileSize",
                table: "GroupsChats",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "ImageSize",
                table: "GroupsChats",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<string>(
                name: "File",
                table: "ChannelsChats",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "FileSize",
                table: "ChannelsChats",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "ImageSize",
                table: "ChannelsChats",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "File",
                table: "RoomsChats");

            migrationBuilder.DropColumn(
                name: "FileSize",
                table: "RoomsChats");

            migrationBuilder.DropColumn(
                name: "ImageSize",
                table: "RoomsChats");

            migrationBuilder.DropColumn(
                name: "File",
                table: "GroupsChats");

            migrationBuilder.DropColumn(
                name: "FileSize",
                table: "GroupsChats");

            migrationBuilder.DropColumn(
                name: "ImageSize",
                table: "GroupsChats");

            migrationBuilder.DropColumn(
                name: "File",
                table: "ChannelsChats");

            migrationBuilder.DropColumn(
                name: "FileSize",
                table: "ChannelsChats");

            migrationBuilder.DropColumn(
                name: "ImageSize",
                table: "ChannelsChats");
        }
    }
}
