import React, {Component} from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import jwt_decode from "jwt-decode";
import "../../Stylesheets/Book.css";
import {createBook} from "../../actions/bookActions";

class SellPage extends Component {

    // Maintain current data in the state
    constructor() {
        super();

        this.state = {
            username: "",
            bookName: "",
            author: "",
            isbn: "",
            category: "",
            releaseDate: "",
            page: "",
            bookCoverURL: "",
            newBookPrice: 0,
            oldBookPrice: 0,
            numOfNewBook: 0,
            numOfOldBook: 0,
            bookErrors: {},
            message: "",
            alertVisible: false,
            isUserAdmin: false,
            isUserPublic: false,
        };

        this.handleNewBook = this.handleNewBook.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Common statement to change state based on the input
    // target.name is the name given to each of the input fields.
    // target.value is what is eneterd by the user
    handleNewBook = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    };

    // Handling errors upon submission
    componentWillReceiveProps(nextProps) {
        this.setState({ message: nextProps.numBookError.message ? nextProps.numBookError.message : "" });

        if (nextProps.numBookError === "") {
            this.setState({
                username: "",
                bookName: "",
                author: "",
                isbn: "",
                category: "",
                releaseDate: "",
                page: "",
                bookCoverURL: "",
                newBookPrice: "",
                oldBookPrice: "",
                numOfNewBook: "",
                numOfOldBook: "",
                bookErrors: {},
                alertVisible: true
            });

            setTimeout(this.handleAlert, 5000);
        }
    }

    componentDidMount() {
        const token = localStorage.getItem("jwtToken");
        if (token) {
            const decoded_token = jwt_decode(token);
            if (decoded_token["userRole"] === "ADMIN") {
                this.setState({isUserAdmin: true});
            }
            else if (decoded_token["userRole"] === 'PUBLIC') {
                this.setState({isUserPublic: true});
                this.setState({username: decoded_token.username})
            }
            else {
                this.setState({ username: decoded_token.username });
            }
        }
    }

    // Handling the submit button
    handleSubmit = (e) => {
        // Preventing the default action of the form
        e.preventDefault()

        // Creating a new book with the data entered
        const newBook = {
            username: this.state.username,
            bookName: this.state.bookName,
            author: this.state.author,
            isbn: this.state.isbn,
            category: this.state.category,
            releaseDate: this.state.releaseDate,
            page: this.state.page,
            bookCoverURL: this.state.bookCoverURL,
            newBookPrice: this.state.newBookPrice,
            oldBookPrice: this.state.oldBookPrice,
            numOfNewBook: this.state.numOfNewBook,
            numOfOldBook: this.state.numOfOldBook,
        }

        // Creating a new book object in the back end
        this.props.createBook(newBook, this.props.history);

        this.setState({
            alertVisible: false
        })

    }

    handleAlert = () => {
        this.setState({
            alertVisible: !this.state.alertVisible
        })
    }


