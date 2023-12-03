import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUsers } from "../../actions/personActions";
import { getUser } from "../../actions/personActions";
import { approvePendingUser } from "../../actions/personActions";
import { rejectPendingUser } from "../../actions/personActions";
import { blockUser } from "../../actions/personActions";

class ReviewAccounts extends Component {
    constructor() {
        super();

        this.state = {
            username: '',
            allActiveUsers: [],
            allPendingUsers: [],
            errors: '',
            message: ''
        };
    }

    componentDidMount() {
        fetch("https://cors-everywhere.herokuapp.com/http://adminmicroservice-env.eba-jebjkeyt.ap-southeast-2.elasticbeanstalk.com/api/admin/allusers").then((response) => response.json()).then(result => { this.setState({ allActiveUsers: result }) });
        fetch("https://cors-everywhere.herokuapp.com/http://adminmicroservice-env.eba-jebjkeyt.ap-southeast-2.elasticbeanstalk.com/api/admin/allpendingusers").then((response) => response.json()).then(result => { this.setState({ allPendingUsers: result }) });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ message: nextProps.errors.message ? nextProps.errors.message : "" });
    }

    render() {
        return (
            <div className="Review">
                <div className="container">
                    {this.state.message.length > 0 && (<div className="alert alert-success text-center" role="alert">
                        {this.state.message}
                    </div>)}
                    <div className="row">

                        <div className="col-md-12">

                            { /* pending accounts */}

                            <h1 className="display-4 text-center">Pending accounts</h1>
                            <br />
                            <br />
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">User Name</th>
                                        <th scope="col">Mobile Number</th>
                                        <th scope="col">Type of User</th>
                                        <th scope="col">ABN</th>
                                        <th scope="col">Accept</th>
                                        <th scope="col">Reject</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.allPendingUsers.map(user => (
                                        <tr key={user.id}>
                                            <td key={1}>{user.username}</td>
                                            <td key={2}>{user.phoneNumber}</td>
                                            <td key={3}>{user.userRole}</td>
                                            <td key={4}>{user.abn}</td>
                                            <td><input className="btn btn-primary" type="submit" value="Accept"
                                                onClick={() => this.props.approvePendingUser(user, this.props.history)} /></td>
                                            <td><input className="btn btn-primary" type="submit" value="Reject"
                                                onClick={() => this.props.rejectPendingUser(user, this.props.history)} /></td>
                                        </tr>))}
                                </tbody>
                            </table>
                        </div>
                        <div className="col-md-12">

                            { /* all accounts */}

                            <h1 className="display-4 text-center">All Active user accounts</h1>
                            <br />
                            <br />
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Edit</th>
                                        <th scope="col">User Name</th>
                                        <th scope="col">Full Name</th>
                                        <th scope="col">Mobile Number</th>
                                        <th scope="col">Type of User</th>
                                        <th scope="col">ABN</th>
                                        <th scope="col">Block</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.allActiveUsers.map(user => (
                                        <tr key={user.id}>
                                            <td><input className="btn btn-primary" type="submit" value="Edit"
                                                onClick={() => this.props.history.push(`/edituser/${user.username}`)}/></td>
                                            <td key={1}>{user.username}</td>
                                            <td key={2}>{user.fullName}</td>
                                            <td key={3}>{user.phoneNumber}</td>
                                            <td key={4}>{user.userRole}</td>
                                            <td key={5}>{user.abn}</td>
                                            <td><input className="btn btn-primary" type="submit" value="Block"
                                                onClick={() => this.props.blockUser(user, this.props.history)} /></td>
                                        </tr>))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );

    }

}

ReviewAccounts.propTypes = {
    getUsers: PropTypes.func.isRequired,
    getUser: PropTypes.func.isRequired,
    approvePendingUser: PropTypes.func.isRequired,
    rejectPendingUser: PropTypes.func.isRequired,
    blockUser: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    errors: state.errors
});
export default connect(
    mapStateToProps,
    { getUsers, getUser, approvePendingUser, rejectPendingUser, blockUser },
)(ReviewAccounts);