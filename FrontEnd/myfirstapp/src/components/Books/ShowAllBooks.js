import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBooks } from "../../actions/bookActions";
import PropTypes from "prop-types";
import "../../Stylesheets/BooksInHome.css";
import { Link } from "react-router-dom";
import Search from "../Search/Search";



class ShowAllBooks extends Component {
    constructor() {
        super();

        this.state = {
            allBooks: []
        };
    }

    componentDidMount() {
        if (!window.location.href.includes("?")) {
            this.props.getBooks();
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ allBooks: nextProps.errors.bookErrors });
    }

    render() {
        return (
            <div>
                <Search address={this.props.address} />
                <br />
                <div className="main">
                    <div className="allBooks">
                        {this.state.allBooks && this.state.allBooks.map(book => (
                            <div className="oneBook">
                                <Link to={`/book/${book.id.username}/${book.id.isbn}`}>
                                    <img className="bookImage" src={book.bookCoverURL} alt={`${book.id.isbn}`} />
                                    <h5 className="display-5 text-center">{book.bookName}</h5>
                                    <h5 className="display-5 text-center">{book.author}</h5>
                                </Link>
                            </div>))}
                    </div>
                </div>
            </div>
        );
    }
}
ShowAllBooks.propTypes = {
    getBooks: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    errors: state.errors
})
export default connect(
    mapStateToProps,
    { getBooks }
)(ShowAllBooks);