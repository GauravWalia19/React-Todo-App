import React,{useState,useEffect} from 'react';
import { Redirect,Route } from 'react-router-dom';
import axios from 'axios';

const PrivateRoute = ({path, component}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        let mounted = true;
        if(localStorage.getItem('token')){
            axios.get('/api/v1/users',{
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            })
            .then(_user => {
                if(mounted){
                    setIsAuthenticated(true);
                }
            })
            .catch(err => {setIsAuthenticated(false)});
        }
        return () => {
            mounted = false;
        }
    }, [isAuthenticated])

    return (
        isAuthenticated ? 
        <Route exact path={path} component={component} /> : <Redirect to="/" />
    )
}

export default PrivateRoute;
