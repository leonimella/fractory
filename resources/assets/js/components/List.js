import React, { Component } from 'react';

export default class List extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tableHead: null
        };
    }

    setTableHeade(list) {
        const tableHead = list.shift();
        this.setState({ tableHead });
    }

    renderTableHead() {
        const tableHead = this.state.tableHead;
        return Object.keys(tableHead).map((key, index) => {
            return <th key={index}>{tableHead[key]}</th>
        });
    }

    renderTableBody(list) {
        const tableHead = this.state.tableHead;
        return list.map((key, index) => {
            return (
                <tr key={index}>
                    {this.renderTableCells(key, tableHead)}
                </tr>
            )
        });
    }

    renderTableCells(key, tableHead) {
        return Object.keys(tableHead).map((propertyKey, index) => {
            return <td key={index}>{key[propertyKey]}</td>
        });
    }

    render() {
        const list = this.props.list,
            tableHead = this.state.tableHead;

        if (!list) {
            return <span></span>;
        } else if (list && !tableHead) {
            this.setTableHeade(list);
            return <span></span>;
        }

        return (
            <table className="table table-striped">
                <thead className="thead-dark">
                    <tr>{this.renderTableHead(list)}</tr>
                </thead>
                <tbody>{this.renderTableBody(list)}</tbody>
            </table>
        )
    }
}