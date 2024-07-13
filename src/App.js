import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css'
import Login from './Auth/Login';
import Dashboard from "./AdminPanel/Dashboard";



function App(){



    return (

<div>

<BrowserRouter>

<Routes>

        {/* <Route path="/" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />

</Routes>


</BrowserRouter>





</div>

    )
};

export default App;