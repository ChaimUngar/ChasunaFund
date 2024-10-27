import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditDonation = () => {

    const [donation, setDonation] = useState({})
    const [chasunas, setChasunas] = useState([])

    const { amount, firstName, lastName, phoneNumber, date, monthly, chasunaId, methodOfDonation } = donation
    const isValid = firstName && amount && date && phoneNumber && lastName && methodOfDonation

    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const getDonation = async () => {
            const { data } = await axios.get(`/api/donations/get-by-id?id=${id}`)
            setDonation(data)
        }
        const getChasunas = async () => {
            const { data } = await axios.get('/api/chasuna/get')
            setChasunas(data)
        }

        getChasunas()
        getDonation()
    }, [])

    const onInputChange = (e) => {
        const copy = { ...donation }
        copy[e.target.name] = e.target.value
        setDonation(copy)
    }

    const onUpdateClick = async (e) => {
        e.preventDefault()
        await axios.post('/api/donations/update', donation)
        navigate('/donations')
    }

    return (
        <div className="container" style={{ marginTop: '80px' }}>
            <div className="row" style={{ marginTop: '20px' }}>
                <div className="col-md-6 offset-md-3">
                    <div className="card card-body bg-light">
                        <h4>Edit Donation</h4>
                        <form onSubmit={onUpdateClick}>
                            <input type="number" name="amount" placeholder="Amount" className="form-control"
                                value={amount} onChange={onInputChange} />
                            <br />
                            <input type="text" name="firstName" placeholder="First Name" className="form-control"
                                value={firstName} onChange={onInputChange} />
                            <input type="text" name="lastName" placeholder="Last Name" className="form-control"
                                value={lastName} onChange={onInputChange} />
                            <br />
                            <input type="text" name="phoneNumber" placeholder="Phone Number" className="form-control"
                                value={phoneNumber} onChange={onInputChange} />
                            <br />

                            <div>
                                <input type="radio" name="methodOfDonation" id="Method" value="Cash"
                                    onChange={onInputChange} checked={methodOfDonation === "Cash"}/>
                                <label>Cash</label>
                                <br />
                                <input type="radio" name="methodOfDonation" id="Method" value="Check"
                                    onChange={onInputChange} checked={methodOfDonation === "Check"}/>
                                <label>Check</label>
                                <br />
                                <input type="radio" name="methodOfDonation" id="Method" value="Card"
                                    onChange={onInputChange} checked={methodOfDonation === "Card"}/>
                                <label>Card</label>
                                <br />
                            </div>

                            <br />

                            {!donation.chasuna &&
                                <>
                                    <div className="form-check form-switch">
                                        <input className="form-check form-switch form-check-input" type="checkbox"
                                            role="switch" id="monthly" checked={monthly}
                                            value={monthly} onChange={onInputChange}
                                        />
                                        <label className="form-check-label" htmlFor="monthly">Monthly</label>
                                    </div>
                                    <br />
                                </>
                            }

                            {donation.chasuna &&
                                <>
                                    <label htmlFor="location" className="form-label">
                                        Chasuna
                                    </label>
                                    <select className="form-select" id="chasuna" onChange={onInputChange} name="chasunaId">
                                        <option value={donation.chasuna.id}>{donation.chasuna.neighbor}</option>
                                        {chasunas.map(c =>
                                            <option value={c.id} key={c.id} title={c.neighbor} >{c.neighbor}</option>
                                        )}
                                    </select>
                                    <br />
                                </>
                            }

                            <input type="date" name="date" placeholder="Date of Donation" className="form-control"
                                value={date} onChange={onInputChange} />

                            <br />

                            <button className="btn btn-dark" type="submit" disabled={!isValid}>Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default EditDonation