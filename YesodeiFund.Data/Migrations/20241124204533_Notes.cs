using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace YesodeiFund.Data.Migrations
{
    /// <inheritdoc />
    public partial class Notes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Notes",
                table: "SpecificDonations",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Notes",
                table: "GeneralDonations",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Notes",
                table: "SpecificDonations");

            migrationBuilder.DropColumn(
                name: "Notes",
                table: "GeneralDonations");
        }
    }
}
