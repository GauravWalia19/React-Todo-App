import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/NotFoundPage.css';

const NotFoundPage = () => {
    return (
        <div>
            <div className="notFoundDiv">
                <div className="notFoundInnerDiv">
                    <h1>404</h1>
                    <h2>Page Not Found !!!</h2>
                </div>
                <div className="notFoundInnerDiv">
                    <i className="fas fa-8x fa-unlink"></i>
                </div>
                <div>
                    <h3 className="notFoundLink">Available pages</h3>
                    <Link to="/" className="notFoundLink">
                        <i className="fas fa-link"></i> HOME
                    </Link>
                    <Link to="/login" className="notFoundLink">
                        <i className="fas fa-link"></i> LOGIN
                    </Link>
                    <Link to="/register" className="notFoundLink">
                        <i className="fas fa-link"></i> SIGNUP
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NotFoundPage;
