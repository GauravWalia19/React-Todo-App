import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
    return (
        <div className="footerStyle">
            <div id="footerUpperDiv">
                <h3>Other Links</h3>
                <div className="footerDivs">
                    <ul>
                        <li>
                            <a href="https://github.com/GauravWalia19/React-Todo-App" className="footerLinkStyle">
                                <i className="fas fa-star footerIconStyle"></i> Star on Github
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/GauravWalia19/React-Todo-App/issues" className="footerLinkStyle">
                                <i className="fas fa-exclamation-circle footerIconStyle"></i> Create an Issue
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/GauravWalia19/React-Todo-App/pulls" className="footerLinkStyle"> 
                                <i className="fas fa-code-branch footerIconStyle"></i> Send an Pull Request
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="footerDivs">
                    <ul>
                        <li>
                            <a href="https://github.com/GauravWalia19/React-Todo-App/blob/master/LICENSE" className="footerLinkStyle">
                                <i className="fab fa-github-square footerIconStyle"></i> LICENSE
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/GauravWalia19/React-Todo-App/blob/master/.github/CODE_OF_CONDUCT.md" className="footerLinkStyle">
                                <i className="far fa-file-code footerIconStyle"></i> CODE OF CONDUCT
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/GauravWalia19/React-Todo-App/blob/master/.github/CONTRIBUTING.md" className="footerLinkStyle">
                                <i className="fas fa-project-diagram footerIconStyle"></i> Contribute
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div>
                <span>
                    Build with 
                    <i className="fas fa-heart footerIconStyle"></i> 
                    using 
                    <i className="fab fa-react footerIconStyle"></i> 
                    React
                </span>
                <br/>
                Gaurav Walia Copyright 2020
            </div>
        </div>
    )
}
export default Footer;
