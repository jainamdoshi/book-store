import React, {Component} from 'react';
import jwt_decode from "jwt-decode";
import TransactionHistoryButton from "../Transactions/TransactionHistoryButton";

class Profile extends Component {
    constructor() {
        super();

        this.state = {
            username: "",
            address: "",
            phoneNumber: "",
            fullName: "",
            ABN: "",
            userRole: "",
            isPublisher: false
        };
    }

    componentDidMount() {
        const token = localStorage.getItem("jwtToken");
        if (token) {
            const decoded_token = jwt_decode(token)

            if (decoded_token.username) {
                this.setState({username: decoded_token.username})
                this.setState({address: decoded_token.address})
                this.setState({phoneNumber: decoded_token.phoneNumber})
                this.setState({fullName: decoded_token.fullName})
                if (decoded_token.userRole == "PUBLISHER") {
                    this.setState({isPublisher: true})
                }
                this.setState({ABN: decoded_token.ABN})
                this.setState({userRole: decoded_token.userRole})
            }
        }
        else {
            this.props.history.push("/home");
        }
    }

    render() {
        return (
            <div className="Profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4 text-center">Profile</h1>
                            <br/>
                            <br/>
                            <table className="table">
                                <thead>
                                <tr>
                                    <th scope="col"> </th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Information</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <th scope="row"></th>
                                    <td>User name</td>
                                    <td>{this.state.username}</td>
                                </tr>
                                <tr>
                                    <th scope="row"></th>
                                    <td>Full name</td>
                                    <td>{this.state.fullName}</td>
                                </tr>
                                <tr>
                                    <th scope="row"></th>
                                    <td>Address</td>
                                    <td>{this.state.address}</td>
                                </tr>
                                <tr>
                                    <th scope="row"></th>
                                    <td>Phone number</td>
                                    <td>{this.state.phoneNumber}</td>
                                </tr>
                                {this.state.isPublisher && (<tr>
                                    <th scope="row"></th>
                                    <td>ABN</td>
                                    <td>{this.state.ABN}</td>
                                </tr>)}
                                <tr>
                                    <th scope="row"></th>
                                    <td>User role</td>
                                    <td>{this.state.userRole}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {!(this.state.userRole === "ADMIN") ?
                    <div className="display-4 text-center">
                        <TransactionHistoryButton/>
                    </div>
                    :
                    <div/>
                }
            </div>
        );
    }
}
export default Profile;