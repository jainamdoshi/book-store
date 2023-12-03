import React, { Component } from 'react'
import { connect } from 'react-redux';
import {
    rejectPendingTransaction,
    approvePendingTransaction,
    requestRefundTransaction,
    getAllTransactions,
    getTransactionsFor,
    getOldestTransactionsFirst,
    getLatestTransactionsFirst,
    getAllSold,
    getAllBought
} from '../../actions/transactionActions';
import PropTypes from "prop-types";
import "../../Stylesheets/TransactionPage.css";
import jwt_decode from "jwt-decode";

class transactionPage extends Component {
    constructor() {
        super();

        this.state = {
            allTransactions: [],
            displayOption: "All",
            isUserAdmin: false,
            message: "",
            currentDateTime: new Date()
        };

        this.handleDisplayOptions.bind(this);
    }

    tick() {
        this.setState({ date: new Date() });
    }

    componentDidMount() {
        const token = localStorage.getItem("jwtToken");
        if (token) {
            const decoded_token = jwt_decode(token);
            if (decoded_token["userRole"] == "ADMIN") {
                fetch("https://cors-everywhere.herokuapp.com/http://transactionmicroservice-env.eba-b3hmepif.ap-southeast-2.elasticbeanstalk.com/api/transactions/all").then((response) => response.json()).then(result => { this.setState({ allTransactions: result }) });
                this.setState({
                    isUserAdmin: true,
                    displayOption: "Oldest"
                });
            } else {
                fetch(`https://cors-everywhere.herokuapp.com/http://transactionmicroservice-env.eba-b3hmepif.ap-southeast-2.elasticbeanstalk.com/api/transactions/allonlyuser/${decoded_token["username"]}`).then((response) => response.json()).then(result => { this.setState({ allTransactions: result }) });
                this.props.getTransactionsFor(decoded_token["username"]);
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        const data = nextProps.errors.bookErrors;
        this.setState({ message: nextProps.errors.message ? nextProps.errors.message : "" });
        this.setState({ allTransactions: data });
    }


    handleDisplayOptions = (e) => {
        e.preventDefault()
        const token = localStorage.getItem("jwtToken");

        if (token) {
            const decoded_token = jwt_decode(token);
            if (e.target.value === "Latest") {
                // Latest transactions first
                this.setState({
                    displayOption: "Latest"
                });
                this.props.getLatestTransactionsFirst(decoded_token["username"], this.state.isUserAdmin)
            }
            else if (e.target.value === "Oldest") {
                // Oldest transactions first
                this.setState({
                    displayOption: "Oldest"
                });
                this.props.getOldestTransactionsFirst(decoded_token["username"], this.state.isUserAdmin)
            }
            else if (e.target.value === "All") {
                this.setState({
                    displayOption: "All"
                });
                this.props.getTransactionsFor(decoded_token["username"])
            }
            else if (e.target.value === "Bought") {
                this.setState({
                    displayOption: "Bought"
                });
                this.props.getAllBought(decoded_token["username"])
            }
            else {
                this.setState({
                    displayOption: "Sold"
                });
                this.props.getAllSold(decoded_token["username"])
            }
        }
    }

    render() {
        return (
            <div>
                <div className="container ml-1">
                    {this.state.message.length > 0 && (<div className="alert alert-success text-center" role="alert">
                        {this.state.message}
                    </div>)}

                    <div className="row mt-5 mb-2 h-100">
                        <div className="col-md-5 ml-1">
                            <div className="row">
                                <h1 className="display-4">Transaction History</h1>
                            </div>
                        </div>

                        <div className="col-md-6 theRadioButtons">
                            {/* Radio buttons for differnt display options*/}
                            {
                                this.state.isUserAdmin === false ?
                                    <div class="form-check theRadioButtons">
                                        <input class="form-check-input ml-3" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked={this.state.displayOption === "All"} value="All" onClick={this.handleDisplayOptions} />
                                        <label class="form-check-label radioText" for="flexRadioDefault2">All </label>

                                        <input class="form-check-input ml-3" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked={this.state.displayOption === "Bought"} value="Bought" onClick={this.handleDisplayOptions} />
                                        <label class="form-check-label radioText" for="flexRadioDefault2">Bought </label>

                                        <input class="form-check-input ml-3" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked={this.state.displayOption === "Sold"} value="Sold" onClick={this.handleDisplayOptions} />
                                        <label class="form-check-label radioText" for="flexRadioDefault2">Sold </label>

                                        <input class="form-check-input ml-3" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked={this.state.displayOption === "Oldest"} value="Oldest" onClick={this.handleDisplayOptions} />
                                        <label class="form-check-label radioText" for="flexRadioDefault2">Oldest First </label>

                                        <input class="form-check-input ml-3" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked={this.state.displayOption === "Latest"} value="Latest" onClick={this.handleDisplayOptions} />
                                        <label class="form-check-label radioText" for="flexRadioDefault1">Latest First</label>
                                    </div>
                                    :
                                    <div class="form-check theRadioButtons">
                                        <input class="form-check-input ml-3" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked={this.state.displayOption === "Oldest"} value="Oldest" onClick={this.handleDisplayOptions} />
                                        <label class="form-check-label radioText" for="flexRadioDefault2">Oldest First </label>

                                        <input class="form-check-input ml-3" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked={this.state.displayOption === "Latest"} value="Latest" onClick={this.handleDisplayOptions} />
                                        <label class="form-check-label radioText" for="flexRadioDefault1">Latest First</label>
                                    </div>
                            }
                        </div>
                    </div>

                    {/* Transaction history table */}
                    <table class="table">
                        <thead class="thead-dark">
                            <tr>
                                <th className="text-center" scope="col">Transaction Date</th>
                                <th className="text-center" scope="col">ISBN</th>
                                <th className="text-center" scope="col">Buyer Username</th>
                                <th className="text-center" scope="col">Seller Username</th>
                                <th className="text-center" scope="col">Price</th>
                                <th className="text-center" scope="col"># New Books</th>
                                <th className="text-center" scope="col"># Old Books</th>
                                <th className="text-center" scope="col">State</th>
                                <th className="text-center" scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.allTransactions && this.state.allTransactions.map(transaction => (<tr key={transaction}>

                                <td className="text-center">{transaction.transactionDate}</td>
                                <td className="text-center">{transaction.isbn}</td>
                                <td className="text-center">{transaction.buyerUsername}</td>
                                <td className="text-center">{transaction.username}</td>
                                <td className="text-center">{transaction.totalPrice}</td>
                                <td className="text-center">{transaction.numOfNewBook > 0 ? transaction.numOfNewBook : "-"}</td>
                                <td className="text-center">{transaction.numOfOldBook > 0 ? transaction.numOfOldBook : "-"}</td>
                                <td className="text-center">{transaction.transactionState}</td>
                                <td className="text-center">{this.state.isUserAdmin ?
                                    <div>
                                        {transaction.transactionState === "PENDING" &&
                                            <div>
                                                <input className="btn btn-primary" type="submit" value="Accept"
                                                    onClick={() => this.props.approvePendingTransaction(transaction, this.props.history)} />
                                                &nbsp;
                                                <input className="btn btn-primary" type="submit" value="Reject"
                                                    onClick={() => this.props.rejectPendingTransaction(transaction, this.props.history)} />
                                            </div>
                                        }
                                    </div>
                                    :
                                    <div>
                                        {transaction.transactionState === "APPROVED" && (((this.state.currentDateTime.getTime() - new Date(transaction.transactionDate).getTime()) / (24 * 60 * 60 * 1000)) <= 2) &&
                                            <div>
                                                <input className="btn btn-primary" type="submit" value="Refund"
                                                    onClick={() => this.props.requestRefundTransaction(transaction, this.props.history)} />
                                            </div>
                                        }
                                    </div>}
                                </td>
                            </tr>))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
transactionPage.protoType = {
    getTransactions: PropTypes.func.isRequired,
    getTransactionsFor: PropTypes.func.isRequired,
    getLatestTransactionsFirst: PropTypes.func.isRequired,
    getOldestTransactionsFirst: PropTypes.func.isRequired,
    approvePendingTransaction: PropTypes.func.isRequired,
    rejectPendingTransaction: PropTypes.func.isRequired,
    requestRefundTransaction: PropTypes.func.isRequired,
    getAllSold: PropTypes.func.isRequired,
    getAllBought: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    errors: state.errors
})
export default connect(
    mapStateToProps,
    {
        getAllTransactions, getTransactionsFor, getLatestTransactionsFirst, getOldestTransactionsFirst,
        requestRefundTransaction, rejectPendingTransaction, approvePendingTransaction, getAllSold, getAllBought
    }
)(transactionPage);