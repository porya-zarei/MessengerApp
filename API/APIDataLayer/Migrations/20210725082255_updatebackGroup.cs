using Microsoft.EntityFrameworkCore.Migrations;

namespace APIDataLayer.Migrations
{
    public partial class updatebackGroup : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GroupUsersID",
                table: "Groups");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<List<Guid>>(
                name: "GroupUsersID",
                table: "Groups",
                type: "uuid[]",
                nullable: true);
        }
    }
}
