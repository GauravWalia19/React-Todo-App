import React,{useState} from 'react';
import './Register.css';
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
            console.log(err);
            setErrors([...errors, "User already registered"]);
            return;
        })
        setUser({name: '',password1: '',password2: '',email:''});
    }

    return (
        <div className="registerOuterDiv">
            <div className="registerInnerDiv">
                <h2>Register</h2>
                <PageError errors={errors} setErrors={setErrors}/>
                <form method="POST" onSubmit={handleSubmit}>
                    <div>
                        Name:<br/>
                        <input 
                            type="text" 
                            name="name" 
                            placeholder="Enter your name" 
                            autoComplete="off"
                            value={user.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        Email:<br/>
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="Enter your email"
                            value={user.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        Password:<br/>
                        <input 
                            type="password" 
                            name="password1" 
                            placeholder="Enter password" 
                            autoComplete="off"
                            value={user.password1}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>   
                        Confirm Password:<br/>
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
                    <div>
                        <button type="submit" className="submitButton">
                        submit
                        </button>
                    </div>
                </form>
            </div>
            <p>If you are already registered then{' '} 
            <Link to="/login" className="loginLink">/login</Link> here</p>
        </div>
    )
}

export default Register;
