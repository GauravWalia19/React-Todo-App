import React from 'react'
import './HeaderLink.css';

const HeaderLink = (props) => {
    const getLogoutOnHome = ()=>{
        if(props.history!==undefined){
            return <button className="headerLinks logoutButton" onClick={props.handleLogout}>logout</button>
        }
    }

    return (
        <div className="headerProfileLinks">
            <div className="headerLinks">{props.email}</div>
            {getLogoutOnHome()}
        </div>
    )
}

export default HeaderLink;
