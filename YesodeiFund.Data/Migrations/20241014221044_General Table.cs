using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace YesodeiFund.Data.Migrations
{
    /// <inheritdoc />
    public partial class GeneralTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Donations_Chasunas_ChasunaId",
                table: "Donations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Donations",
                table: "Donations");

            migrationBuilder.RenameTable(
                name: "Donations",
                newName: "GeneralDonations");

            migrationBuilder.RenameIndex(
                name: "IX_Donations_ChasunaId",
                table: "GeneralDonations",
                newName: "IX_GeneralDonations_ChasunaId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_GeneralDonations",
                table: "GeneralDonations",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_GeneralDonations_Chasunas_ChasunaId",
                table: "GeneralDonations",
                column: "ChasunaId",
                principalTable: "Chasunas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GeneralDonations_Chasunas_ChasunaId",
                table: "GeneralDonations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_GeneralDonations",
                table: "GeneralDonations");

            migrationBuilder.RenameTable(
                name: "GeneralDonations",
                newName: "Donations");

            migrationBuilder.RenameIndex(
                name: "IX_GeneralDonations_ChasunaId",
                table: "Donations",
                newName: "IX_Donations_ChasunaId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Donations",
                table: "Donations",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Donations_Chasunas_ChasunaId",
                table: "Donations",
                column: "ChasunaId",
                principalTable: "Chasunas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
