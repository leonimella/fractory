import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import FileUpload from '../components/FileUpload';
import List from '../components/List';
import SubmitOrders from './SubmitOrders';
import Feedback from '../components/Feedback';

const container = document.getElementById('importer-app');

class Importer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: null,
            feedback: null
        }
    }

    handleRepairData(inputValue, inputName, tableRow) {
        const listPosition = tableRow,
            orderColumns = inputName.split('_'),
            orderColumn = orderColumns[orderColumns.length - 1];
        let list = this.state.list;

        list[listPosition][orderColumn] = inputValue;
        this.setState({ list });
    }

    render() {
        return (
            <div className="container">
                <h1>Select a File to Upload</h1>
                <FileUpload onFileSubmitted={(list, feedback) => {this.setState({ list, feedback })}} />
                <Feedback feedback={this.state.feedback}/>
                <List
                    list={this.state.list}
                    feedback={this.state.feedback}
                    onRepair={(inputValue, inputName, tableRow) => {this.handleRepairData(inputValue, inputName, tableRow)}}
                />
                <SubmitOrders
                    orders={this.state.list}
                    onOrdersSubmitted={(list, feedback) => {this.setState({ list, feedback })}}
                />
            </div>
        )
    }
}

ReactDOM.render(<Importer/>, container);