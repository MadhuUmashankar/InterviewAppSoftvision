import React, { Component } from 'react';
import ManagerEvaluation from './ManagerEvaluation';
import HumanResourceEvaluation from './HumanResourceEvaluation';
import Evaluation from './Evaluation';
import axios from 'axios';


export default class CandidateAcessment extends Component {
    constructor(props) {
        super(props)
        this.state = {
          candidateData: '',
          interViewToBeTaken: ['Technical Round', 'Manager Round', 'HR Round'],
          showInterviews: false,
          showTable: false
        };
  this.handleInterviewChange = this.handleInterviewChange.bind(this);
  this.startEvaluating = this.startEvaluating.bind(this);
    }

    componentDidMount() {
        this.loadCandidateDetails();
    }

    handleInterviewChange(e){
      this.setState({showTable: true, interViewToBeTaken : e.target.value})
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
      let url = "http://localhost:3000/candidateInfo";
      axios.get(`${url}/${id}`)
          .then(response => {
            this.setState({ candidateData: response.data });
            console.log(response.data);
          })
          .catch(err => {
              console.log(err);
          })
    }

 startEvaluating() {
   this.setState({ showInterviews: true });
 }

    render() {
      const {interViewToBeTaken, candidateData, showInterviews, showTable} = this.state;
      const fullname = candidateData.firstname + " " + candidateData.lastname;
      let url = "http://localhost:3000/candidateInfo";
      console.log(' in candidate accesment data',  candidateData)
        return (
            <div className="App">
              <div>
                <label className="candidate-assessment-label">{fullname}</label>
                <div className="ca-resume"><label>Resume</label> <a  target="_blank" href= {candidateData.selectedFile_name} download> Download </a></div>

                <div><span className="margin-tiny glyphicon glyphicon-wrench"></span><label>Skills: {candidateData.skills}</label></div>

                </div>
                <hr />
                <center>
                  <p>No interview is scheduled for this particular candidate.
                    Please click here to <button onClick={this.startEvaluating}>Start Evaluating</button>
                  </p>
                  <br />
                  {showInterviews ?
                    <div>
                      <select className="form-control experience-width" id="interViewToBeTakenId" onChange = {this.handleInterviewChange} value = {interViewToBeTaken}>
                          <option>Manager Round</option>
                          <option>Technical Round</option>
                          <option>HR Round</option>
                      </select>
                    </div>
                  : null
                  }
                  <br />
                  { showTable ? <table
                  className="table table-bordered table-responsive" id="interview_round_id">
                      <thead>
                          <tr>
                            <th>Interview Round</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr colSpan="3">
                            <td>Round1{(interViewToBeTaken==="Manager Round") ? <ManagerEvaluation candidateData={candidateData} interViewToBeTaken={interViewToBeTaken} url={url} /> : null}
                            {(interViewToBeTaken==="Technical Round") ? <Evaluation candidateData={candidateData} url={url} /> : null}
                          {(interViewToBeTaken==="HR Round") ? <HumanResourceEvaluation candidateData={candidateData} interViewToBeTaken={interViewToBeTaken} url={url} /> : null}</td>
                        

                          </tr>
                        </tbody>
                      </table>
                    :
                  null
                  }


                </center>
            </div>
        )
    }
}
