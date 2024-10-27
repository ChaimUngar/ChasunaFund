using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Runtime.CompilerServices;
using YesodeiFund.Data;
using YesodeiFund.Web.Models;

namespace YesodeiFund.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChasunaController : ControllerBase
    {
        private readonly string _connectionString;
        public ChasunaController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpGet]
        [Route("get")]
        public List<ViewChasunaVM> GetAll()
        {
            var cRepo = new ChasunaRepo(_connectionString);
            var chasunas = cRepo.GetAll();

            var dRepo = new DonationRepo(_connectionString);
            var donations = dRepo.GetSpecific();

            return chasunas.Select(c => new ViewChasunaVM
            {
                Id = c.Id,
                Neighbor = c.Neighbor,
                NeighborhoodSide = c.NeighborhoodSide,
                Chassan = c.Chassan,
                Kallah = c.Kallah,
                Date = c.Date,
                TotalFunds = donations.Where(d => d.ChasunaId == c.Id).Sum(d => d.Amount),
                Rabbi = c.Rabbi,
                Mrs = c.Mrs,
                GivenFunds = c.GivenFunds
            }).ToList();
        }

        [HttpPost]
        [Route("add")]
        public void Add(AddChasunaVM vm)
        {
            var repo = new ChasunaRepo(_connectionString);

            repo.Add(new Chasuna
            {
                Neighbor = vm.Neighbor,
                Chassan = vm.Chassan,
                Kallah = vm.Kallah,
                NeighborhoodSide = vm.NeighborhoodSide,
                Date = vm.Date,
                Rabbi = vm.Rabbi,
                Mrs = vm.Mrs,
                EntryDate = DateTime.Now
            });
        }

        [HttpGet]
        [Route("get-total-for-chasuna")]
        public decimal GetSpecificFunds(int chasunaId)
        {
            var repo = new ChasunaRepo(_connectionString);
            return repo.GetSpecificTotal(chasunaId);
        }

        [HttpGet]
        [Route("get-by-id")]
        public Chasuna GetById(int id)
        {
            var repo = new ChasunaRepo(_connectionString);
            return repo.GetById(id);
        }

        [HttpPost]
        [Route("update")]
        public void UpdateChasuna(Chasuna chasuna)
        {
            var repo = new ChasunaRepo(_connectionString);
            repo.Update(chasuna);
        }

        [HttpPost]
        [Route("give-funds")]
        public void GiveFunds(int id)
        {
            var repo = new ChasunaRepo(_connectionString);
            repo.GiveFunds(id);
        }

        [HttpGet]
        [Route("get-given-chasuna-ids")]
        public List<int> GetIds()
        {
            var repo = new ChasunaRepo(_connectionString);
            return repo.GetGivenIds();
        }
    }
}
