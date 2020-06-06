import React from 'react';
import './Header.css';
import {Link} from 'react-router-dom';

const Header = (props) => {
    const handleLogout = () => {
        // delete the token from localstorage
        localStorage.setItem('token', '');
        props.history.push('/');
    }

    const getLogoutOnHome = ()=>{
        if(props.history!==undefined){
            return <button className="navlinks logoutButton" onClick={handleLogout}>/logout</button>
        }
    }

    return (
        <header className="header">
            {getLogoutOnHome()}   
            <Link to="/login" className="navlinks">/login</Link>
            <Link to="/register" className="navlinks">/register</Link>
            <h1>Task Management To-do list</h1>
        </header>
    )
}

export default Header;