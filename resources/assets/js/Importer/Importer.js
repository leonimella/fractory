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
                <header>
                    <h1>CSV Parser</h1>
                    <p>Select a .csv file and hit the <b>Send</b> button. We will parse the file and show the orders contained in the file.</p>
                </header>
                <div className="row justify-content-md-center">
                    <div className="col-md-6">
                        <FileUpload onFileSubmitted={(list, feedback) => {this.setState({ list, feedback })}} />
                    </div>
                </div>
                <div className="row align-items-center">
                    <div className="col-10">
                        <Feedback feedback={this.state.feedback}/>
                    </div>
                    <div className="col-2">
                        <SubmitOrders
                            orders={this.state.list}
                            onOrdersSubmitted={(list, feedback) => {this.setState({ list, feedback })}}
                        />
                    </div>
                </div>
                <List
                    list={this.state.list}
                    feedback={this.state.feedback}
                    onRepair={(inputValue, inputName, tableRow) => {this.handleRepairData(inputValue, inputName, tableRow)}}
                />
            </div>
        )
    }
}

ReactDOM.render(<Importer/>, container);