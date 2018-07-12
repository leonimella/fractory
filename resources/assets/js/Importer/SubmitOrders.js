import React, { Component } from 'react';
import axios from 'axios';

export default class SubmitOrders extends Component{

    submitList(e) {
        e.preventDefault();
        const url = e.target.getAttribute('action'),
            orders = this.props.orders;

        axios.post(url, orders)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        const orders = this.props.orders;

        if (!orders) {
            return <span></span>;
        }

        return (
            <form
                action={`${window.origin}/api/orders/create`}
                onSubmit={(e) => {this.submitList(e)}}
            >
                <button
                    type="submit"
                    className="btn btn-success"
                    title="Create Orders"
                >
                    Create Orders
                </button>
            </form>
        )
    }
}