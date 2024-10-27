using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace YesodeiFund.Data.Migrations
{
    /// <inheritdoc />
    public partial class Name : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "SpecificDonations",
                newName: "LastName");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "GeneralDonations",
                newName: "LastName");

            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "SpecificDonations",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "GeneralDonations",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FirstName",
                table: "SpecificDonations");

            migrationBuilder.DropColumn(
                name: "FirstName",
                table: "GeneralDonations");

            migrationBuilder.RenameColumn(
                name: "LastName",
                table: "SpecificDonations",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "LastName",
                table: "GeneralDonations",
                newName: "Name");
        }
    }
}
