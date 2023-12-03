import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { createTransaction } from "../../actions/transactionActions";
import jwt_decode from "jwt-decode";
import "../../Stylesheets/Book.css";

class BuyPage extends Component {

    constructor() {
        super();

        this.state = {
            book: "",
            buyerUsername: "",
            isbn: "",
            username: "",
            totalPrice: "",
            numOfOldBook: 0,
            numOfNewBook: 0,
            message: ""
        };

        this.handleNewTransaction = this.handleNewTransaction.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const token = localStorage.getItem("jwtToken");
        if (token) {
            const decoded_token = jwt_decode(token);
            this.setState({ buyerUsername: decoded_token.username });
        }
        var isbn = this.props.history.location.pathname.substring(5);
        fetch(`https://cors-everywhere.herokuapp.com/http://bookmicroservice-env.eba-vvi3x9cs.ap-southeast-2.elasticbeanstalk.com/api/books/${isbn}`).then((response) => response.json()).then(result => { this.setState({ book: result }) });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ message: nextProps.errors.message ? nextProps.errors.message : "" });
    }

    handleNewTransaction = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    };

    handleSubmit = (e) => {
        e.preventDefault()
        this.state.totalPrice = (this.state.numOfNewBook) * (this.state.book.newBookPrice)
            + (this.state.numOfOldBook) * (this.state.book.oldBookPrice);

        const newSell = {
            buyerUsername: this.state.buyerUsername,
            isbn: this.state.book.id.isbn,
            username: this.state.book.id.username,
            totalPrice: this.state.totalPrice,
            numOfOldBook: this.state.numOfOldBook,
            numOfNewBook: this.state.numOfNewBook
        }
        const bookUpdateRequest = {
            numOfNewBook: this.state.numOfNewBook,
            numOfOldBook: this.state.numOfOldBook
        }
        // Paypal API is working here
        const totalUnits = parseInt(this.state.numOfNewBook) + parseInt(this.state.numOfOldBook)
        this.props.history.push({
            pathname: "/paymentTransaction",
            state: {
                totalAmount: this.state.totalPrice,
                itemName: this.state.book,
                units: totalUnits,
                newSell: newSell,
                bookUpdateRequest: bookUpdateRequest
            }
        });

    }

    render() {
        return (
            <div className="register mb-5">
                <div className="container">
                    {this.state.message.length > 0 && (<div className="alert alert-success text-center" role="alert">
                        {this.state.message}
                    </div>)}
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Buy books</h1>
                            <br />
                            <div className="center-image" >
                                <img src={this.state.book.bookCoverURL} alt={`${this.state.book.isbn}`} />
                            </div>
                            <h2 className="display-6 text-center">{this.state.book.bookName}</h2>
                            <h2 className="display-6 text-center">{this.state.book.isbn}</h2>
                            <br />
                            {this.state.book.numOfNewBook > 0 ?
                                <div>
                                    <h4 className="display-6 text-center">The number of available NEW book: {this.state.book.numOfNewBook}</h4>
                                    <h4 className="display-6 text-center">Unit price for a NEW book: ${this.state.book.newBookPrice}</h4>
                                </div>
                                :
                                <div></div>
                            }
                            {this.state.book.numOfOldBook > 0 ?
                                <div>
                                    <br />
                                    <h4 className="display-6 text-center">The number of available OLD book: {this.state.book.numOfOldBook}</h4>
                                    <h4 className="display-6 text-center">Unit price for a OLD book: ${this.state.book.oldBookPrice}</h4>
                                </div>
                                :
                                <div></div>
                            }
                            <br />
                            <form onSubmit={this.handleSubmit}>
                                {this.state.book.numOfNewBook > 0 ?
                                    <div className="from-group">
                                        <label className="addSellText">The number of NEW book to buy</label>
                                        <br />
                                        <input required className="form-control requiresBottomSpacing" type="number" min={0} max={this.state.book.numOfNewBook} name="numOfNewBook" value={this.state.numOfNewBook} onChange={this.handleNewTransaction} />
                                    </div>
                                    :
                                    <div></div>
                                }
                                {this.state.book.numOfOldBook > 0 ?
                                    <div className="from-group">
                                        <label className="addSellText">The number of OLD book to buy</label>
                                        <br />
                                        <input required className="form-control requiresBottomSpacing" type="number" min={0} max={this.state.book.numOfOldBook} name="numOfOldBook" value={this.state.numOfOldBook} onChange={this.handleNewTransaction} />
                                    </div>
                                    :
                                    <div></div>
                                }
                                <div className="row addBookSubmitButton">
                                    <button type="submit" className="btn btn-primary">Purchase</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
BuyPage.propTypes = {
    createTransaction: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        sellError: state.errors,
        errors: state.errors
    }
}

export default connect(
    mapStateToProps,
    { createTransaction }
)(BuyPage);