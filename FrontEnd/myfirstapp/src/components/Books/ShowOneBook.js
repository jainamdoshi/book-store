import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBook } from "../../actions/bookActions";
import PropTypes from "prop-types";
import "../../Stylesheets/Book.css";
import jwt_decode from "jwt-decode";
import Search from "../Search/Search";

class ShowOneBook extends Component {
    constructor() {
        super();

        this.state = {
            isUserAdmin: false,
            book: "",
            id: "",
            message: ""
        };
    }

    componentDidMount() {
        const token = localStorage.getItem("jwtToken");
        if (token) {
            const decoded_token = jwt_decode(token);
            if (decoded_token["userRole"] === "ADMIN") {
                this.setState({ isUserAdmin: true });
            }
        }
        var id = this.props.history.location.pathname.substring(6);
        this.setState({ id: id });
        fetch(`https://cors-everywhere.herokuapp.com/http://bookmicroservice-env.eba-vvi3x9cs.ap-southeast-2.elasticbeanstalk.com/api/books/${id}`).then((response) => response.json()).then(result => { this.setState({ book: result }) });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ message: nextProps.errors.message ? nextProps.errors.message : "" });
    }

    render() {
        return (
            <div>
                <div>
                    <Search address={this.props.history} />
                </div>
                {this.state.message.length > 0 && (<div className="alert alert-success text-center" role="alert">
                    {this.state.message}
                </div>)}
                <br />
                <div className="m-4 my-3">
                    <h1 className="display-4 text-center">{this.state.book.bookName}</h1>
                </div>
                {this.state.isUserAdmin && (
                    <input className="btn btn-primary mx-4" type="submit" value="Edit"
                        onClick={() => this.props.history.push(`/editbook/${this.state.book.username}/${this.state.book.isbn}`)} />)}
                <div className="center-image" >
                    <img src={this.state.book.bookCoverURL} alt={`${this.state.book.id}`} />
                </div>
                <div className="display-4 text-center">
                    {this.state.book.numOfNewBook > 0 ?
                        <div>
                            <h3>New book price: ${this.state.book.newBookPrice}</h3>
                            <h3>The number of NEW books available: {this.state.book.numOfNewBook}</h3>
                        </div>
                        :
                        <div></div>

                    }
                    {this.state.book.numOfOldBook > 0 ?
                        <div>
                            <br />
                            <h3>Old book price: ${this.state.book.oldBookPrice}</h3>
                            <h3>The number of OLD books available: {this.state.book.numOfOldBook}</h3>
                        </div>
                        :
                        <div></div>
                    }
                    {(this.state.book.newBookPrice > 0 || this.state.book.oldBookPrice > 0) && (this.state.book.numOfNewBook > 0 || this.state.book.numOfOldBook > 0) ?
                        <input className="btn btn-primary" type="submit" value="Buy"
                            onClick={() => this.props.history.push(`/buy/${this.state.book.username}/${this.state.book.isbn}`)} />
                        :
                        <div></div>
                    }
                    {this.state.book.numOfNewBook === 0 && this.state.book.oldBookPrice === 0 && this.state.book.numOfOldBook > 0 ?
                        <input className="btn btn-primary" type="submit" value="Share"
                            onClick={() => this.props.history.push(`/share/${this.state.book.username}/${this.state.book.isbn}`)} />
                        :
                        <div></div>
                    }
                    {this.state.book.numOfNewBook === 0 && this.state.book.numOfOldBook === 0 ?
                        <input className="btn btn-danger" type="submit" value="SOLD" />
                        :
                        <div></div>
                    }
                    <div className="d-flex flex-column mt-3">
                        <hr />
                        <table className="col-md-5 text-center mb-4" align="center">
                            <thead>
                                <tr>
                                    <th scope="col"><h3>Category</h3></th>
                                    <th scope="col"><h3>Information</h3></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Book name</td>
                                    <td>{this.state.book.bookName}</td>
                                </tr>
                                <tr>
                                    <td>Author</td>
                                    <td>{this.state.book.author}</td>
                                </tr>
                                <tr>
                                    <td>ISBN</td>
                                    <td>{this.state.book.isbn}</td>
                                </tr>
                                <tr>
                                    <td>Category</td>
                                    <td>{this.state.book.category}</td>
                                </tr>
                                <tr>
                                    <td>Publication Date</td>
                                    <td>{this.state.book.releaseDate}</td>
                                </tr>
                                <tr>
                                    <td>Pages</td>
                                    <td>{this.state.book.page}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="display-5  pb-4">

                </div>
            </div>
        );
    }
}
ShowOneBook.propTypes = {
    getBook: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    errors: state.errors
})
export default connect(
    mapStateToProps,
    { getBook }
)(ShowOneBook);