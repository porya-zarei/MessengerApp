using Microsoft.EntityFrameworkCore.Migrations;

namespace APIDataLayer.Migrations
{
    public partial class add_ChannelProfileImage : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ChannelProfileImage",
                table: "Channels",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ChannelProfileImage",
                table: "Channels");
        }
    }
}
