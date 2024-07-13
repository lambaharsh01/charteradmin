import { useEffect, useState } from "react"


export default function Login(){
    
const charterIcon='/charterIcon.png';
    
const [pageHeight, setPageHeight]=useState(window.innerHeight);

const [userName, setUserName]=useState('');
const [userPassWord, setUserPassword]=useState('');




useEffect(()=>{
    setPageHeight(window.innerHeight);

}, []);




    return(
        <div style={{height:pageHeight}} className="container-fluid d-flex justify-content-center charterBlue w-full charterBlue">
            <div className="row w-100 py-4 px-sm-0 px-2">

                <div className="col-sm-8 col-md-6 offset-sm-2 offset-md-3 p-2 text-center bg-white rounded-lg relative">
                <img alt="Icon" src={charterIcon} className="m-auto loginImgLogo"/>
                <br/>
                
                <div className="block">  
                <input placeholder="Enter User Name" className="w-5/6 h-10 p-1 p-md-2 border-2 rounded-md mt-1" value={userName} onChange={(event)=>{ return setUserName(event.currentTarget.value) }}/>
                </div>
                
                <div className="block mt-8">  
                <input placeholder="Enter Password" type="password"  className="w-5/6 h-10 p-1 p-md-2 border-2 rounded-md mt-1"  value={userPassWord}  onChange={(event)=>{ return setUserPassword(event.currentTarget.value); }}/>
                </div>

<div className=" absolute bottom-0 w-100 -left-0 flex justify-center">
<button className="btn charterBlue text-white mb-5">Proceed</button>
</div>
                </div>

            </div>
        </div>
    )
}