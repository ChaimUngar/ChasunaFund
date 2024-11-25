import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const DonationDetailRow = ({ monthlyDetails }) => {

    const { month, method, wentThru, amount, id } = monthlyDetails
    const [went, SetWent] = useState(wentThru)
    const [methodOfDonation, SetMethodOfDonation] = useState(method)
    const navigate = useNavigate()

    const formatDate = (date) => {
        var options = {

            month: 'long',
            year: 'numeric'
        }

        return new Date(date).toLocaleDateString([], options)
    }

    const onMethodChange = (e) => {
        if (e.target.value !== 'Card') {
            SetWent(true)
        }
        SetMethodOfDonation(e.target.value)
    }

    const onWentChange = () => {
        SetWent(!went)
    }

    const onOKClick = async () => {
        if (methodOfDonation !== 'Card') {
            SetWent(true)
        }else{
            SetWent(went)
        }
        await axios.post('/api/donations/update-monthly', { methodOfDonation, wentThru: went, id })
        navigate('/donations')
    }


    return (
        <tr>
            <td>{formatDate(month)}</td>
            <td>{`$${amount.toFixed(2)}`}</td>
            <td>
                <select className="form-select" id="method" onChange={onMethodChange}>
                    <option value={method} key={1}>{method}</option>
                    {method === 'Card' &&
                        <>
                            <option value={'Cash'} key={2}>Cash</option>
                            <option value={'Check'} key={3}>Check</option>
                        </>
                    }
                    {method === 'Cash' &&
                        <>
                            <option value={'Card'} key={2}>Card</option>
                            <option value={'Check'} key={3}>Check</option>
                        </>
                    }
                    {method === 'Check' &&
                        <>
                            <option value={'Cash'} key={2}>Cash</option>
                            <option value={'Card'} key={3}>Card</option>
                        </>
                    }
                </select></td>
            <td>
                {methodOfDonation === 'Card' &&
                    <input className="form-check form-switch form-check-input" type="checkbox"
                        role="switch" id="wentThru" checked={went} onChange={onWentChange}
                    />
                }
            </td>
            <td>
                <button className="btn btn-dark" onClick={onOKClick}>OK</button>
            </td>
        </tr>
    )
}

export default DonationDetailRow