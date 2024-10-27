using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace YesodeiFund.Data
{
    public class GeneralDonation
    {
        public int Id { get; set; }
        public decimal Amount { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool Monthly { get; set; }
        public DateTime Date { get; set; }
        public int TimesDonated { get; set; }
        public string PhoneNumber { get; set; }
        public string MethodOfDonation { get; set; }
        public DateTime EntryDate { get; set; }
    }
}
