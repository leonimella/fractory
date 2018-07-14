import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import List from '../components/List';

const container = document.getElementById('orders-index');

class Orders extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: null,
            feedback: null
        };

        this.getOrders = this.getOrders.bind(this);
    }

    getOrders() {
        const url = `${window.origin}/api/orders`;
        axios.get(url)
            .then((response) => {
                this.setState({
                    list: response.data.data.orders,
                    feedback: {
                        status: 'success',
                        message: ''
                    }
                });
            })
            .catch((error) => {
                alert('Ops! Try again later');
                console.log(error);
            });
    }

    render() {
        const list = this.state.list;

        if (list === null) {
            this.getOrders();
        }

        return (
            <div className="container">
                <h1 style={{padding: '20px', textAlign: 'center'}}>Orders in our database</h1>
                <List
                    list={list}
                    feedback={this.state.feedback}
                />
            </div>
        )
    }
}

ReactDOM.render(<Orders/>, container);