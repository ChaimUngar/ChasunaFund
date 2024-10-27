import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import ChasunaRow from "../components/ChasunaRow";

const Chasunas = () => {

    const [chasunas, setChasunas] = useState([])

    useEffect(() => {
        const getChasunas = async () => {
            const { data } = await axios.get('/api/chasuna/get')
            setChasunas(data)
        }

        getChasunas()

    }, [])

    return (
        <div className="container" style={{ marginTop: '80px' }}>
            <div>
                <h1>Chasunas</h1>
                <div>
                    <table className="table table-hover table-striped table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>Parent's Names</th>
                                <th>Neighbor's Name</th>
                                <th>Date of Chasuna</th>
                                <th>Base Amount</th>
                                <th>Additional Donations</th>
                                <th>Total Funds</th>
                            </tr>
                        </thead>
                        <tbody>
                            {chasunas.map(c => <ChasunaRow key={c.id} chasuna={c} />)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Chasunas