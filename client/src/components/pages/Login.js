import React,{useState} from 'react';
import './Login.css'; 
import axios from 'axios';
import PageError from '../common/PageError';
import {Link} from 'react-router-dom';

const Login = (props) => {
    const [user, setUser] = useState({email:'',password:''})
    const [errors, setErrors] = useState([]);

    const handleChange = (event) => {
        setUser({...user, [event.target.name]: event.target.value});
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        
        // posting a into login form
        const newUser = {
            email: user.email,
            password: user.password
        }

        axios.post('/api/v1/users/login', newUser)
        .then(_user => {
            if(_user!==undefined){
                // add token to localstorage
                localStorage.setItem('token', _user.data.token);
                props.history.push('/home');
            }
        })
        .catch(err => {
            setErrors([...errors, "User or password is incorrect"]);
            return;
        })
        setUser({email:'',password:''})
    } 


    return (
        <div className="loginDiv">
            <div className="loginForm">
                <h2 id="login">SIGN IN</h2>
                <PageError errors={errors} setErrors={setErrors}/>
                <form onSubmit={handleSubmit} method="POST">
                    <div className="formDiv">
                        <span>Email</span><br/>
                        <input 
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={user.email}
                            autoComplete="off"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="formDiv">
                        <span>Password</span><br/>
                        <input 
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            value={user.password}
                            autoComplete="off"
                            onChange={handleChange}
                            required
                        />
                        <span className="passwordFooter">Forgot Password?</span>
                    </div>
                    <div id="submitDiv">
                        <button type="submit" className="loginButton">LOGIN</button>
                    </div>
                    <p>Don't have account ?{' '} 
                    <Link to="/register" className="registerLink">Register here</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Login
