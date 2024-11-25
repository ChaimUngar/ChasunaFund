using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace YesodeiFund.Data
{
    public class DonationRepo
    {
        private readonly string _connectionString;
        public DonationRepo(string connectionString)
        {
            _connectionString = connectionString;
        }

        public void Add(GeneralDonation d)
        {
            var context = new FundDataContext(_connectionString);
            d.ActiveMonthly = d.Monthly;
            context.GeneralDonations.Add(d);
            context.SaveChanges();

            if (d.Monthly == true)
            {
                context.Monthly.Add(new Monthly
                {
                    Method = d.MethodOfDonation,
                    Month = DateTime.Now,
                    WentThru = true,
                    DonationId = d.Id,
                    Amount = d.Amount
                });
                context.SaveChanges();
            }
        }

        public List<GeneralDonation> Get()
        {
            var context = new FundDataContext(_connectionString);
            return context.GeneralDonations.OrderBy(d => d.Date).ToList();
        }

        public void AddSpecific(SpecificDonation donation)
        {
            var context = new FundDataContext(_connectionString);
            donation.EntryDate = DateTime.Now;
            context.SpecificDonations.Add(donation);
            context.SaveChanges();
        }

        public List<SpecificDonation> GetSpecific()
        {
            var context = new FundDataContext(_connectionString);
            return context.SpecificDonations.Include(d => d.Chasuna).OrderBy(d => d.Date).ToList();
        }

        public void AddMonthlyToTotal()
        {
            var context = new FundDataContext(_connectionString);
            var monthly = context.GeneralDonations.Where(d => d.ActiveMonthly == true).ToList();

            var toAdd = new List<Monthly>();
            foreach (var m in monthly)
            {
                toAdd.Add(new Monthly
                {
                    Month = DateTime.Now,
                    Method = m.MethodOfDonation,
                    WentThru = true,
                    Amount = m.Amount,
                    DonationId = m.Id
                });
            }

            context.Monthly.AddRange(toAdd);
            context.SaveChanges();
        }

        public List<SpecificDonation> GetSpecificDonationDetails(int chasunaId)
        {
            var context = new FundDataContext(_connectionString);
            return context.SpecificDonations.Where(d => d.ChasunaId == chasunaId).OrderBy(d => d.Date).ToList();
        }

        public List<GeneralDonation> GetMonthlyDonations()
        {
            var context = new FundDataContext(_connectionString);
            return context.GeneralDonations.Where(d => d.Monthly == true).ToList();
        }

        public List<GeneralDonation> GetOneTimeDonations()
        {
            var context = new FundDataContext(_connectionString);
            return context.GeneralDonations.Where(d => d.Monthly == false).ToList();
        }

        public Donation GetById(int id)
        {
            var context = new FundDataContext(_connectionString);
            var gDonation = context.GeneralDonations.FirstOrDefault(d => d.Id == id);

            if (gDonation == null)
            {
                var sDonation = context.SpecificDonations.Include(d => d.Chasuna).FirstOrDefault(d => d.Id == id);
                return new Donation
                {
                    Id = sDonation.Id,
                    FirstName = sDonation.FirstName,
                    LastName = sDonation.LastName,
                    Amount = sDonation.Amount,
                    PhoneNumber = sDonation.PhoneNumber,
                    Date = sDonation.Date,
                    Chasuna = sDonation.Chasuna,
                    ChasunaId = sDonation.ChasunaId,
                    MethodOfDonation = sDonation.MethodOfDonation,
                    Notes = sDonation.Notes
                };
            }

            return new Donation
            {
                Id = gDonation.Id,
                FirstName = gDonation.FirstName,
                LastName = gDonation.LastName,
                Amount = gDonation.Amount,
                PhoneNumber = gDonation.PhoneNumber,
                Date = gDonation.Date,
                Monthly = gDonation.Monthly,
                MethodOfDonation = gDonation.MethodOfDonation,
                Notes = gDonation.Notes
            };
        }

        public void UpdateGeneral(Donation d)
        {
            var context = new FundDataContext(_connectionString);
            context.Database.ExecuteSqlInterpolated
                ($@"UPDATE GeneralDonations SET 
                FirstName = {d.FirstName}, LastName = {d.LastName}, PhoneNumber = {d.PhoneNumber}, Notes = {d.Notes}
                Amount = {d.Amount}, Date = {d.Date}, Monthly = {d.Monthly}, MethodOfDonation = {d.MethodOfDonation}
                WHERE Id = {d.Id}");

            context.SaveChanges();

        }

        public void UpdateSpecific(Donation d)
        {
            var context = new FundDataContext(_connectionString);
            context.Database.ExecuteSqlInterpolated
                ($@"UPDATE SpecificDonations SET 
                FirstName = {d.FirstName}, LastName = {d.LastName}, PhoneNumber = {d.PhoneNumber}, Notes = {d.Notes}
                Amount = {d.Amount}, Date = {d.Date}, ChasunaId = {d.ChasunaId}, MethodOfDonation = {d.MethodOfDonation}
                WHERE Id = {d.Id}");

            context.SaveChanges();
        }

        public GeneralDonation GetGeneralDetails(int id)
        {
            var context = new FundDataContext(_connectionString);
            return (GeneralDonation)context.GeneralDonations.Include(d => d.MonthlyDetails).FirstOrDefault(d => d.Id == id);
        }

        public void UpdateMonthly(Monthly m)
        {
            var context = new FundDataContext(_connectionString);
            context.Database.ExecuteSqlInterpolated
                ($@"UPDATE Monthly SET 
                Method = {m.Method}, WentThru = {m.WentThru}
                WHERE Id = {m.Id}");

            context.SaveChanges();
        }

        public List<Monthly> GetMonthlyDetails()
        {
            var context = new FundDataContext(_connectionString);
            return context.Monthly.Where(d => d.WentThru == true).ToList();
        }

        public void SwitchIfMonthly(int id)
        {
            var context = new FundDataContext(_connectionString);

            var donation = context.GeneralDonations.FirstOrDefault(d => d.Id == id);

            context.Database.ExecuteSqlInterpolated
                ($@"UPDATE GeneralDonations SET 
                ActiveMonthly = {!donation.ActiveMonthly}
                WHERE Id = {id}");

            context.SaveChanges();
        }

    }
}
