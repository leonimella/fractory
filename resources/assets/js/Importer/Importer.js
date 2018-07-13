import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import FileUpload from '../components/FileUpload';
import List from '../components/List';
import SubmitOrders from './SubmitOrders';

const container = document.getElementById('importer-app');

class Importer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: null,
            feedback: null
        }
    }

    render() {
        return (
            <div className="container">
                <h1>Select a File to Upload</h1>
                <FileUpload onFileSubmitted={(list, feedback) => {this.setState({ list, feedback })}} />
                <List list={this.state.list}/>
                <SubmitOrders
                    orders={this.state.list}
                    onOrdersSubmitted={(list, feedback) => {this.setState({ list, feedback })}}
                />
            </div>
        )
    }
}

ReactDOM.render(<Importer/>, container);