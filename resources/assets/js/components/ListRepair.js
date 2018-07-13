import React, { Component } from 'react';

export default class ListRepair extends Component {

    constructor(props) {
        super(props);
        const key = this.props.keyProps,
            propertyKey = this.props.propertyKey;

        this.state = {
            inputValue: key[propertyKey]
        };

        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        this.setState({ inputValue: e.target.value});
    }

    render() {
        return (
            <td>
                <input
                    type="text"
                    value={this.state.inputValue}
                    onChange={this.handleChange}
                    required/>
            </td>
        )
    }
}