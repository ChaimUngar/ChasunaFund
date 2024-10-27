import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-sm navbar-dark fixed-top bg-dark border-bottom box-shadow">
                    <div className="container">
                        <a className="navbar-brand">YesodeiFund</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                            <ul className="navbar-nav flex-grow-1">
                                <li className="nav-item"><Link to="/" className='nav-link text-light'>Home</Link></li>
                                <li className="nav-item"><Link to="/donations" className='nav-link text-light'>Donations</Link></li>
                                <li className="nav-item"><Link to="/add-donation" className='nav-link text-light'>Add Donation</Link></li>
                                <li className="nav-item"><Link to="/add-specific-donation" className='nav-link text-light'>Add Specific Donation</Link></li>
                                <li className="nav-item"><Link to="/chasunas" className='nav-link text-light'>Chasunas</Link></li>
                                <li className="nav-item"><Link to="/add-chasuna" className='nav-link text-light'>Add Chasuna</Link></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
            <div className="container mt-5">
                {children}
            </div>
        </div>
    )
}

export default Layout;