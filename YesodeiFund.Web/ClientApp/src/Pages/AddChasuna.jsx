import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddChasuna = () => {

    const [neighbor, setNeighbor] = useState('')
    const [chassan, setChassan] = useState('')
    const [kallah, setKallah] = useState('')
    const [rabbi, setRabbi] = useState('')
    const [mrs, setMrs] = useState('')
    const [neighborhoodSide, setNeighborhoodSide] = useState()
    const [date, setDate] = useState()
    const [baseAmount, setBaseAmount] = useState()

    const isValid = neighbor && chassan && kallah && neighborhoodSide && date && rabbi && mrs
    const navigate = useNavigate()

    const onSideChange = side => {
        setNeighborhoodSide(side)
    }

    const onAddClick = async (e) => {
        e.preventDefault()
        await axios.post('/api/chasuna/add', { neighbor, chassan, kallah, neighborhoodSide, date, rabbi, mrs, baseAmount })
        navigate('/chasunas')
    }

    return (
        <div className="container" style={{ marginTop: '80px' }}>
            <div className="row" style={{ marginTop: '20px' }}>
                <div className="col-md-6 offset-md-3">
                    <div className="card card-body bg-light">
                        <h4>Add Chasuna</h4>
                        <form onSubmit={onAddClick}>
                            <div className="row">
                                <input type="text" name="rabbi" placeholder="Rabbi" className="form-control"
                                    value={rabbi} onChange={e => setRabbi(e.target.value)} />
                                <input type="text" name="mrs" placeholder="Mrs." className="form-control"
                                    value={mrs} onChange={e => setMrs(e.target.value)} />
                            </div>
                            <br />

                            <input type="text" name="neighbor" placeholder="Neighbor's Name" className="form-control"
                                value={neighbor} onChange={e => setNeighbor(e.target.value)} />
                            <br />

                            <div>
                                <input type="radio" name="ours" value="chassan" id="Chassan"
                                    onChange={(e) => onSideChange(e.target.id)} />
                                <label><input className="form-control" type="text" name="chassan" placeholder="Chassan"
                                    value={chassan} onChange={e => setChassan(e.target.value)} /></label>

                                <br />

                                <input type="radio" name="ours" value="kallah" id="Kallah"
                                    onChange={(e) => onSideChange(e.target.id)} />
                                <label><input className="form-control" type="text" name="kallah" placeholder="Kallah"
                                    value={kallah} onChange={e => setKallah(e.target.value)} /></label>
                            </div>

                            <br />

                            <input type="number" name="amount" placeholder="Base Amount" className="form-control"
                                value={baseAmount} onChange={e => setBaseAmount(e.target.value)} />
                            <br />

                            <input type="date" name="date" placeholder="Date of Chasuna" className="form-control"
                                value={date} onChange={e => setDate(e.target.value)} />

                            <br />

                            <button className="btn btn-dark" disabled={!isValid} type="submit">Add</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AddChasuna