import React from 'react';
import Footer from '../common/Footer';
import {Link} from 'react-router-dom';
import './NotFoundPage.css';

const NotFoundPage = () => {
    return (
        <div>
            <div className="notFoundDiv">
                <div className="notFoundInnerDiv">
                    <h1>404</h1>
                    <h2>Page Not Found !!!</h2>
                </div>
                <div className="notFoundInnerDiv">
                    <i class="fas fa-8x fa-unlink"></i>
                </div>
                <div>
                    <h3 className="notFoundLink">Available pages</h3>
                    <Link to="/login" className="notFoundLink">LOGIN</Link>
                    <Link to="/register" className="notFoundLink">SIGNUP</Link>
                    <Link to="/" className="notFoundLink">HOME</Link>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default NotFoundPage;
