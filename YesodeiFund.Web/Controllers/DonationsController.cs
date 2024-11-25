using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;
using System.Diagnostics;
using YesodeiFund.Data;
using YesodeiFund.Web.Models;

namespace YesodeiFund.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DonationsController : ControllerBase
    {
        private readonly string _connectionString;
        public DonationsController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpPost]
        [Route("add")]
        public void AddDonation(GeneralDonation donation)
        {
            var repo = new DonationRepo(_connectionString);
            repo.Add(donation);
        }

        [HttpGet]
        [Route("get")]
        public List<GeneralDonation> GetDonations()
        {
            var repo = new DonationRepo(_connectionString);
            return repo.Get();
        }

        [HttpPost]
        [Route("add-specific")]
        public void AddSpecific(SpecificDonation donation)
        {
            var repo = new DonationRepo(_connectionString);
            repo.AddSpecific(donation);
        }

        [HttpGet]
        [Route("get-specific")]
        public List<SpecificDonation> GetSpecificDonations()
        {
            var repo = new DonationRepo(_connectionString);
            return repo.GetSpecific();
        }

        [HttpGet]
        [Route("get-all")]
        public List<Donation> GetAll()
        {
            var list = new List<Donation>();

            var general = GetDonations().Select(d => new Donation
            {
                Id = d.Id,
                FirstName = d.FirstName,
                LastName = d.LastName,
                Amount = d.Amount,
                Date = d.Date,
                Monthly = d.Monthly,
                PhoneNumber = d.PhoneNumber,
                MethodOfDonation = d.MethodOfDonation,
                Notes = d.Notes,
                ActiveMonthly = d.ActiveMonthly
            });
            var specific = GetSpecificDonations().Select(d => new Donation
            {
                Id = d.Id,
                FirstName = d.FirstName,
                LastName = d.LastName,
                Amount = d.Amount,
                Date = d.Date,
                ChasunaId = d.ChasunaId,
                PhoneNumber = d.PhoneNumber,
                Chasuna = d.Chasuna,
                MethodOfDonation = d.MethodOfDonation,
                Notes = d.Notes
            });

            list.AddRange(general);
            list.AddRange(specific);

            return list.OrderBy(d => d.Date).ToList();
        }

        [HttpGet]
        [Route("get-available-funds")]
        public List<Donation> GetAvailableFunds()
        {
            var repo = new DonationRepo(_connectionString);
            var list = new List<Donation>();

            var general = GetDonations().Where(d => d.Monthly == false).Select(d => new Donation
            {
                Id = d.Id,
                Amount = d.Amount,
            });
            var monthly = repo.GetMonthlyDetails().Select(d => new Donation
            {
                Id = d.Id,
                Amount = d.Amount,
            });

            list.AddRange(general);
            list.AddRange(monthly);

            return list;
        }

        [HttpPost]
        [Route("add-monthly-to-total")]
        public void AddMonthly()
        {
            var repo = new DonationRepo(_connectionString);
            repo.AddMonthlyToTotal();
        }

        [HttpGet]
        [Route("get-specific-donation-details")]
        public List<SpecificDonation> GetDonationDetails(int chasunaId)
        {
            var repo = new DonationRepo(_connectionString);
            return repo.GetSpecificDonationDetails(chasunaId);
        }

        [HttpGet]
        [Route("get-monthly")]
        public List<GeneralDonation> GetMonthly()
        {
            var repo = new DonationRepo(_connectionString);
            return repo.GetMonthlyDonations();
        }

        [HttpGet]
        [Route("get-one-time")]
        public List<GeneralDonation> GetOneTime()
        {
            var repo = new DonationRepo(_connectionString);
            return repo.GetOneTimeDonations();
        }

        [HttpGet]
        [Route("get-by-id")]
        public Donation GetById(int id)
        {
            var repo = new DonationRepo(_connectionString);
            return repo.GetById(id);
        }

        [HttpPost]
        [Route("update")]
        public void Update(Donation donation)
        {
            var repo = new DonationRepo(_connectionString);

            if (donation.ChasunaId > 0)
            {
                repo.UpdateSpecific(donation);
            }
            else
            {
                repo.UpdateGeneral(donation);
            }
        }

        [HttpGet]
        [Route("get-general-details")]
        public GeneralDonation GetDetails(int id)
        {
            var repo = new DonationRepo(_connectionString);
            return repo.GetGeneralDetails(id);
        }

        [HttpPost]
        [Route("update-monthly")]
        public void UpdateMonthly(UpdateMonthlyVM vm)
        {
            var repo = new DonationRepo(_connectionString);
            repo.UpdateMonthly(new Monthly
            {
                Id = vm.Id,
                Method = vm.MethodOfDonation,
                WentThru = vm.WentThru
            });
        }

        [HttpPost]
        [Route("set-monthly")]
        public void SetIfMonthly(int id)
        {
            var repo = new DonationRepo(_connectionString);
            repo.SwitchIfMonthly(id);
        }
 
    }
}
