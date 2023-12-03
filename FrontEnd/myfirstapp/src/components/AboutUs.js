import jwtDecode from 'jwt-decode';
import React, { Component } from 'react'
import "../Stylesheets/AboutUs.css"
import { Link } from 'react-router-dom';

class AboutUs extends Component {

    constructor() {
        super();

        this.state = {
            isUserLoggedIn: false
        };
    }

    componentDidMount() {
        const token = localStorage.getItem("jwtToken");

        if (token) {
            const decoded_token = jwtDecode(token)

            if (decoded_token.username) {
                this.setState({isUserLoggedIn: true});
            } 
            else {
                this.setState({isUserLoggedIn: false}); 
            }
        }
        else {
            this.setState({isUserLoggedIn: false});
        }
    }


    render() {
        return (
            <div>
                <div className="container-fluid headingSection">
                    <div className="row mt-5 mb-5 h-100">
                        <div className="col-md-4"></div>
                        <div className="col-md-4">
                            <div className="row headingText">
                                <h1 className="display-1"><strong>About Us</strong></h1> 
                            </div>
                        </div>
                        <div className="col-md-4"></div>
                    </div>
                </div>

                <div className="container mb-5">
                    <div className="row mt-5 h-100"> 
                        <div className="col-md-4 descriptionSection"> 
                            <h2 className="display-4">About</h2>
                            <h2 className="display-4">Bookeroo</h2>
                            <p className="lead">Buy, sell and share your favourite books here, at Bookeroo.</p>
                            <span>
                                {this.state.isUserLoggedIn == true ? 
                                    <div> 
                                        <Link to='/home'><button type="button" class="btn btn-primary theButton">Shop Now</button></Link>
                                    </div>
                                    :
                                    <div>
                                        <Link to='/'><button type="button" class="btn btn-primary theButton">Shop Now</button></Link>
                                    </div>
                                }
                            </span>
                        </div>
                    </div>

                </div>


            </div>
        )
    }
}
export default AboutUs;