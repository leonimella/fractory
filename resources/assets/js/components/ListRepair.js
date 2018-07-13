import React, { Component } from 'react';

export default class ListRepair extends Component {

    constructor(props) {
        super(props);

        this.state = {
            inputValue: null
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        const key = this.props.keyProps,
            propertyKey = this.props.propertyKey;

        if (key && propertyKey && this.state.inputValue === null) {
            this.handleInitialValues(key, propertyKey);
        }
    }

    handleInitialValues(key, propertyKey) {
        let inputValue = key[propertyKey];

        if (typeof inputValue === 'boolean') {
            inputValue = inputValue == 'true' ? 'Yes' : 'No';
        } else if (!inputValue) {
            inputValue = '';
        }

        this.setState({ inputValue });
    }

    handleChange(e) {
        const inputValue = e.target.value,
            inputName = e.target.getAttribute('name'),
            row = this.props.row;

        this.setState({ inputValue });
        this.props.onInputRepair(inputValue, inputName, row);
    }

    render() {
        const row = this.props.row,
            propertyKey = this.props.propertyKey;

        if (this.state.inputValue === null) {
            return <td></td>;
        }

        return (
            <td>
                <input
                    type="text"
                    name={`${row}_${propertyKey}`}
                    value={this.state.inputValue}
                    onChange={this.handleChange}
                    required
                />
            </td>
        )
    }
}