import React, { Component } from 'react';

export default class Feedback extends Component {
    render() {
        const feedback = this.props.feedback;

        if (!feedback) {
            return <span></span>;
        }

        return (
            <div className={`alert alert-${feedback.status}`} role="alert">
                {feedback.message}
            </div>
        )
    }
}