import React, { Component } from 'react'
import jwt_decode from "jwt-decode";
import ShowAllBooks from "./Books/ShowAllBooks";

class Home extends Component {
    constructor() {
        super();

        this.state = {
            isUserLoggedIn: false
        };
    }

    componentDidMount() {
        const token = localStorage.getItem("jwtToken");
        if (token) {
            const decoded_token = jwt_decode(token)

            if (decoded_token.username) {
                this.setState({ isUserLoggedIn: true })
            } else {
                this.setState({ isUserLoggedIn: false })
            }
        } else {
            this.setState({ isUserLoggedIn: false })
        }
    }

    componentWillReceiveProps() {
    }


    render() {
        return (
            <div>
                <ShowAllBooks address={this.props.history}/>
            </div>

        );
    }
}
export default Home;