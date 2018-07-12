import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import FileUpload from '../components/FileUpload';
import OrdersList from '../components/OrdersList';

const container = document.getElementById('importer-app');

class Importer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: null
        }
    }

    render() {
        return (
            <div className="container">
                <h1>Select a File to Upload</h1>
                <FileUpload onFileSubmitted={(list) => {this.setState({ list })}} />
                <OrdersList list={this.state.list}/>
            </div>
        )
    }
}

ReactDOM.render(<Importer/>, container);