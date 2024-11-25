using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace YesodeiFund.Data.Migrations
{
    /// <inheritdoc />
    public partial class DonationId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Monthly_GeneralDonations_GeneralDonationId",
                table: "Monthly");

            migrationBuilder.DropIndex(
                name: "IX_Monthly_GeneralDonationId",
                table: "Monthly");

            migrationBuilder.RenameColumn(
                name: "GeneralDonationId",
                table: "Monthly",
                newName: "DonationId");

            migrationBuilder.CreateIndex(
                name: "IX_Monthly_DonationId",
                table: "Monthly",
                column: "DonationId");

            migrationBuilder.AddForeignKey(
                name: "FK_Monthly_GeneralDonations_DonationId",
                table: "Monthly",
                column: "DonationId",
                principalTable: "GeneralDonations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Monthly_GeneralDonations_DonationId",
                table: "Monthly");

            migrationBuilder.DropIndex(
                name: "IX_Monthly_DonationId",
                table: "Monthly");

            migrationBuilder.RenameColumn(
                name: "DonationId",
                table: "Monthly",
                newName: "GeneralDonationId");

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
    }
}
