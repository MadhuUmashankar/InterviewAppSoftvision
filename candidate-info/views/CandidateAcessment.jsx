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
          showTable: false,
          status:'',
          type:''
        };
  this.handleInterviewChange = this.handleInterviewChange.bind(this);
  this.startEvaluating = this.startEvaluating.bind(this);
  this.sendInterviewStatus = this.sendInterviewStatus.bind(this);
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
 sendInterviewStatus(status, type) {
   this.setState({status,type});
 }

    render() {
      const {interViewToBeTaken, candidateData, showInterviews, showTable, status, type} = this.state;
      const fullname = candidateData.firstname + " " + candidateData.lastname;
      let url = "http://localhost:3000/candidateInfo", currentStatus;
      console.log(' in candidate accesment data',  candidateData)

      if(interViewToBeTaken === type) {
        currentStatus=status
      }
        return (
            <div className="App">
              <div>
                <label className="candidate-assessment-label">{fullname}</label>
                <div className="ca-resume"><label>Resume</label> <a  target="_blank" href= {candidateData.selectedFile_name} download> <span className="glyphicon glyphicon-download-alt"></span> </a></div>

                <div><span className="margin-tiny glyphicon glyphicon-wrench"></span><label>Skills: {candidateData.skills}</label></div>

                </div>
                <hr />
                <center>
                  <div>
                  <p>No interview is scheduled for this particular candidate.
                    Please click here to <button onClick={this.startEvaluating}>Start Evaluating</button>
                  </p>
                </div>

                  <br />
                  {showInterviews ?
                    <div>
                      <select className="form-control experience-width" id="interViewToBeTakenId" onChange = {this.handleInterviewChange} value = {interViewToBeTaken}>
                          <option value="manager">Manager Round</option>
                          <option value="technical">Technical Round</option>
                          <option value="hr">HR Round</option>
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
                            <th>Evaluation</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="interview-round">1. {interViewToBeTaken} Round</td>
                              <td>{(interViewToBeTaken==="manager") ? <ManagerEvaluation candidateData={candidateData} interViewToBeTaken={interViewToBeTaken} url={url} sendInterviewStatus={this.sendInterviewStatus} /> : null}
                              {(interViewToBeTaken==="technical") ? <Evaluation candidateData={candidateData} url={url} sendInterviewStatus={this.sendInterviewStatus} /> : null}
                            {(interViewToBeTaken==="hr") ? <HumanResourceEvaluation candidateData={candidateData} sendInterviewStatus={this.sendInterviewStatus} interViewToBeTaken={interViewToBeTaken} url={url} /> : null}</td>
                          <td>{currentStatus}</td>
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
