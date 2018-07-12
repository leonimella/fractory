import React, { Component } from 'react';
import axios from 'axios';

export default class FileUpload extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fileName: null,
        }
    }

    getFileName() {
        const fileName = this.state.fileName;

        if (!fileName) {
            return 'Choose File';
        }

        return fileName
    }

    setFileName(input) {
        const inputValue = input.value,
            filePath = inputValue.split('\\'),
            fileName = filePath[filePath.length -1];

        this.setState({ fileName });
    }

    sendFile() {
        // WIP
    }

    render() {
        return (
            <form>
                <div className="input-group mb-3">
                    <div className="custom-file">
                        <input
                            type="file"
                            className="custom-file-input"
                            id="file"
                            name="file"
                            onChange={ (e) => {this.setFileName(e.target)} }
                        />
                        <label className="custom-file-label" htmlFor="file">{ this.getFileName() }</label>
                    </div>
                    <div className="input-group-append">
                        <button type="submit" className="btn btn-dark" title="Send file">Send</button>
                    </div>
                </div>
            </form>
        )
    }
}