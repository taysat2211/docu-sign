import React from 'react';
import {Link} from 'react-router-dom';

function Menu(){
    return(
        <>
           <nav className="navbar">
               <div className="navbar-container" style={{marginTop: "60px"}}>
                   <Link to="/" className="navbar-logo" style={{textDecoration: "none", marginTop: "60px"}}><h1 style={{color: "#FFFFFF", marginLeft: "157px"}}>BestSign</h1></Link>
               </div>
           </nav>
        </>
    )
}

export default Menu;
