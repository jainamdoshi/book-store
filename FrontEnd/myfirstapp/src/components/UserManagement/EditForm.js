import React, { Component } from "react";
import classnames from "classnames";
import { editUser } from "../../actions/personActions";
import * as PropTypes from 'prop-types'
import { connect } from "react-redux";

class EditForm extends Component {
    constructor() {
        super();

        this.state = {
            user: '',
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
        this.state.password = this.state.password === null ? this.props.user.password : this.state.password;
        const editUser = {
            fullName: this.state.fullName,
            username: this.props.user.username,
            address: this.state.address,
            phoneNumber: this.state.phoneNumber,
            abn: this.state.abn,
            password: this.state.password,
            confirmPassword: this.state.password,
        };
        editUser['userRole'] = this.props.userType === "1" ? this.userRoles.public : this.userRoles.publisher;
        this.props.editUser(editUser, this.props.historyPath);
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
                    <span className="text-danger"><big> Full Name: {this.props.user.fullName} </big></span>
                    <input
                        type="text"
                        className={classnames("form-control form-control-lg", {
                            "is-invalid": errors.fullName
                        })}
                        placeholder="fullName"
                        name="fullName"
                        onChange={this.onChange.bind(this)}
                        required
                    />
                    {errors.fullName.length > 0 && (
                        <div className="invalid-feedback">{errors.fullName}</div>
                    )}
                </div>
                <div className="form-group">
                    <span className="text-danger"><big> Address: {this.props.user.address} </big></span>
                    <input
                        type="text"
                        className={classnames("form-control form-control-lg", { "is-invalid": errors.address })}
                        placeholder="address"
                        name="address"
                        onChange={this.onChange.bind(this)}
                        required
                    />
                    {errors.address.length > 0 && (
                        <div className="invalid-feedback">{errors.address}</div>
                    )}
                </div>
                <div className="form-group">
                    <span className="text-danger"><big> Phone Number: {this.props.user.phoneNumber} </big></span>
                    <input
                        type="text"
                        className={classnames("form-control form-control-lg", { "is-invalid": errors.phoneNumber })}
                        placeholder="phoneNumber"
                        name="phoneNumber"
                        onChange={this.onChange.bind(this)} required />
                    {errors.phoneNumber.length > 0 && (
                        <div className="invalid-feedback">{errors.phoneNumber}</div>
                    )}
                </div>

                {
                    this.props.userType == "2" &&
                    <div className="form-group">
                        <span className="text-danger"><big> ABN: {this.props.user.abn} </big></span>
                        <input
                            type="text"
                            className={classnames("form-control form-control-lg", { "is-invalid": errors.abn })}
                            placeholder="abn"
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
                    <span className="text-danger"><big> Password: {this.props.user.password} </big></span>
                    <input
                        type="password"
                        className={classnames("form-control form-control-lg", { "is-invalid": errors.password })}
                        placeholder="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChange.bind(this)}
                    />
                    {errors.password.length > 0 && (
                        <div className="invalid-feedback">{errors.password}</div>
                    )}
                </div>

                <input type="submit" className="btn btn-info btn-block mt-4" />
            </form >
        )
    }
}

EditForm.propTypes = {
    editUser: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    errors: state.errors
});
export default connect(
    mapStateToProps,
    { editUser }
)(EditForm);