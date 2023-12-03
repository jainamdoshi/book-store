import React, {Component} from 'react';
import { searchBook } from "../../actions/bookActions";
import PropTypes from "prop-types";
import {connect} from "react-redux";

class Search extends Component {
    constructor() {
        super();

        this.state = {
            keyword: "",
            category: "Title"
        };

        this.handleSearchedBook = this.handleSearchedBook.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSearchedBook = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    };

    handleSubmit = (e) => {
        e.preventDefault()

        const Search = {
            keyword: this.state.keyword.toLowerCase(),
            category: this.state.category.toLowerCase()
        }
        this.props.searchBook(Search, this.props.address);
    }

    render() {
        return (
            <div>
                <div className="col-md-6 offset-md-3 px-0">
                    <form onSubmit={this.handleSubmit}>
                        <div className="row">
                            <select className="form-select bg-primary text-white p-1" name="category" value={this.state.category} onChange={this.handleSearchedBook}>
                                <option value="Title" selected>Title</option>
                                <option value="ISBN" >ISBN</option>
                                <option value="Author" >Author</option>
                                <option value="Category" >Category</option>
                            </select>
                            <div className="col-md-8">
                                <div className="form-outline">
                                    {this.state.category === "ISBN" &&
                                    <input className="form-control mr-sm-2 w-80" type="number" placeholder="Search"
                                           aria-label="Search" name="keyword" value={this.state.keyword}
                                           onChange={this.handleSearchedBook}/>
                                    }
                                    {!(this.state.category === "ISBN") &&
                                    <input className="form-control mr-sm-2 w-80" type="search" placeholder="Search"
                                           aria-label="Search" name="keyword" value={this.state.keyword}
                                           onChange={this.handleSearchedBook}/>
                                    }
                                </div>
                            </div>
                            <div className="col-md-2">
                                <button id="search-button" type="submit" className="btn btn-primary w-100"> <i className="fas fa-search searchIcon"></i></button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
Search.propTypes = {
    searchBook: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        numBookError: state.errors.bookErrors
    }
}

export default connect(
    mapStateToProps,
    { searchBook }
)(Search);