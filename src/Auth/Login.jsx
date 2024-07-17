import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';

import axios from "axios";

export default function Login(){
    
    const charterIcon = '/charterIcon.png';
    const navigate = useNavigate();

    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    

    const authenticate = () => {
        let requestBody = { userEmail, password };

        axios.post('/api/admin/validateAuth', requestBody)
            .then(res => {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('validTill', res.data.validTill);
                axios.defaults.headers.common['Authorization'] = 'Bearer '+res.data.token;
                axios.defaults.headers.common['Content-Type'] = 'application/json'; 
                toast.success('Authentication Successful');
                setTimeout(() => { navigate('/dashboard'); }, 2000);
                
            }).catch(err => {
                console.log(err)
                toast.error('Authentication Failed');
        })
    }

    return(
        <div className="container-fluid d-flex justify-content-center charterBlue w-full charterBlue h-screen">
            <ToastContainer  autoClose={2000} hideProgressBar={true} newestOnTop={true} />
            <div className="row w-100 py-4 px-sm-0 px-2">

                <div className="col-sm-8 col-md-6 offset-sm-2 offset-md-3 p-2 text-center bg-white rounded-lg relative">
                <img alt="Icon" src={charterIcon} className="m-auto loginImgLogo"/>
                <br/>
                
                <div className="block">  
                <input placeholder="Enter User Name" className="w-5/6 h-10 p-1 p-md-2 border-2 rounded-md mt-1" value={userEmail} onChange={(event)=>{ return setUserEmail(event.currentTarget.value) }}/>
                </div>
                
                <div className="block mt-8">  
                <input placeholder="Enter Password" type="password"  className="w-5/6 h-10 p-1 p-md-2 border-2 rounded-md mt-1"  value={password}  onChange={(event)=>{ return setPassword(event.currentTarget.value); }}/>
                </div>

<div className=" absolute bottom-0 w-100 -left-0 flex justify-center">
<button className="btn charterBlue text-white mb-5" onClick={authenticate}>Proceed</button>
</div>
                </div>

            </div>
        </div>
    )
}