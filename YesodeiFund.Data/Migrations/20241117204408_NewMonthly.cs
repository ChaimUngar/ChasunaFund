using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace YesodeiFund.Data.Migrations
{
    /// <inheritdoc />
    public partial class NewMonthly : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TimesDonated",
                table: "GeneralDonations");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TimesDonated",
                table: "GeneralDonations",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
