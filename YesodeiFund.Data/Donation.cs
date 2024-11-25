using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace YesodeiFund.Data
{
    public class Donation
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public bool Monthly { get; set; }
        public int ChasunaId { get; set; }
        public int TimesDonated { get; set; }
        public string PhoneNumber { get; set; }
        public string MethodOfDonation { get; set; }
        public DateTime EntryDate { get; set; }
        public string Notes { get; set; }
        public bool ActiveMonthly { get; set; }

        public Chasuna Chasuna { get; set; }
    }
}
