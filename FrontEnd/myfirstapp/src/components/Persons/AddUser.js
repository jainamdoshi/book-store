import React, { Component } from "react";
import RegisterForm from "../UserManagement/RegisterForm";
import "../../Stylesheets/Register.css";



class AddUser extends Component {
    constructor() {
        super();

        this.state = {
            userType: "1"
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Add a new user</h1>
                            <br></br>
                            <div className="d-flex justify-content-center my-3">
                                <form action="create-profile.html">
                                    <select className="form-select bg-primary text-white p-2" name="userType" onChange={this.onChange}>
                                        <option value="1" selected>Public User</option>
                                        <option value="2" >Publisher/Shop Owner</option>
                                    </select>
                                </form>
                            </div>
                            <RegisterForm userType={this.state.userType} historyPath={this.props.history} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default AddUser;