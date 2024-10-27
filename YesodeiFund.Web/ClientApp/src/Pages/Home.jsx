import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <div className="jumbotron bg-light p-5 rounded-lg mb-4 shadow">
                <h1 className="display-4">YESODEI CHASUNA FUND</h1>
                <p className="lead"></p>
                <hr className="my-4" />
                <p>Click one of the buttons below to get started:</p>
            </div>

            <div className="row col-md 2">
                <Link to="/donations" className="col md-2 btn btn-danger" >Donations</Link>
                <Link to="/add-donation" className="col md-2 btn btn-warning" >Add a General Donation</Link>
                <Link to="/add-specific-donation" className="col md-2 btn btn-info">Add a Donation For a Specific Simcha</Link>
                <Link to="/chasunas" className="col md-2 btn btn-primary">Chasunas</Link>
                <Link to="/add-chasuna" className="col md-2 btn btn-success">Add a Chasuna</Link>
            </div>
        </>
    );
};

export default Home;