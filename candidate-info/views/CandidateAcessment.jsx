import React, { Component } from 'react';
import './CandidateAcessment.scss';

export default class CandidateAcessment extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="candidate-ia-form">
                <Evaluation />
            </div>
        )
    }
}
