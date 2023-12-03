import React, { Component } from 'react';
import jwt_decode from "jwt-decode";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createTransaction } from "../../actions/transactionActions";
import "../../Stylesheets/Book.css";

class SharePage extends Component {

    constructor() {
        super();

        this.state = {
            book: "",
            buyerUsername: "",
            isbn: "",
            username: "",
            totalPrice: 0,
            numOfNewBook: 0,
            numOfOldBook: "",
            message: ""
        };

        this.handleNewShare = this.handleNewShare.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const token = localStorage.getItem("jwtToken");
        if (token) {
            const decoded_token = jwt_decode(token);
            this.setState({ buyerUsername: decoded_token.username });
        }
        var isbn = this.props.history.location.pathname.substring(7);
        fetch(`https://cors-everywhere.herokuapp.com/http://bookmicroservice-env.eba-vvi3x9cs.ap-southeast-2.elasticbeanstalk.com/api/books/${isbn}`).then((response) => response.json()).then(result => { this.setState({ book: result }) });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ message: nextProps.errors.message ? nextProps.errors.message : "" });
    }

    handleNewShare = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    };

    handleSubmit = (e) => {
        e.preventDefault()

        const newShare = {
            buyerUsername: this.state.buyerUsername,
            isbn: this.state.book.id.isbn,
            username: this.state.book.id.username,
            totalPrice: this.state.totalPrice,
            numOfNewBook: this.state.numOfNewBook,
            numOfOldBook: this.state.numOfOldBook
        }
        const bookUpdateRequest = {
            numOfNewBook: this.state.numOfNewBook,
            numOfOldBook: this.state.numOfOldBook
        }
        this.props.createTransaction(newShare, bookUpdateRequest, this.props.history, false);
    }

    render() {
        return (
            <div className="register">
                <div className="container">
                    {this.state.message.length > 0 && (<div className="alert alert-success text-center" role="alert">
                        {this.state.message}
                    </div>)}
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Share books</h1>
                            <br />
                            <div className="center-image" >
                                <img src={this.state.book.bookCoverURL} alt={`${this.state.book.isbn}`} />
                            </div>
                            <h2 className="display-6 text-center">{this.state.book.bookName}</h2>
                            <h2 className="display-6 text-center">{this.state.book.isbn}</h2>
                            <br />
                            <h4 className="display-6 text-center">The number of available OLD book: {this.state.book.numOfOldBook}</h4>
                            <br />
                            <form onSubmit={this.handleSubmit}>
                                <div className="from-group">
                                    <label className="addSellText">The number of OLD book to share</label>
                                    <br />
                                    <input required className="form-control requiresBottomSpacing" type="number" min="0" max={this.state.book.numOfOldBook} name="numOfOldBook" value={this.state.numOfOldBook} onChange={this.handleNewShare} />
                                </div>

                                <div className="row addBookSubmitButton">
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
SharePage.propTypes = {
    createTransaction: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        shareError: state.errors,
        errors: state.errors
    }
}

export default connect(
    mapStateToProps,
    { createTransaction }
)(SharePage);