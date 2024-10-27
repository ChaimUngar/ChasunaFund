﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using YesodeiFund.Data;

#nullable disable

namespace YesodeiFund.Data.Migrations
{
    [DbContext(typeof(FundDataContext))]
    [Migration("20241014210258_SpecificDonations")]
    partial class SpecificDonations
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.17")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("YesodeiFund.Data.Chasuna", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Chassan")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<string>("Kallah")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Neighbor")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NeighborhoodSide")
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal>("TotalFunds")
                        .HasColumnType("decimal(18,2)");

                    b.HasKey("Id");

                    b.ToTable("Chasunas");
                });

            modelBuilder.Entity("YesodeiFund.Data.Donation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<decimal>("Amount")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int?>("ChasunaId")
                        .HasColumnType("int");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<bool>("Monthly")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("ChasunaId");

                    b.ToTable("Donations");
                });

            modelBuilder.Entity("YesodeiFund.Data.Donation", b =>
                {
                    b.HasOne("YesodeiFund.Data.Chasuna", null)
                        .WithMany("Donations")
                        .HasForeignKey("ChasunaId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("YesodeiFund.Data.Chasuna", b =>
                {
                    b.Navigation("Donations");
                });
#pragma warning restore 612, 618
        }
    }
}
