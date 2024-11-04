import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import DonationRow from "../components/DonationRow";
import { Link } from "react-router-dom";

const Donations = () => {

    const [donations, setDonations] = useState([])
    const [searchText, setSearchText] = useState('')
    const [searchedDonations, setSearchedDonations] = useState([])
    const [givenChasunaIds, setGivenChasunaIds] = useState([])
    const [chasunas, setChasunas] = useState([])
    const baseAmount = 2000
    let total = 0
    let totalGeneral = 0

    const generalDonations = donations.filter(d => !d.chasunaId)
    const notGiven = chasunas.length - givenChasunaIds.length
    const availableDonations = donations.filter(d => !givenChasunaIds.includes(d.chasunaId))

    const getDonations = async () => {
        const { data } = await axios.get('/api/donations/get-all')
        setDonations(data)
    }

    const getGivenChasunaIds = async () => {
        const { data } = await axios.get('/api/chasuna/get-given-chasuna-ids')
        setGivenChasunaIds(data)
    }

    const getChasunas = async () => {
        const { data } = await axios.get('/api/chasuna/get')
        setChasunas(data)
    }

    useEffect(() => {
        getDonations()
        getGivenChasunaIds()
        getChasunas()
    }, [])

    for (let i = 0; i < availableDonations.length; i++) {
        total += availableDonations[i].amount * availableDonations[i].timesDonated
    }

    // for (let i = 0; i < generalDonations.length; i++) {
    //     const notGiven = chasunas.length - givenChasunaIds.length
    //     totalGeneral += (generalDonations[i].amount * generalDonations[i].timesDonated) - ((notGiven * baseAmount))
    //     totalGeneral += ((notGiven * baseAmount) - total)
    // }

    const onAddMonthlyClick = async () => {
        await axios.post('/api/donations/add-monthly-to-total')
        getDonations()
    }

    const onSearchTextChange = (e) => {
        setSearchText(e.target.value)
        setSearchedDonations(donations.filter(d => d.lastName.toLowerCase().includes(e.target.value.toLowerCase())))
    }

    return (
        <div className="container" style={{ marginTop: '80px' }}>
            <div className="row">
                <h1 className="col-md-10">Donations</h1>
                <Link to="/view-monthly" className="col-md-3 btn btn-dark">View Monthly Donations</Link>
                <button className="col-md-3 btn btn-dark" onClick={onAddMonthlyClick}>Add Monthly Donations to Total</button>
                <h4>Total Available General Funds: ${chasunas.length ? total.toFixed(2) - (notGiven * baseAmount) : total.toFixed(2)}</h4>
                {/* <h4>Total Funds (General + Specific): ${total.toFixed(2)}</h4> */}
            </div>

            <div>

                <br />
                <input type="text" name="search" placeholder="Search by Donor Last Name" className="form-control"
                    value={searchText} onChange={onSearchTextChange} />
                <br />

                <table className="table table-hover table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Phone Number</th>
                            <th>Amount</th>
                            <th>Date of Donation</th>
                            <th>Method of Donation</th>
                            <th>Type of Donation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchText ? searchedDonations.map(d => <DonationRow key={d.id} donation={d} />) :
                            donations.map(d => <DonationRow key={d.id} donation={d} given={givenChasunaIds.includes(d.chasunaId)} />)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Donations