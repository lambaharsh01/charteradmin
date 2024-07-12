import { useEffect, useState } from "react"


export default function Login(){

const [pageHeight, setPageHeight]=useState(window.innerHeight);

const charterIcon='/charterIcon.png';


useEffect(()=>{

}, []);

const style={
    mainDiv:{height:pageHeight, width:'100%', display:'flex',  justifyContent:'center', position:'absolute'},
    centralDiv:{}
}



    return(
        <div style={style.mainDiv}>
            <div style={{width:'50%', backgroundColor:'green', display:'flex',  justifyContent:'center'}}>
                <img src={charterIcon}/>
                Hoe
            </div>
        </div>
    )
}