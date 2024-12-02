using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace YesodeiFund.Data
{
    public class ChasunaRepo
    {
        private readonly string _connectionString;
        public ChasunaRepo(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Chasuna> GetAll()
        {
            var context = new FundDataContext(_connectionString);
            return context.Chasunas.ToList();
        }

        public void Add(Chasuna chasuna)
        {
            var context = new FundDataContext(_connectionString);
            context.Chasunas.Add(chasuna);
            context.SaveChanges();
        }

        public decimal GetSpecificTotal(int chasunaId)
        {
            var context = new FundDataContext(_connectionString);
            return context.SpecificDonations.Where(d => d.ChasunaId == chasunaId).Sum(d => d.Amount);
        }

        public Chasuna GetById(int id)
        {
            var context = new FundDataContext(_connectionString);
            return context.Chasunas.FirstOrDefault(c => c.Id == id);
        }

        public void Update(Chasuna c)
        {
            var context = new FundDataContext(_connectionString);
            context.Database.ExecuteSqlInterpolated
                ($@"UPDATE Chasunas SET 
                Rabbi = {c.Rabbi}, Mrs = {c.Mrs}, Neighbor = {c.Neighbor}, Date = {c.Date}, BaseAmount = {c.BaseAmount}
                Chassan = {c.Chassan}, Kallah = {c.Kallah}, NeighborhoodSide = {c.NeighborhoodSide}
                WHERE Id = {c.Id}");

            context.SaveChanges();
        }

        public void GiveFunds(int id)
        {
            var context = new FundDataContext(_connectionString);
            var chasuna = context.Chasunas.FirstOrDefault(c => c.Id == id);

            chasuna.GivenFunds = true;

            context.SaveChanges();
        }

        public List<int> GetGivenIds()
        {
            var context = new FundDataContext(_connectionString);
            return context.Chasunas.Where(c => c.GivenFunds == true).Select(c => c.Id).ToList();
        }
    }
}
