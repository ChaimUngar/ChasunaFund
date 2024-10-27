import { Link } from "react-router-dom"

const DonationRow = ({ donation, given }) => {

    const { firstName, lastName, amount, monthly, date, chasunaId, timesDonated, phoneNumber, methodOfDonation } = donation

    const formatDate = (date) => {
        var options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }

        return new Date(date).toLocaleDateString([], options)
    }

    return (
        <tr className={given ? "table-success" : ""}>
            <td>{`${lastName}, ${firstName}`}</td>
            <td>{phoneNumber}</td>
            <td>{monthly ? `$${amount.toFixed(2)} * ${timesDonated} months` : `$${amount.toFixed(2)}`}</td>
            <td>{formatDate(date)}</td>
            <td>{methodOfDonation}</td>
            {!chasunaId &&
                <td>{monthly ? 'Monthly Donation' : 'One Time Donation'}</td>}
            {chasunaId !== 0 &&
                <td>{`Specific Donation - ${donation.chasuna.neighbor}'s Chasuna`}</td>}
            <td>
                <Link to={`/edit-donation/${donation.id}`}>Edit Donation</Link>
            </td>
        </tr>
    )
}

export default DonationRow