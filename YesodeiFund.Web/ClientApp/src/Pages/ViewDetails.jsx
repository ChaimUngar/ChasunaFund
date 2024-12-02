import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import DetailRow from '../components/MonthlyOneTimeRow'

const ViewDetails = () => {

    const [chasuna, setChasuna] = useState({})
    const [total, setTotal] = useState(0)
    const [details, setDetails] = useState([])
    const { id } = useParams()

    const { neighbor, chassan, kallah, neighborhoodSide, date, rabbi, mrs, baseAmount } = chasuna

    useEffect(() => {
        const getById = async () => {
            const { data } = await axios.get(`/api/chasuna/get-by-id?id=${id}`)

            setChasuna(data)


        }
        const getTotal = async () => {
            const { data } = await axios.get(`/api/chasuna/get-total-for-chasuna?chasunaId=${id}`)
            setTotal(data)
        }
        const getDetails = async () => {
            const { data } = await axios.get(`/api/donations/get-specific-donation-details?chasunaId=${id}`)
            setDetails(data)
        }

        getById()
        getTotal()
        getDetails()



    }, [])





    const formatDate = (date) => {
        var options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }

        return new Date(date).toLocaleDateString([], options)
    }

    // let grandTotal 
    // { chasuna ? grandTotal = baseAmount + total : grandTotal = 0  }
     console.log({chasuna})

    const grandTotal = baseAmount + total

    const donationTable = () => {

        return (
            <div>
                <table className="table table-hover table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>Donor Name</th>
                            <th>Amount</th>
                            <th>Method of Doantion</th>
                            <th>Date of Donation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {details.map(d => <DetailRow key={d.id} donation={d} />)}
                    </tbody>
                </table>
            </div>
        )
    }



    return (


        <div className="container" style={{ marginTop: '80px' }}>

            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card card-body bg-light">
                        <h1 className='text-center'>{`THE ${neighbor} CHASUNA`}</h1>
                        <h4 className='text-center'>{`Parents: Rabbi ${rabbi} & Mrs. ${mrs}`}</h4>
                        <h4 className='text-center'>{`Chassan: ${chassan}`}</h4>
                        <h4 className='text-center'>{`Kallah: ${kallah}`}</h4>
                        <h4 className='text-center'>{`Neighborhood Side: ${neighborhoodSide}`}</h4>
                        <h4 className='text-center'>{`Date of Chasuna: ${formatDate(date)}`}</h4>
                        <br />
                        <br />
                        <h3 className='text-center'>{`Total Funds: $${grandTotal.toFixed(2)}`}</h3>
                        <h4 className='text-center'>{`Total General Funds: $${baseAmount}.00`}</h4>
                        <h4 className='text-center'>{`Total Specific Funds: $${total.toFixed(2)}`}</h4>
                        {!!details.length && donationTable()}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewDetails