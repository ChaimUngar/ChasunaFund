using YesodeiFund.Data;

namespace YesodeiFund.Web.Models
{
    public class AddChasunaVM
    {
        public string Neighbor { get; set; }
        public string Chassan { get; set; }
        public string Kallah { get; set; }
        public string NeighborhoodSide { get; set; }
        public DateTime Date { get; set; }
        public string Rabbi { get; set; }
        public string Mrs { get; set; }
        public int BaseAmount { get; set; }
    }
}
