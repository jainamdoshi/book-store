import React from 'react'
import {link, Link} from "react-router-dom";

const TransactionHistoryButton=() => {
    return (
        <React.Fragment>
            <Link to="/transactionhistory"
                  className="btn btn-lg btn-info">
                Transaction History
            </Link>
        </React.Fragment>
    )
};
export default TransactionHistoryButton;