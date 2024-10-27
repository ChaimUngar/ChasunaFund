import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
const baseAmount = 2000

const ChasunaRow = ({ chasuna }) => {

    const { neighbor, date, totalFunds, rabbi, mrs, givenFunds, id } = chasuna
    const [given, setGiven] = useState(givenFunds)

    const formatDate = (date) => {
        var options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }

        return new Date(date).toLocaleDateString([], options)
    }

    const grandTotal = baseAmount + totalFunds

    const onGiveClick = async () => {
        setGiven(true)
        await axios.post(`/api/chasuna/give-funds?id=${id}`, )
    }

    return (
        <tr className={givenFunds ? "table-success" : ""}>
            <td>Rabbi {rabbi} & Mrs. {mrs}</td>
            <td>{neighbor}</td>
            <td>{formatDate(date)}</td>
            <td>${baseAmount.toFixed(2)}</td>
            <td>${totalFunds.toFixed(2)}</td>
            <td>${grandTotal.toFixed(2)}</td>
            <td>
                <Link to={`/view-details/${chasuna.id}`}>View Details</Link>
            </td>
            <td>
                <Link to={`/edit-chasuna/${chasuna.id}`}>Edit Chasuna</Link>
            </td>
            <td>
                <button className="btn btn-dark" disabled={given} onClick={onGiveClick}>Give Funds</button>
            </td>
        </tr>
    )
}

export default ChasunaRow