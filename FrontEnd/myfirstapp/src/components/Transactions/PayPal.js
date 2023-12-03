import React, { Component, createRef } from 'react';
import { Redirect } from 'react-router';
import { createTransaction } from '../../actions/transactionActions';
import PropTypes from "prop-types";
import { connect } from "react-redux";

class PayPal extends Component {
    constructor(props) {
        super(props);
        this.paypal = createRef();
        this.state = {
            message: "",
            redirect: false,
            className: "alert"
        }

    }

    componentDidMount() {
        window.paypal
            .Buttons({
                createOrder: (data, actions, err) => {
                    return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [
                            {
                                description: "Purchased Item: " + this.props.itemName,
                                amount: {
                                    currency_code: "AUD",
                                    value: this.props.totalAmount
                                }
                            }
                        ]
                    })
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();
                    this.setState({
                        message: "Payment is Successfull!! Thanks for placing an order.",
                        className: "alert alert-success"
                    });
                    setTimeout(() => this.setState({ redirect: true }), 5000);
                    this.props.createTransaction(this.props.newSell, this.props.bookUpdateRequest, this.props.history, true);
                },
                onError: (err) => {
                    this.setState({
                        message: "Payment is Unsuccessfull! Please try again after sometime.",
                        className: "alert alert-danger"
                    });
                }
            }).render(this.paypal.current);
    }


    render() {
        if (this.state.redirect) {
            return (<Redirect to="/home" />)
        }
        else {
            return (
                <div>
                    {this.state.message.length > 0 && <div key="message" className={this.state.className} role="alert">
                        {this.state.message}
                    </div>}
                    <div id="paypal-button-container" ref={this.paypal}></div>
                </div>
            );
        }
    }
}

PayPal.propTypes = {
    createTransaction: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        shareError: state.errors,
        errors: state.errors
    }
}

export default connect(
    mapStateToProps,
    { createTransaction }
)(PayPal);