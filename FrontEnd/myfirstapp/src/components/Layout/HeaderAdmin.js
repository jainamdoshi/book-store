import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import profilePic from '../../Images/DSC_5703.jpg'


class HeaderAdmin extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
                <div className="container">
                    {/* Left  of the Nvaigation Bar */}
                    <ul className="nav navbar-nav pull-sm-left">
                        <li className="nav-item">
                            <a className="navbar-brand" href="#">
                                <img src= {profilePic} height="50" className="rounded-circle"></img>
                            </a>
                        </li>
                    </ul>

                    {/* Centre of the navigation bar */}
                    <ul className="nav navbar-nav navbar-logo mx-auto">
                        <li className="nav-item">
                            <a className="navbar-brand adminNavBar" href="Dashboard.html">
                                Bookeroo
                            </a>
                        </li>
                    </ul>

                    {/* Right of the navigagtion bar */}
                    <ul className="nav navbar-nav pull-sm-right">
                        <li className="nav-item">
                            {/* Linking the add book button to the page where books can be added */}
                            <Link to='/addbook'><button className="btn btn-light my-2 my-sm-0 addBookButton">Add Book</button></Link>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-light my-2 my-sm-0 logOutButton">Log Out</button>
                        </li>
                    </ul>

                
                </div>
                </nav>
            </div>
        )
    }
}

export default HeaderAdmin;
