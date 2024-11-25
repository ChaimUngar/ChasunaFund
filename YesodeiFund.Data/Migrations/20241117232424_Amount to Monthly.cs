using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace YesodeiFund.Data.Migrations
{
    /// <inheritdoc />
    public partial class AmounttoMonthly : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "Amount",
                table: "Monthly",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.CreateIndex(
                name: "IX_Monthly_GeneralDonationId",
                table: "Monthly",
                column: "GeneralDonationId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Monthly_GeneralDonations_GeneralDonationId",
                table: "Monthly",
                column: "GeneralDonationId",
                principalTable: "GeneralDonations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Monthly_GeneralDonations_GeneralDonationId",
                table: "Monthly");

            migrationBuilder.DropIndex(
                name: "IX_Monthly_GeneralDonationId",
                table: "Monthly");

            migrationBuilder.DropColumn(
                name: "Amount",
                table: "Monthly");
        }
    }
}
