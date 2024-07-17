import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

import "./App.css";
import Login from "./Auth/Login";
import Dashboard from "./AdminPanel/Dashboard";

axios.defaults.baseURL = "http://192.168.142.20:8080";
// axios.defaults.baseURL = "https://ticketingbackendmongodb-1.onrender.com";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} /> */}
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
