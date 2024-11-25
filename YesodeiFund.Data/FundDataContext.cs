using Microsoft.EntityFrameworkCore;

namespace YesodeiFund.Data;

public class FundDataContext : DbContext
{
    private readonly string _connectionString;

    public FundDataContext(string connectionString)
    {
        _connectionString = connectionString;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer(_connectionString);
    }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
        {
            relationship.DeleteBehavior = DeleteBehavior.Restrict;
        }
    }

    public DbSet<Chasuna> Chasunas { get; set; }
    public DbSet<GeneralDonation> GeneralDonations { get; set; }
    public DbSet<SpecificDonation> SpecificDonations { get; set; }
    public DbSet<Monthly> Monthly { get; set; }
}