import React, { Component } from 'react';
import axios from 'axios';

export default class FileUpload extends Component {
    constructor(props) {
        super(props);

        this.state = {
            file: null
        };

        this.sendFile = this.sendFile.bind(this);
    }

    getFileName() {
        const file = this.state.file;

        if (!file) {
            return 'Choose File';
        }
        return file.name;
    }

    setFile(input) {
        const file = input.files[0];
        this.setState({ file });
    }

    sendFile(e) {
        e.preventDefault();
        const url = e.target.getAttribute('action'),
            file = this.state.file,
            data = new FormData(),
            config = { headers: { 'Content-Type': 'multipart/form-data' } };

        data.append('file', file, file.name);

        axios.post(url, data, config)
            .then((response) => {
                const data = response.data.data,
                    feedback = {
                        status: data.status,
                        message: data.message
                    },
                    list = data.orders;

                this.props.onFileSubmitted(list, feedback);
            })
            .catch((error) => {
                const errorData = error.response.data.error,
                    feedback = {
                        status: errorData.status,
                        message: errorData.message
                    },
                    list = [];

                this.props.onFileSubmitted(list, feedback);
            });
    }

    render() {
        return (
            <form
                action={`${window.origin}/api/importer/csv`}
                onSubmit={(e) => {this.sendFile(e)}}
            >
                <div className="input-group mb-3">
                    <div className="custom-file">
                        <input
                            type="file"
                            className="custom-file-input"
                            id="file"
                            name="file"
                            required
                            onChange={ (e) => {this.setFile(e.target)} }
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