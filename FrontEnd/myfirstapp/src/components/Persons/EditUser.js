import React, {Component} from 'react';
import jwt_decode from "jwt-decode";
import EditForm from "../UserManagement/EditForm";

class EditUser extends Component {
    constructor() {
        super();

        this.state = {
            user: "",
            userType: "1"
        };
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        const token = localStorage.getItem("jwtToken");
        if (token) {
            const decoded_token = jwt_decode(token);
            if (!(decoded_token["userRole"] == "ADMIN")) {
                this.props.history.push("/home");
            }
        }
        var username = this.props.history.location.pathname.substring(10);
        fetch(`https://cors-everywhere.herokuapp.com/http://adminmicroservice-env.eba-jebjkeyt.ap-southeast-2.elasticbeanstalk.com/api/admin/user/${username}`).then((response) => response.json()).then(result => { this.setState({ user: result }) });
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
                            <h1 className="display-4 text-center">Edit User account</h1>
                            <br/>
                            <h3 className="display-6 text-center">{this.state.user.username}</h3>
                            <br/>
                            <div className="d-flex justify-content-center my-3">
                                <form action="create-profile.html">
                                    <select className="form-select bg-primary text-white p-2" name="userType" onChange={this.onChange}>
                                        <option value="1" selected>Public User</option>
                                        <option value="2" >Publisher/Shop Owner</option>
                                    </select>
                                </form>
                            </div>
                            <EditForm userType={this.state.userType} historyPath={this.props.history} user={this.state.user}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default EditUser;