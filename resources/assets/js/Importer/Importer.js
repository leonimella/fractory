import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import FileUpload from '../components/FileUpload';

const container = document.getElementById('importer-app');

class Importer extends Component {
    render() {
        return (
            <div className="container">
                <h1>Select a File to Upload</h1>
                <FileUpload />
            </div>
        )
    }
}

ReactDOM.render(<Importer/>, container);