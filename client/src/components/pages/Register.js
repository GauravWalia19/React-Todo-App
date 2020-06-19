import React,{useState} from 'react';
import '../styles/Register.css';
import {Link} from 'react-router-dom';
import PageError from '../common/PageError';
import axios from 'axios';

const Register = (props) => {
    const [user, setUser] = useState({name: '',password1: '',password2: '',email:''})
    const [errors, setErrors] = useState([]);

    const handleChange = (event) => {
        setUser({...user, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        
        // check the password length
        if(user.password1.length<=6 || user.password2.length<=6){
            setErrors([...errors, "Invalid length of the password"]);
            return;
        }else if(user.password1!==user.password2){      // compare passwords
            setErrors([...errors, "Password doesnot matches"]);
            return;
        }else{
            addNewUser(user);
        }
    }

    const addNewUser = (user) => {
        //add a new user and redirect to login
        const newUser = {
            name: user.name,
            email: user.email,
            password: user.password1
        }
        axios.post('/api/v1/users/register', newUser)
        .then(_user => {
            if(_user!==undefined){
                // add token to localstorage
                localStorage.setItem('token', _user.data.token);
                props.history.push('/home');
            }
        })
        .catch(err => {
            setErrors([...errors, "User already registered"]);
            return;
        })
        setUser({name: '',password1: '',password2: '',email:''});
    }

    return (
        <div className="registerOuterDiv">
            <div className="registerInnerDiv">
                <h2>CREATE ACCOUNT</h2>
                <PageError errors={errors} setErrors={setErrors}/>
                <form method="POST" onSubmit={handleSubmit} autoComplete="off">
                    <div className="inputDiv">
                        <input 
                            type="text" 
                            name="name" 
                            placeholder="Your Name" 
                            autoComplete="off"
                            value={user.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="inputDiv">
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="Your Email"
                            value={user.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="inputDiv">
                        <input 
                            type="password" 
                            name="password1" 
                            placeholder="Password" 
                            autoComplete="off"
                            value={user.password1}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="inputDiv">   
                        <input 
                            type="password" 
                            name="password2" 
                            placeholder="Confirm password" 
                            autoComplete="off"
                            value={user.password2}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="loginButtonDiv">
                        <button type="submit" className="submitButton">
                        SIGN UP
                        </button>
                    </div>
                </form>
                <p>Have already an account ?{' '} 
                    <Link to="/login" className="loginLink">Login here</Link>
                </p>
            </div>
        </div>
    )
}

export default Register;
