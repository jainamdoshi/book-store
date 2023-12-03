import React, { Component } from 'react';
import PayPal from './PayPal';
import { Link } from "react-router-dom";

class PaypalPayment extends Component {
    constructor() {
        super();
        this.state = {
            message: "",
            isConfirm: false,
            total: 0.00,
            itemName: "",
            units: 0
        }
    }

    componentDidMount() {
        this.setState({
            total: this.props.location.state.totalAmount,
            itemName: this.props.location.state.itemName.bookName,
            units: this.props.location.state.units,
        })
    }

    onConfirm = () => {
        if (this.state.total !== 0.00) {
            this.setState({
                isConfirm: true
            });
        }
        else {
            this.setState({
                message: "No item in the checkout currently. Continue with your shopping!!!"
            });
        }
    }


    render() {
        const { total, itemName, units } = this.state
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <h1 className="display-3 mb-4 pb-4">
                            Checkout
                        </h1>
                        {this.state.message.length > 0 && <div key="message" className="alert alert-danger" role="alert">
                            {this.state.message}
                            <Link className="btn btn-warning mx-2" to="/home">Home</Link>
                        </div>}
                        {this.state.isConfirm ? (<PayPal totalAmount={total} itemName={itemName} newSell={this.props.location.state.newSell} bookUpdateRequest={this.props.location.state.bookUpdateRequest} />) :
                            (<div className="Checkout-info">
                                <h3>Item Name: {itemName}</h3>
                                <h4>Number of Units: {units}</h4>
                                <hr />
                                <h4>Total Amount: ${total}</h4>
                                <button type="button" className="btn btn-primary" onClick={this.onConfirm}>Confirm</button>
                            </div>)}

                    </div>
                </div>
            </div>
        );
    }
}

export default PaypalPayment;