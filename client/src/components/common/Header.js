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
        alert('You are successfully logout');
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
        }else if(props.history===undefined){
            return (
                <React.Fragment>
                    <Link to="/login" className="navlinks">/login</Link>
                    <Link to="/register" className="navlinks">/register</Link>
                </React.Fragment>
            ) 
        }  
    }

    return (
        <header className="header">
            {getProfileLinks()}
            <h1>
                <Link to={props.history===undefined ? "/" : "/home"} className="taskHeader">
                    <i className="fas fa-check-circle"></i> Task Management
                </Link>
            </h1>
        </header>
    )
}

export default Header;