using Microsoft.EntityFrameworkCore.Migrations;

namespace APIDataLayer.Migrations
{
    public partial class addDescriptionToChannel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ChannelDescription",
                table: "Channels",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ChannelDescription",
                table: "Channels");
        }
    }
}
