import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Components/Signup";
import Login from "./Components/Login"; // ✅ Importing correctly
import Navbar from "./Components/Navbar";
import Chat from "./Components/Chat";
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
          
          
          <Route path="/map" element={<Map />} /> 
          <Route path="/chat" element={<Chat />} />
          <Route path="*" element={<Signup />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;






