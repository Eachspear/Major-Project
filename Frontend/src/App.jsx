import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Components/Signup";
import Login from "./Components/Login"; // ✅ Importing correctly

import Map from "./Components/Map";

import React from "react";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import Map from "./Components/Map";
import './index.css';

function App() {
  return (
    <Router>
      <ReactNotifications />
      <div>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
<<<<<<< HEAD
          
          
          <Route path="/map" element={<Map />} /> 
          <Route path="/chat" element={<Chat />} />
          <Route path="*" element={<Signup />} /> 
=======
          <Route path="/map" element={<Map />} />
          
          
          <Route path="*" element={<Signup />} />
>>>>>>> location
        </Routes>
      </div>
    </Router>
  );
}

export default App;






