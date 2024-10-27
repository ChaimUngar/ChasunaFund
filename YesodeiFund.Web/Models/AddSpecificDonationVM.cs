namespace YesodeiFund.Web.Models
{
    public class AddSpecificDonationVM
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public decimal Amount { get; set; }
        public int ChasunaId { get; set; }
        public DateTime Date { get; set; }
        public string PhoneNubmer { get; set; }
        public string MethodOfDonation { get; set; }
    }
}
