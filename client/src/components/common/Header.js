import React,{useState,useEffect} from 'react';
import '../styles/Header.css';
import {Link} from 'react-router-dom';
import axios from 'axios';
import HeaderLink from './HeaderLink';

const Header = (props) => {
    const [user, setUser] = useState({email:''});
    const [toggleDropdown, setToggleDropdown] = useState(false);

    useEffect(() => {
        if(localStorage.getItem('token')){
            axios.get('/api/v1/users',{
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            })
            .then(_user => {
                setUser({email: _user.data.email})
            })
            .catch(err => {});
        }
    }, [])

    const handleLogout = () => {
        // delete the token from localstorage
        localStorage.setItem('token', '');
        props.history.push('/');
    }

    const showDropdown = () => {
        if(toggleDropdown){
            return <HeaderLink history={props.history} handleLogout={handleLogout} email={user.email}/>
        }
    }

    const handleProfileDropdown = () =>{
        setToggleDropdown(!toggleDropdown);
    }

    const getProfileLinks = () => {
        if(user.email!=='' && props.history!==undefined){
            return (
                <React.Fragment>
                    <i className="fas fa-user-circle fa-2x navlinks" onClick={handleProfileDropdown}></i>
                    {showDropdown()}
                </React.Fragment>
            )
        }else if(props.history!==undefined){
            return <i className="fas fa-user-circle fa-2x navlinks"></i>
        }  
    }

    return (
        <header className="header">
            {getProfileLinks()}
            <Link to="/login" className="navlinks">/login</Link>
            <Link to="/register" className="navlinks">/register</Link>
            <h1><i className="fas fa-check-circle"></i> Task Management</h1>
        </header>
    )
}

export default Header;