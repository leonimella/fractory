import React, { Component } from 'react';
import axios from 'axios';

export default class OrdersList extends Component {
    constructor(props) {
        super(props);
    }

    renderTableHead(list) {
        const tableHead = list.shift();

        return Object.keys(tableHead).map((key, index) => {
            return <th key={index}>{tableHead[key]}</th>
        });
    }

    renderTableBody(list) {
        const tableHead = list.shift();

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
        const list = this.props.list;

        if (!list) {
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