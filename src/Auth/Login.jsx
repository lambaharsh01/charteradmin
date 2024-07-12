import { useEffect, useState } from "react"


export default function Login(){

const [pageHeight, setPageHeight]=useState(window.innerHeight);

const charterIcon='/charterIcon.png';


useEffect(()=>{

}, []);

const style={
    mainDiv:{height:pageHeight, width:'100%'},
    centralDiv:{},
    imgStyle:{height:150, width:150}
}



    return(
        <div style={style.mainDiv} className="container-fluid d-flex justify-content-center">
            <div className="row w-100 ">

                <div className="col-10 col-sm-8 col-md-6 offset-1 offset-sm-2 offset-md-3 p-2 text-center" style={{backgroundColor:'green'}}>
                <img src={charterIcon} style={style.imgStyle} className="m-auto"/>
                <br/>
                <input className="w-75 p-1 p-md-2 rounded-md"/>

                </div>

            </div>
        </div>
    )
}