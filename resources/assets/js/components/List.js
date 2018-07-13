import React, { Component } from 'react';
import ListRepair from './ListRepair';

export default class List extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tableHead: null
        };
    }

    componentDidUpdate() {
        const list = this.props.list;
        if (list && !this.state.tableHead) {
            this.setTableHeade(list);
        }
    }

    setTableHeade(list) {
        const tableHead = list.shift();
        this.setState({ tableHead });
    }

    renderTableHead() {
        const tableHead = this.state.tableHead;

        if (tableHead) {
            return Object.keys(tableHead).map((key, index) => {
                return <th key={index}>{tableHead[key]}</th>
            });
        }
    }

    renderTableBody(list) {
        const tableHead = this.state.tableHead;

        if (tableHead) {
            return list.map((key, index) => {
                return (
                    <tr key={index}>
                        {this.renderTableCells(index, key, tableHead)}
                    </tr>
                )
            });
        }
    }

    renderTableCells(rowKey, key, tableHead) {
        const feedback = this.props.feedback,
            onRepair = this.props.onRepair;

        return Object.keys(tableHead).map((propertyKey, index) => {

            if (feedback && feedback.status === 'danger') {
                return (
                    <ListRepair
                        key={index}
                        row={rowKey}
                        keyProps={key}
                        propertyKey={propertyKey}
                        onInputRepair={onRepair}
                    />
                );
            }

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