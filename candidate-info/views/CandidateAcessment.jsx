import React, { Component } from 'react';
import ManagerEvaluation from './ManagerEvaluation';
import HumanResourceEvaluation from './HumanResourceEvaluation';

export default class CandidateAcessment extends Component {
    constructor(props) {
        super(props)
        this.state = {
          interViewToBeTaken: ['Technical Round', 'Manager Round', 'HR Round']
        };
  this.handleInterview = this.handleInterview.bind(this);
    }

handleInterview(e){
  this.setState({interViewToBeTaken : e.target.value})
}


    render() {
      const {interViewToBeTaken} = this.state;
      console.log(' in candidate accesment', interViewToBeTaken)
        return (
            <div className="candidate-ia-form">
                <label>Candidate Assessment Form</label>

                <center>
                  <p>No interview is scheduled for this particular candidate.
                    Please click here to Start Evaluating.
                  </p>
                  <select className="form-control" id="interviewRound" onChange = {this.handleInterview} value = {interViewToBeTaken}>
                      <option>Manager Round</option>
                      <option>Technical Round</option>
                      <option>HR Round</option>
                  </select>
                  <p></p>



                  <table
                    className="table table-bordered table-responsive" id="interview_round_id">
                        <thead>
                            <tr>
                              <th>Interview Round</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{interViewToBeTaken ==='Manager Round' ? <ManagerEvaluation /> : <HumanResourceEvaluation />}</td>
                            </tr>
                          </tbody>
                        </table>
                </center>
            </div>
        )
    }
}
