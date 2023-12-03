import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { createBook } from "../../actions/bookActions";
import "../../Stylesheets/AddBook.css";
import jwt_decode from "jwt-decode";
import { getBook } from "../../actions/bookActions";
import { editBook } from "../../actions/bookActions";
import Search from '../Search/Search';


class EditBook extends Component {

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
            unitPrice: "",
            numOfNewBook: "",
            numOfOldBook: "",
            errors: {},
            message: "",
            alertVisible: false,
            originalBook: ""
        };

        this.handleNewBook = this.handleNewBook.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Common statement to change state based on the input
    // target.name is the name given to each of the input fields.
    // target.value is what is eneterd by the user
    handleNewBook = (e) => {
        console.log(e)
        this.setState({ [e.target.name]: e.target.value })
    };

    componentDidMount() {
        const token = localStorage.getItem("jwtToken");
        if (token) {
            const decoded_token = jwt_decode(token);
            if (decoded_token["userRole"] === "ADMIN") {
                this.setState({ isUserAdmin: true });
            }
        }

        var isbn = this.props.history.location.pathname.substring(10);
        this.setState({ isbn: isbn });
        this.props.getBook(isbn, this.props.history);
    }

    // Handling errors upon submission
    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        if (nextProps.errors) {
            this.setState({ message: nextProps.message ? nextProps.message : "" });
        }

        if (nextProps.bookInfo) {
            this.setState({
                username: nextProps.bookInfo.username,
                bookName: nextProps.bookInfo.bookName,
                author: nextProps.bookInfo.author,
                isbn: nextProps.bookInfo.isbn,
                category: nextProps.bookInfo.category,
                releaseDate: nextProps.bookInfo.releaseDate,
                page: nextProps.bookInfo.page,
                bookCoverURL: nextProps.bookInfo.bookCoverURL,
                unitPrice: nextProps.bookInfo.unitPrice,
                numOfNewBook: nextProps.bookInfo.numOfNewBook,
                numOfOldBook: nextProps.bookInfo.numOfOldBook,
                bookErrors: {},
                alertVisible: true,
                originalBook: {}
            });
        }
        // this.setState({ originalBook: nextProps.bookInfo ? nextProps.bookInfo : "" });
        if (nextProps.bookErrors) {
            this.setState({
                errors: nextProps.bookErrors
            });
            // this.setState({
            //     bookName: "",
            //     author: "",
            //     isbn: "",
            //     category: "",
            //     releaseDate: "",
            //     page: "",
            //     bookCoverURL: "",
            //     unitPrice: "",
            //     numOfNewBook: "",
            //     numOfOldBook: "",
            //     bookErrors: {},
            //     alertVisible: true,
            //     originalBook: {}
            // });

            // setTimeout(this.handleAlert, 5000);
        }
    }

    // Handling the submit button
    handleSubmit = (e) => {
        // Preventing the default action of the form
        e.preventDefault()
        // Creating a new book with the data entered
        const editedBook = {
            bookName: this.state.bookName,
            author: this.state.author,
            id: {
                isbn: this.state.isbn,
                username: this.state.username
            },
            category: this.state.category,
            releaseDate: this.state.releaseDate,
            page: this.state.page,
            bookCoverURL: this.state.bookCoverURL,
            numOfNewBook: this.state.numOfNewBook,
            numOfOldBook: parseInt(this.state.numOfOldBook),
        }

        // Creating a new book object in the back end
        this.props.editBook(editedBook, this.props.history);

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
        console.log("this is inside edit book render: ", this.state.errors)
        return (

            <div className="container">
                <Search address={this.props.history} />

                {/* Displaying message for successful submission */}
                <div className="row mt-3 mb-3">
                    <div className="col-md-6 offset-md-3">
                        <div>{this.state.alertVisible === true ?
                            <div class="alert alert-success alert-dismissible fade show" role="alert">
                                <strong>Notification:</strong> Book successfully added!
                                <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.handleAlert}>
                                    <div aria-hidden="true">&times;</div>
                                </button>
                            </div>
                            : <div></div>}
                        </div>
                    </div>
                </div>
                {Object.keys(this.state.errors).map(key => {
                    return (<div key={key} className="alert alert-danger text-center" role="alert">
                        {this.state.errors[key]}
                    </div>)
                }
                )}

                {/* Form to add book */}
                <div className="row mt-3 mb-3">
                    <div className="col-md-7 offset-md-3 addBookFormSection">
                        {/* Form heading */}
                        <h1>Edit Book</h1>
                        {/* Input fields for the form */}
                        <form onSubmit={this.handleSubmit}>
                            <div className="from-group">
                                <label className="addBookText">Book Name:</label>
                                <input required className="form-control requiresBottomSpacing" type="text" name="bookName" placeholder="Book Name" value={this.state.bookName} onChange={this.handleNewBook} />
                            </div>

                            <div className="from-group">
                                <label className="addBookText">Author:</label>
                                <input required className="form-control requiresBottomSpacing" type="text" name="author" placeholder="Author" value={this.state.author} onChange={this.handleNewBook} />
                            </div>

                            <div className="from-group">
                                <label className="addBookText">ISBN:</label>
                                <br />
                                {this.state.isbn}
                                <br />

                            </div>

                            <div className="from-group">
                                <label className="addBookText">Category:</label>
                                <input required className="form-control requiresBottomSpacing" type="text" name="category" placeholder="category" value={this.state.category} onChange={this.handleNewBook} />

                            </div>

                            <div className="from-group">
                                <label className="addBookText">Release Date:</label>
                                <input required className="form-control" type="date" name="releaseDate" value={this.state.releaseDate} onChange={this.handleNewBook} />

                            </div>

                            <div className="from-group">
                                <label className="addBookText">Pages:</label>
                                <input required className="form-control" type="number" name="page" placeholder="Pages" value={this.state.page} onChange={this.handleNewBook} />

                            </div>

                            <div className="from-group">
                                <label className="addBookText">Book Cover URL:</label>
                                <input required className="form-control requiresBottomSpacing" type="url" name="bookCoverURL" placeholder="Book Cover URL" value={this.state.bookCoverURL} onChange={this.handleNewBook} />

                            </div>

                            <div className="from-group">
                                <label className="addBookText">Number of New Books</label>
                                <input required className="form-control" type="number" name="numOfNewBook" value={this.state.numOfNewBook} onChange={this.handleNewBook} />

                            </div>

                            <div className="from-group">
                                <label className="addBookText">Number of Old Books</label>
                                <input required className="form-control" type="number" name="numOfOldBook" value={this.state.numOfOldBook} onChange={this.handleNewBook} />
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
EditBook.propTypes = {
    createBook: PropTypes.func.isRequired,
    getBook: PropTypes.func.isRequired,
    editBook: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    console.log(state.errors.bookinformationErrors)
    return {
        bookInfo: state.book.bookInfo,
        bookErrors: state.errors.bookinformationErrors
    }
}

export default connect(
    mapStateToProps,
    { createBook, getBook, editBook }
)(EditBook);
