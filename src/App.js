import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "./loginForm";
import Registration from "./Registration";
import Dashboard from './CustomerDashboard';
import Rides from './ShowRides';
import OnGoingRide from './OnGoingRide';
import RideComplete from './RIdeComplete';
import './App.css';
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from 'react';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/rides" element={<Rides />} />
          <Route path="/ongoingride" element={<OnGoingRide />} />
          <Route path="/ridecomplete" element={<RideComplete />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;