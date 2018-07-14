import React, { Component } from 'react';
import axios from 'axios';

export default class SubmitOrders extends Component{

    constructor(props) {
        super(props);

        this.state = {
            sendingData: false
        }
    }

    submitList(e) {
        e.preventDefault();
        const url = e.target.getAttribute('action'),
            orders = this.props.orders;

        this.setState({ sendingData: true });
        this.props.onOrdersSubmitted([], {
            status: 'warning',
            message: 'Processing data, please wait'
        });

        axios.post(url, { orders })
            .then((response) => {
                const data = response.data.data,
                    feedback = {
                        status: data.status,
                        message: data.message
                    },
                    list = null;

                this.setState({ sendingData: false });
                this.props.onOrdersSubmitted(list, feedback);
            })
            .catch((error) => {
                const errorData = error.response.data.error,
                    feedback = {
                        status: errorData.status,
                        message: errorData.message
                    },
                    list = errorData.orders;

                this.setState({ sendingData: false });
                this.props.onOrdersSubmitted(list, feedback);
            });
    }

    renderButton() {
        const sending = this.state.sendingData;

        if (sending) {
            return (
                <button
                    type="button"
                    className="btn btn-light"
                    title="Sending..."
                    disabled
                >
                    Sending...
                </button>
            )
        }

        return (
            <button
                type="submit"
                className="btn btn-success"
                title="Create Orders"
            >
                Create Orders
            </button>
        )
    }

    render() {
        const orders = this.props.orders;

        if (!orders) {
            return <span></span>;
        }

        return (
            <form action={`${window.origin}/api/orders/create`} onSubmit={(e) => {this.submitList(e)}}>
                {this.renderButton()}
            </form>
        )
    }
}