using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace YesodeiFund.Data.Migrations
{
    /// <inheritdoc />
    public partial class ActiveMonthly : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "ActiveMonthly",
                table: "GeneralDonations",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ActiveMonthly",
                table: "GeneralDonations");
        }
    }
}
