import React, { Component } from 'react'
import "../../Stylesheets/App.css";
import { Link } from 'react-router-dom'

class Footer extends Component {
    render() {
        return (
            <div className="theFooter mt-3">
                <nav className="navbar fixed-bottom navbar-expand-sm navbar-dark bg-primary mb-0 mt-4">
                    <div className="container">
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                            <span className="navbar-toggler-icon" />
                        </button>

                        <div className="collapse navbar-collapse" id="mobile-nav">
                            <ul className="navbar-nav ml-auto footSpacings">
                                <li className="nav-item">
                                    <Link to="/aboutus"><a className="nav-link" href="dashboard"> ABOUT US </a></Link>
                                </li>
                            </ul>

                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link to="/contactus"><a className="nav-link " href="register"> CONTACT US </a></Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}
export default Footer;