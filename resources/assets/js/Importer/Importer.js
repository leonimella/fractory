import React, { Component } from 'react';
import ReactDOM from 'react-dom';
const container = document.getElementById('importer-app');

class Importer extends Component {
    render() {
        return (
            <h1>Importador</h1>
        )
    }
}

ReactDOM.render(<Importer/>, container);