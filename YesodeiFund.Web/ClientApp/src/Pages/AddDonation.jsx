import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddDonation = () => {

    const [amount, setAmount] = useState()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [number, setNumber] = useState('')
    const [monthly, setMonthly] = useState(false)
    const [date, setDate] = useState()
    const [method, setMethod] = useState()
    const [notes, setNotes] = useState('')

    const isValid = firstName && amount && date && number && lastName && method
    const navigate = useNavigate()

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

    const onMonthlyChange = () => {
        setMonthly(!monthly)
    }

    const onDateChange = (e) => {
        setDate(e.target.value)
    }

    const onMethodChange = (e) => {
        setMethod(e.target.value)
    }

    const onNotesChange = (e) => {
        setNotes(e.target.value)
    }

    const onAddClick = async (e) => {
        e.preventDefault()
        await axios.post('/api/donations/add', { amount, firstName, lastName, monthly, date, phoneNumber: number, methodOfDonation: method, notes })
        navigate('/donations')
    }

    return (
        <div className="container" style={{ marginTop: '80px' }}>
            <div className="row" style={{ marginTop: '20px' }}>
                <div className="col-md-6 offset-md-3">
                    <div className="card card-body bg-light">
                        <h4>Add Donation</h4>
                        <form onSubmit={onAddClick}>
                            <input type="number" name="amount" placeholder="Amount" className="form-control"
                                value={amount} onChange={onAmountChange} />
                            <br />
                            <input type="text" name="firstName" placeholder="First Name" className="form-control"
                                value={firstName} onChange={onFirstChange} />
                            <input type="text" name="lastName" placeholder="Last Name" className="form-control"
                                value={lastName} onChange={onLastChange} />
                            <br />
                            <input type="text" name="phoneNumber" placeholder="Phone Number" className="form-control"
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

                            <div className="form-check form-switch">
                                <input className="form-check form-switch form-check-input" type="checkbox"
                                    role="switch" id="monthly" value={monthly} onChange={onMonthlyChange}
                                />
                                <label className="form-check-label" htmlFor="monthly">Monthly</label>
                            </div>
                            <br />

                            <input type="date" name="date" placeholder="Date of Donation" className="form-control"
                                value={date} onChange={onDateChange} />

                            <br />

                            <textarea rows="5" className="form-control" name="notes" placeholder="Notes"
                                onChange={onNotesChange} value={notes}>
                            </textarea>
                            <br />

                            <button className="btn btn-dark" disabled={!isValid} type="submit">Add</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AddDonation