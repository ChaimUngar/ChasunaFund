import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditChasuna = () => {

    const [chasuna, setChasuna] = useState({})

    const { neighbor, chassan, kallah, neighborhoodSide, date, rabbi, mrs, baseAmount } = chasuna

    const isValid = neighbor && chassan && kallah && neighborhoodSide && date && rabbi && mrs
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        const getById = async () => {
            const { data } = await axios.get(`/api/chasuna/get-by-id?id=${id}`)
            setChasuna(data)
        }

        getById()
    }, [])

    const onInputChange = (e) => {
        const copy = { ...chasuna }
        copy[e.target.name] = e.target.value
        setChasuna(copy)
    }

    const onUpdateClick = async (e) => {
        e.preventDefault()
        await axios.post('/api/chasuna/update', chasuna)
        navigate('/chasunas')
    }

    return (
        <div className="container" style={{ marginTop: '80px' }}>
            <div className="row" style={{ marginTop: '20px' }}>
                <div className="col-md-6 offset-md-3">
                    <div className="card card-body bg-light">
                        <h4>Edit Chasuna</h4>
                        <form onSubmit={onUpdateClick}>
                            <div className="row">
                                <input type="text" name="rabbi" placeholder="Rabbi" className="form-control"
                                    value={rabbi} onChange={onInputChange} />
                                <input type="text" name="mrs" placeholder="Mrs." className="form-control"
                                    value={mrs} onChange={onInputChange} />
                            </div>
                            <br />

                            <input type="text" name="neighbor" placeholder="Neighbor's Name" className="form-control"
                                value={neighbor} onChange={onInputChange} />
                            <br />

                            <div>
                                <input type="radio" name="neighborhoodSide" value="Chassan" id="Chassan"
                                    onChange={onInputChange} checked={neighborhoodSide === "Chassan"} />
                                <label><input className="form-control" type="text" name="chassan" placeholder="Chassan"
                                    value={chassan} onChange={onInputChange} /></label>

                                <br />

                                <input type="radio" name="neighborhoodSide" value="Kallah" id="Kallah"
                                    onChange={onInputChange} checked={neighborhoodSide === "Kallah"} />
                                <label><input className="form-control" type="text" name="kallah" placeholder="Kallah"
                                    value={kallah} onChange={onInputChange} /></label>
                            </div>

                            <br />

                            <input type="number" name="amount" placeholder="Amount" className="form-control"
                                value={baseAmount} onChange={onInputChange} />
                            <br />

                            <input type="date" name="date" placeholder="Date of Chasuna" className="form-control"
                                value={date} onChange={onInputChange} />

                            <br />

                            <button className="btn btn-dark" disabled={!isValid} type="submit">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default EditChasuna