    render() {
        return (

            <div className="container">
                <div className="row">

                    {/* Search bar */}
                    <div className="col-md-6 offset-md-3 px-0">
                        <form>
                            <div className="row">
                                {this.state.message.length > 0 && (<div className="alert alert-success text-center" role="alert">
                                    {this.state.message}
                                </div>)}
                                <div className="col-md-10">
                                    <div className="form-outline">
                                        <input className="form-control mr-sm-2 w-100" type="search" placeholder="Search" aria-label="Search"></input>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <button id="search-button" type="submit" className="btn btn-primary w-100"> <i className="fas fa-search searchIcon"></i></button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>


                {/* Displaying message for successful submission */}
                <div className="row mt-3 mb-3">
                    <div className="col-md-6 offset-md-3">
                        <span>{this.state.alertVisible === true ?
                            <div class="alert alert-success alert-dismissible fade show" role="alert">
                                <strong>Notification:</strong> Book successfully added!
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close" onClick={this.handleAlert}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            : <div></div>}
                        </span>
                    </div>
                </div>


                {/* Form to add book */}
                <div className="row mt-3 mb-3">
                    <div className="col-md-6 offset-md-3 addBookFormSection">
                        {/* Form heading */}
                        <h1>Sell a Book</h1>

                        {/* Input fields for the form */}
                        <form onSubmit={this.handleSubmit}>

                            {/*If user is admin, then username is required  */}
                            {this.state.isUserAdmin === true ?
                                <div>
                                    <label className="addBookText">Username:</label>
                                    <input required className="form-control" type="email" name="username" placeholder="Username" value={this.state.username} onChange={this.handleNewBook} />
                                    <small id="emailHelp" class="form-text text-muted mb-2  ml-2">Which user are you adding this book for?</small>
                                </div>
                                :
                                <div></div>
                            }



                            <div className="from-group">
                                <label className="addBookText">Book Name:</label>
                                <input required className="form-control requiresBottomSpacing" type="text" name="bookName" placeholder="Book Name" value={this.state.bookName} onChange={this.handleNewBook} />
                            </div>

                            <div className="from-group">
                                <label className="addBookText">Author:</label>
                                <input required className="form-control requiresBottomSpacing" type="text" name="author" placeholder="Author's Name" value={this.state.author} onChange={this.handleNewBook} />
                            </div>

                            <div className="from-group">
                                <label className="addBookText">ISBN:</label>
                                <input required className="form-control" type="number" name="isbn" placeholder="ISBN" value={this.state.isbn} onChange={this.handleNewBook} />
                                <span className="text-danger addBookErrorMessage"><small> {this.props.numBookError ? this.props.numBookError.isbn : null} </small></span>
                            </div>

                            <div className="from-group">
                                <label className="addBookText">Category:</label>
                                <input required className="form-control requiresBottomSpacing" type="text" name="category" placeholder="Category (Genre)" value={this.state.category} onChange={this.handleNewBook} />
                            </div>

                            <div className="from-group">
                                <label className="addBookText">Release Date:</label>
                                <input required className="form-control" type="date" name="releaseDate" placeholder="Date of Release" value={this.state.releaseDate} onChange={this.handleNewBook} />
                                <span className="text-danger addBookErrorMessage"><small> {this.props.numBookError ? this.props.numBookError.releaseDate : null} </small></span>
                            </div>

                            <div className="from-group">
                                <label className="addBookText">Pages:</label>
                                <input required className="form-control" type="number" name="page" placeholder="Number of pages" value={this.state.page} onChange={this.handleNewBook} />
                                <span className="text-danger addBookErrorMessage"><small> {this.props.numBookError ? this.props.numBookError.page : null} </small></span>
                            </div>

                            <div className="from-group">
                                <label className="addBookText">Book Cover URL:</label>
                                <input required className="form-control requiresBottomSpacing" type="url" name="bookCoverURL" placeholder="URL" value={this.state.bookCoverURL} onChange={this.handleNewBook} />
                            </div>

                            {/*If user is public, Only OLD book can be sold  */}
                            {this.state.isUserPublic === false ?
                                <div>
                                    <div className="from-group">
                                        <label className="addBookText">A New Book Price</label>
                                        <input required className="form-control requiresBottomSpacing" type="number" name="newBookPrice" placeholder="newBookPrice" value={this.state.newBookPrice} onChange={this.handleNewBook} />
                                    </div>
                                    <div className="from-group">
                                        <label className="addBookText">Number of New Books</label>
                                        <input required className="form-control" type="number" name="numOfNewBook" placeholder="Number of New Books" value={this.state.numOfNewBook} onChange={this.handleNewBook} />
                                        <span className="text-danger addBookErrorMessage"><small> {this.props.numBookError ? this.props.numBookError.numOfNewBook : null} </small></span>
                                    </div>
                                </div>
                                :
                                <div></div>
                            }
                            <div className="from-group">
                                <label className="addBookText">A OLD Book Price</label>
                                <input required className="form-control requiresBottomSpacing" type="number" name="oldBookPrice" placeholder="oldBookPrice" value={this.state.oldBookPrice} onChange={this.handleNewBook} />
                            </div>

                            <div className="from-group">
                                <label className="addBookText">Number of Old Books</label>
                                <input required className="form-control" type="number" name="numOfOldBook" placeholder="Number of Old Books" value={this.state.numOfOldBook} onChange={this.handleNewBook} />
                                <span className="text-danger addBookErrorMessage"><small> {this.props.numBookError ? this.props.numBookError.numOfOldBook : null} </small></span>
                            </div>

                            {/* Submit button */}
                            <div className="row addBookSubmitButton">
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
SellPage.propTypes = {
    createBook: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        numBookError: state.errors.bookErrors
    }
}

export default connect(
    mapStateToProps,
    { createBook }
)(SellPage);