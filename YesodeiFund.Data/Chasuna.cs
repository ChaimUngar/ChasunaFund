using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace YesodeiFund.Data
{
    public class Chasuna
    {
        public int Id { get; set; }
        public string Rabbi { get; set; }
        public string Mrs { get; set; }
        public string Neighbor { get; set; }
        public string Chassan { get; set; }
        public string Kallah { get; set; }
        public string NeighborhoodSide { get; set; }
        public DateTime Date { get; set; }
        public bool GivenFunds { get; set; }

        [JsonIgnore]
        public List<GeneralDonation> Donations { get; set; }
    }
}
