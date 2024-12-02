import { Link } from "react-router-dom"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

const DonationRow = ({ donation, given }) => {

    const { id, firstName, lastName, amount, monthly, date, chasunaId, timesDonated, phoneNumber, methodOfDonation, activeMonthly, notes } = donation
    const navigate = useNavigate()
    const [active, setActive] = useState(activeMonthly)

    const formatDate = (date) => {
        var options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }

        return new Date(date).toLocaleDateString([], options)
    }

    const onButtonClick = async () => {
        setActive(!active)
        await axios.post(`/api/donations/set-monthly?id=${id}`)
    }

    return (
        <tr className={given ? "table-success" : ""}>
            <td>{`${lastName}, ${firstName} ${notes ? '*' : ''}`}</td>
            <td>{phoneNumber}</td>
            <td>{amount.toFixed(2)}</td>
            <td>{formatDate(date)}</td>
            <td>{methodOfDonation}</td>
            {!chasunaId &&
                <td>{monthly ? 'Monthly Donation' : 'One Time Donation'}</td>}
            {chasunaId !== 0 &&
                <td>{`Specific Donation - ${donation.chasuna.neighbor}'s Chasuna`}</td>}
            <td>
                <Link to={`/edit-donation/${donation.id}`}>Edit Donation</Link>
            </td>
            {monthly &&
                <td>
                    <Link to={`/view-donation/${donation.id}`}>View Details</Link>
                </td>
            }
            {monthly &&
                <td>
                    <button className={active ? 'btn btn-danger' : 'btn btn-success'}
                        onClick={onButtonClick}>{active ? 'Deactivate' : 'Activate'}</button>
                </td>
            }
        </tr>
    )
}

export default DonationRow