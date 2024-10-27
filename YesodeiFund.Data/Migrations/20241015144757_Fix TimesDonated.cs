using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace YesodeiFund.Data.Migrations
{
    /// <inheritdoc />
    public partial class FixTimesDonated : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TimesDonated",
                table: "SpecificDonations");

            migrationBuilder.AddColumn<int>(
                name: "TimesDonated",
                table: "GeneralDonations",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TimesDonated",
                table: "GeneralDonations");

            migrationBuilder.AddColumn<int>(
                name: "TimesDonated",
                table: "SpecificDonations",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
