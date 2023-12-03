import React, { Component } from 'react'
import "../Stylesheets/ContactUs.css"
import profilePic1 from '../Images/dev.jpg'
import profilePic2 from '../Images/jamDos.jpeg'
import profilePic3 from '../Images/adhiraj.jpg'
import profilePic4 from '../Images/lee.png'
import profilePicDummy from '../Images/profileImage.png'

class ContactUs extends Component {

    constructor() {
        super();
        this.state = {
            email: "",
            theIssue: "",
            description: ""
        }
    }

    handleNewContact = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }


    render() {
        return (
            <div>
                <div className="container-fluid">
                    <div className="row mt-5 mb-5">
                        <div className="col-md-3"></div>
                        <div className="col-md-7">
                            <div className="row">
                                <h1 className="display-3 ml-4"><strong>Contact Our Team</strong></h1>
                            </div>
                        </div>

                        <div className=" ml-4 row mt-3 mb-5">

                            <div className="col-md-3">
                                <div className="card" style={{ width: '20rem' }}>
                                    <img class="card-img-top profilePic" src={profilePic2} alt="Card image cap" />
                                    <div className="card-body">
                                        <p className="card-text display-4">Jainam Doshi</p>
                                        <p className="card-text lead">Scrum Master</p>
                                        <p className="card-text lead">s3825891@student.rmit.edu.au</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <div className="card" style={{ width: '19rem' }}>
                                    <img class="card-img-top profilePic" src={profilePic3} alt="Card image cap" />
                                    <div className="card-body">
                                        <p className="card-text display-4">Adhiraj Jain</p>
                                        <p className="card-text lead">Development Team</p>
                                        <p className="card-text lead">s3821245@student.rmit.edu.au</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <div className="card" style={{ width: '19rem' }}>
                                    <img class="card-img-top profilePic" src={profilePic4} alt="Card image cap" />
                                    <div className="card-body">
                                        <p className="card-text display-4">You Chan Lee</p>
                                        <p className="card-text lead">Development Team</p>
                                        <p className="card-text lead">s3850825@student.rmit.edu.au</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <div className="card" style={{ width: '19rem' }}>
                                    <img class="card-img-top profilePic" src={profilePic1} alt="Card image cap" />
                                    <div className="card-body">
                                        <p className="card-text display-4">Devin Amalean</p>
                                        <p className="card-text lead">Development Team</p>
                                        <p className="card-text lead">s3821117@student.rmit.edu.au</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ContactUs;