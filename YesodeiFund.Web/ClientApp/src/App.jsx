import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './Pages/Home';
import Donations from './Pages/Donations';
import AddDonation from './Pages/AddDonation';
import AddSpecificDonation from './Pages/AddSpecificDonation';
import AddChasuna from './Pages/AddChasuna';
import Chasunas from './Pages/Chasunas';
import ViewDetails from './Pages/ViewDetails';
import ViewMonthly from './Pages/ViewMonthly';
import EditDonation from './Pages/EditDonation';
import EditChasuna from './Pages/EditChasuna';

const App = () => {
    return (
        <Layout>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/donations' element={<Donations />} />
                <Route path='/add-donation' element={<AddDonation />} />
                <Route path='/add-specific-donation' element={<AddSpecificDonation />} />
                <Route path='/add-chasuna' element={<AddChasuna />} />
                <Route path='/chasunas' element={<Chasunas />} />
                <Route path='/view-details/:id' element={<ViewDetails />} />  
                <Route path='/view-monthly' element={<ViewMonthly />} /> 
                <Route path='/edit-donation/:id' element={<EditDonation />} />  
                <Route path='/edit-chasuna/:id' element={<EditChasuna />} />                                                                                        
            </Routes>
        </Layout>
    );
}

export default App;