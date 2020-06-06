import React from 'react';
import './Header.css';
import {Link} from 'react-router-dom';

const Header = () => {
    return (
        <header className="header">
            <Link to="/login" className="navlinks">/login</Link>
            <Link to="/register" className="navlinks">/register</Link>
            <h1>Task Management To-do list</h1>
        </header>
    )
}

export default Header;