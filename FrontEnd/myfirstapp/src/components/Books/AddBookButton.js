import React from 'react'
import {Link} from "react-router-dom";

const AddBookButton=() => {
    return (
        <React.Fragment>
            <Link to="/addBook"
                  className="btn btn-lg btn-info">
                Add a book
            </Link>
        </React.Fragment>
    )
};
export default AddBookButton;