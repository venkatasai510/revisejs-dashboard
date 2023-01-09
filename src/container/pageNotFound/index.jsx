import React from "react";

const Pagenotfound = () =>{
    return(
        <>
          <div  style={{display:"flex",
                        alignItems:"center",
                        justifyContent:"center",
                        flexDirection:"coloumn",
                        height:"100vh",
                        gap:"20px"}} className="page">
             <h1 style={{color:"white",
                         borderRightColor:"white",
                         borderRight:"2px solid white",
                         paddingRight:"30px",
                         }}>404</h1>
             <p  style={{color:"white"}}>Page not Found</p>
          </div>
        </>
    )
}

export default Pagenotfound;