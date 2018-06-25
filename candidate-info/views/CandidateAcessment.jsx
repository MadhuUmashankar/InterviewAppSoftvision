import React, { Component } from 'react';
import ManagerEvaluation from './ManagerEvaluation';
import HumanResourceEvaluation from './HumanResourceEvaluation';
import axios from 'axios';


export default class CandidateAcessment extends Component {
    constructor(props) {
        super(props)
        this.state = {
          candidateData: '',
          interViewToBeTaken: ['Technical Round', 'Manager Round', 'HR Round']
        };
  this.handleInterview = this.handleInterview.bind(this);
    }

    componentDidMount() {
        this.loadCandidateDetails();
    }

    handleInterview(e){
      this.setState({interViewToBeTaken : e.target.value})
    }

    getCandidateIDqs(key) {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++)
        {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars[key];
    }


    loadCandidateDetails() {
      let id = this.getCandidateIDqs('id');
      let url = "http://localhost:3000/candidateInfo"
      axios.get(`${url}/${id}`)
          .then(response => {
            this.setState({ candidateData: response.data });
            console.log(response.data);

          })
          .catch(err => {
              console.log(err);
          })
    }



    render() {
      const {interViewToBeTaken, candidateData} = this.state;
      const fullname = candidateData.firstname + " " + candidateData.lastname;
      console.log(' in candidate accesment data',  candidateData)
        return (
            <div className="candidate-ia-form">
                <label>{fullname}</label>
                <br />
                {candidateData.skills}
                <hr />
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
                              <td><ManagerEvaluation candidateData={candidateData} /></td>
                              <td><HumanResourceEvaluation candidateData={candidateData} /></td>
                            </tr>
                          </tbody>
                        </table>
                </center>
            </div>
        )
    }
}
