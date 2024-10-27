import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddSpecificDonation = () => {

    const [amount, setAmount] = useState()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [number, setNumber] = useState('')
    const [chasunaId, setChasunaId] = useState()
    const [allChasunas, setAllChasunas] = useState([])
    const [date, setDate] = useState()
    const [method, setMethod] = useState()

    const isValid = firstName && lastName && amount && date && number && method
    const navigate = useNavigate()

    useEffect(() => {
        const getChasunas = async () => {
            const { data } = await axios.get('/api/chasuna/get')
            setAllChasunas(data)
        }

        getChasunas()
    }, [])

    const onAmountChange = (e) => {
        setAmount(e.target.value)
    }

    const onFirstChange = (e) => {
        setFirstName(e.target.value)
    }

    const onLastChange = (e) => {
        setLastName(e.target.value)
    }

    const onNumberChange = (e) => {
        setNumber(e.target.value)
    }

    const onMethodChange = (e) => {
        setMethod(e.target.value)
    }

    const onDateChange = (e) => {
        setDate(e.target.value)
    }

    const onAddClick = async (e) => {
        e.preventDefault()
        await axios.post('/api/donations/add-specific', { amount, firstName, lastName, chasunaId, date, phoneNumber: number, methodOfDonation: method })
        navigate('/donations')
    }

    return (
        <div className="container" style={{ marginTop: '80px' }}>
            <div className="row" style={{ marginTop: '20px' }}>
                <div className="col-md-6 offset-md-3">
                    <div className="card card-body bg-light">
                        <h4>Add Donation For A Specific Simcha</h4>
                        <form onSubmit={onAddClick}>
                            <input type="number" name="amount" placeholder="Amount" className="form-control"
                                value={amount} onChange={onAmountChange} />
                            <br />
                            <input type="text" name="firstName" placeholder="First Name" className="form-control"
                                value={firstName} onChange={onFirstChange} />
                            <input type="text" name="lastName" placeholder="Last Name" className="form-control"
                                value={lastName} onChange={onLastChange} />
                            <br />
                            <input type="text" name="number" placeholder="Phone Number" className="form-control"
                                value={number} onChange={onNumberChange} />
                            <br />

                            <div>
                                <input type="radio" name="method" id="Method" value="Cash"
                                    onChange={onMethodChange} />
                                <label>Cash</label>
                                <br />
                                <input type="radio" name="method" id="Method" value="Check"
                                    onChange={onMethodChange} />
                                <label>Check</label>
                                <br />
                                <input type="radio" name="method" id="Method" value="Card"
                                    onChange={onMethodChange} />
                                <label>Card</label>
                                <br />
                            </div>

                            <br />

                            <label htmlFor="location" className="form-label">
                                Chasuna
                            </label>
                            <select className="form-select" id="chasuna" onChange={(e) => setChasunaId(e.target.value)}>
                                <option value={-1}>Select a Chasuna</option>
                                {allChasunas.map(c =>
                                    <option value={c.id} key={c.id} title={c.neighbor}>{c.neighbor}</option>
                                )}
                            </select>
                            <br />

                            <input type="date" name="date" placeholder="Date of Donation" className="form-control"
                                value={date} onChange={onDateChange} />

                            <br />

                            <button className="btn btn-dark" disabled={!isValid} type="submit">Add</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AddSpecificDonation