import React from 'react'
import {Link} from "react-router-dom";

const ReviewUsersButton=() => {
    return (
        <React.Fragment>
            <Link to="/reviewAccounts"
                  className="btn btn-lg btn-info ml-3">
                Review User Accounts
            </Link>
        </React.Fragment>
    )
};
export default ReviewUsersButton;