using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace YesodeiFund.Data
{
    public class Monthly
    {
        public int Id { get; set; }
        public DateTime Month { get; set; }
        public string Method { get; set; }
        public bool WentThru { get; set; }
        public decimal Amount { get; set; }
        public int DonationId { get; set; }

        [JsonIgnore]
        public GeneralDonation Donation { get; set; }
    }
}
