import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import DonationDetailRow from '../components/DonationDetailRow'

const ViewDonation = () => {

    const [donation, setDonation] = useState({})
    const { id } = useParams()
    const { firstName, lastName, phoneNumber, amount, monthlyDetails, notes } = donation
    const navigate = useNavigate()
    // const { method, wentThru } = donation.monthlyDetails


    useEffect(() => {
        const getDonation = async () => {
            const { data } = await axios.get(`/api/donations/get-general-details?id=${id}`)
            setDonation(data)
        }
        getDonation()


    }, [])


    return (

        <div className="container" style={{ marginTop: '80px' }}>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card card-body bg-light">
                        <h1 className='text-center'>{`${firstName} ${lastName}'S DONATION DETAILS`}</h1>
                        <h4 className='text-center'>{`Phone Number: ${phoneNumber}`}</h4>

                      
                        <table className="table table-hover table-striped table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>Month</th>
                                    <th>Amount</th>
                                    <th>Method Of Donation</th>
                                    <th>Went Through</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {monthlyDetails && monthlyDetails.map(d => <DonationDetailRow key={d.id} monthlyDetails={d} />)}
                            </tbody>
                        </table>
                        <br />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewDonation