import React from 'react'
import '../styles/HeaderLink.css';

const HeaderLink = (props) => {
    const getLogoutOnHome = ()=>{
        if(props.history!==undefined){
            return (
                <button className="headerLinks logoutButton" onClick={props.handleLogout}>
                <i className="fas fa-sign-out-alt"></i> logout
                </button>
            )
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
