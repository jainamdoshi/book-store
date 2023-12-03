import React, { Component } from "react";
import classnames from "classnames";
import { createNewUser } from "../../actions/securityActions";
import * as PropTypes from 'prop-types'
import { connect } from "react-redux";

/* 
This is the Signup form for the SignUP page, all the required validation has been put in this form, 
An ABN option will be shown to only publishers/shop owners, rest all details are same for both kind of users.
*/

class RegisterForm extends Component {
    constructor() {
        super();

        this.state = {
            fullName: '',
            username: '',
            address: '',
            phoneNumber: '',
            password: '',
            confirmPassword: '',
            abn: '',
            userRole: '',
            errors: {
                fullName: '',
                username: '',
                address: '',
                phoneNumber: '',
                password: '',
                confirmPassword: '',
                abn: ''
            },
            dbErrors: {}
        };

        this.userRoles = {
            public: "PUBLIC",
            publisher: "PUBLISHER"
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                dbErrors: nextProps.errors
            });
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        let errors = this.state.errors;
        const name = e.target.name;
        const value = e.target.value;

        switch (e.target.name) {
            case 'fullName':
                errors.fullName = value.length < 1 || value.length > 25 ? 'Name must be 1 character long.' : '';
                break;

            case 'username':
                errors.username = value.length < 5 ? 'Username must be 5 characters long.' : '';
                break;

            case 'address':
                errors.address = value.length < 10 ? 'Address must be less than 30 characters.' : '';
                break;

            case 'phoneNumber':
                errors.phoneNumber = parseInt(value).toString().length !== 9 ? 'Phone number should be of only 9 digits.' : '';
                break;

            case 'password':
                errors.password = value.length < 6 ? 'Password must be at least 6 characters' : '';
                break;

            case 'confirmPassword':
                errors.confirmPassword = value !== this.state.password ? 'Passwords must match' : '';
                break;

            case 'abn':
                errors.abn = parseInt(value).toString().length !== 11 ? 'Your ABN should be a 11 digit unique number' : '';
                break;
        }
        this.setState({ errors, name: errors.name });
    }

    onSubmit(e) {
        e.preventDefault();
        const newUser = {
            fullName: this.state.fullName,
            username: this.state.username,
            address: this.state.address,
            phoneNumber: this.state.phoneNumber,
            abn: this.state.abn,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,

        };
        newUser['userRole'] = this.props.userType === "1" ? this.userRoles.public : this.userRoles.publisher;
        this.props.createNewUser(newUser, this.props.historyPath);
    }

    render() {
        const { errors } = this.state;
        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                {Object.keys(this.state.dbErrors).map(key => {
                    return (<div key={key} className="alert alert-danger" role="alert">
                        {this.state.dbErrors[key]}
                    </div>)
                }
                )}
                <div className="form-group">
                    <input
                        type="text"
                        className={classnames("form-control form-control-lg", {
                            "is-invalid": errors.fullName
                        })}
                        placeholder="Full Name"
                        name="fullName"
                        onChange={this.onChange.bind(this)}
                        required
                    />
                    {errors.fullName.length > 0 && (
                        <div className="invalid-feedback">{errors.fullName}</div>
                    )}
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className={classnames("form-control form-control-lg", { "is-invalid": errors.username })}
                        placeholder="Email"
                        name="username"
                        onChange={this.onChange.bind(this)}
                        required
                    />
                    {errors.username.length > 0 && (
                        <div className="invalid-feedback">{errors.username}</div>
                    )}
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className={classnames("form-control form-control-lg", { "is-invalid": errors.address })}
                        placeholder="Address"
                        name="address"
                        onChange={this.onChange.bind(this)}
                        required
                    />
                    {errors.address.length > 0 && (
                        <div className="invalid-feedback">{errors.address}</div>
                    )}
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className={classnames("form-control form-control-lg", { "is-invalid": errors.phoneNumber })}
                        placeholder="Enter phone number"
                        name="phoneNumber"
                        onChange={this.onChange.bind(this)} required />
                    {errors.phoneNumber.length > 0 && (
                        <div className="invalid-feedback">{errors.phoneNumber}</div>
                    )}
                </div>

                {
                    this.props.userType == "2" &&
                    <div className="form-group">
                        <input
                            type="text"
                            className={classnames("form-control form-control-lg", { "is-invalid": errors.abn })}
                            placeholder="Enter ABN"
                            name="abn"
                            onChange={this.onChange.bind(this)}
                            required
                        />
                        {errors.abn.length > 0 && (
                            <div className="invalid-feedback">{errors.abn}</div>
                        )}
                    </div>
                }

                <div className="form-group">
                    <input
                        type="password"
                        className={classnames("form-control form-control-lg", { "is-invalid": errors.password })}
                        placeholder="Password"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChange.bind(this)}
                        required
                    />
                    {errors.password.length > 0 && (
                        <div className="invalid-feedback">{errors.password}</div>
                    )}
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        className={classnames("form-control form-control-lg", { "is-invalid": errors.confirmPassword })}
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        value={this.state.confirmPassword}
                        onChange={this.onChange.bind(this)}
                        required
                    />
                    {errors.confirmPassword.length > 0 && (
                        <div className="invalid-feedback">{errors.confirmPassword}</div>
                    )}
                </div>

                <input type="submit" className="btn btn-info btn-block mt-4" />
            </form >
        )
    }
}

RegisterForm.propTypes = {
    createNewUser: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    errors: state.errors
});
export default connect(
    mapStateToProps,
    { createNewUser }
)(RegisterForm);