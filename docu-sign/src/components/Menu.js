import React from 'react';
import {Link} from 'react-router-dom';

function Menu(){
    return(
        <>
           <nav className="navbar">
               <div className="navbar-container">
                   <Link to="/" className="navbar-logo">BestSign</Link>
               </div>
           </nav>
        </>
    )
}

export default Menu;
