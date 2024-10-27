import { useState, useEffect } from "react"
import axios from "axios"
import DetailRow from "../components/DetailRow"
import { Link } from "react-router-dom"

const ViewMonthly = () => {

    const [donations, setDonations] = useState([])
    const [searchedDonations, setSearchedDonations] = useState([])
    const [searchText, setSearchText] = useState('')

    useEffect(() => {
        const getDonations = async () => {
            const { data } = await axios.get('/api/donations/get-monthly')
            setDonations(data)
        }

        getDonations()

    }, [])

    const onSearchTextChange = (e) => {
        setSearchText(e.target.value)
        setSearchedDonations(donations.filter(d => d.lastName.toLowerCase().includes(e.target.value.toLowerCase())))
    }

    return (
        <div>
            <div className="container" style={{ marginTop: '80px' }}>
                <div className="row">
                    <h1 className="col-md-10">Monthly Donations</h1>
                    <Link to="/donations" className="col md-3 btn btn-dark">View All Donations</Link>
                </div>
                <br />
                <input type="text" name="search" placeholder="Search by Donor Last Name" className="form-control"
                    value={searchText} onChange={onSearchTextChange} />
                <br />
                <table className="table table-hover table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>Donor Name</th>
                            <th>Amount</th>
                            <th>Method of Donation</th>
                            <th>Date of Donation</th>
                        </tr>
                    </thead>
                    <tbody>
                    {searchText ? searchedDonations.map(d => <DetailRow key={d.id} donation={d} />) :
                            donations.map(d => <DetailRow key={d.id} donation={d} />)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ViewMonthly