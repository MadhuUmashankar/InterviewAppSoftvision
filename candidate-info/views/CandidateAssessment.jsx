import React, { Component } from 'react';
import ManagerEvaluation from './ManagerEvaluation';
import HumanResourceEvaluation from './HumanResourceEvaluation';
import Evaluation from './Evaluation';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  HashRouter
} from 'react-router-dom';

export default class CandidateAssessment extends Component {
    constructor(props) {
        super(props)
        this.state = {
          candidateData: '',
          interViewToBeTaken: ['Technical Round', 'Manager Round', 'HR Round'],
          showInterviews: false,
          showTable: false,
          status:'',
          type:'',
          showText: true,
          listOfInterviewRounds: [],
          IAData: []
        };
  this.handleInterviewChange = this.handleInterviewChange.bind(this);
  this.startEvaluating = this.startEvaluating.bind(this);
  this.sendInterviewStatus = this.sendInterviewStatus.bind(this);
  this.logout = this.logout.bind(this);
  this.addInterviews = this.addInterviews.bind(this);
    }

    componentDidMount() {
        this.loadCandidateDetails();
        this.loadDetailsFromServerForIASheet();
    }

    componentWillReceiveProps(nextProps){
      const {interviewStatus} = this.state;


          const iaValue= this.loadDetailsFromServerForIASheet();
          // iaValue.filter(candidateID)
          console.log('iaValue',iaValue );

      if(interviewStatus === "Move to Manager round") {
        const item = {};
        this.state.listOfInterviewRounds.push(item);
      this.setState(this.state.listOfInterviewRounds);
      }
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

    loadDetailsFromServerForIASheet() {
      let url = "http://localhost:3000/candidateInfo";
        let iaUrl = url + '/newIAForm';
          axios.get(iaUrl)
              .then(res => {
                console.log('response from server in candidate assessment', res.data);
                  this.setState({ IAdata: res.data });
              })
      }

     startEvaluating() {
       this.setState({ showInterviews: true , showText: false});
     }

     sendInterviewStatus(status, type) {
       this.setState({status,type});
     }

     logout() {
      localStorage.removeItem('jwtToken');
      window.location.reload();
      hashHistory.push({
          pathname: '#/'
        })
    }

    addInterviews(e) {
      e.preventDefault();
      const item = {};
      this.state.listOfInterviewRounds.push(item);
    this.setState(this.state.listOfInterviewRounds);
      // this.setState({
      //    listOfInterviewRounds: [...this.state.listOfInterviewRounds, item]
      //  });
      console.log('add another interview')
    }

    render() {
      const {interViewToBeTaken, candidateData, showInterviews, showTable, status, type, showText, listOfInterviewRounds, interviewStatus} = this.state;
      const fullname = candidateData.firstname + " " + candidateData.lastname;
      let url = "http://localhost:3000/candidateInfo", currentStatus;

      if(interViewToBeTaken === "Technical Round") {
        currentStatus = status
      }
      // if(currentStatus !== "Rejected" || currentStatus !== "Took other offer") {
      //   console.log(' The candidate is been Rejected/ have taken other offer.')
      // }


        return (
            <div className="App">
              {localStorage.getItem('jwtToken') &&
                <Link to="/" className="btn btn-primary log-in">Log Out</Link>
              }
              <div>
                <label className="candidate-assessment-label">{fullname}</label>
                <div className="ca-resume"><label>Resume</label> <a  target="_blank" href= {candidateData.selectedFile_name} download> <span className="glyphicon glyphicon-download-alt"></span> </a></div>

                <div><span className="margin-tiny glyphicon glyphicon-wrench"></span><label>Skills: {candidateData.skills}</label></div>

                </div>
                <hr />
                <center>
                {showText ?
                  <div>
                    <p>No interview is scheduled for this particular candidate.
                      Please click here to <button onClick={this.startEvaluating}>Start Evaluating</button>
                    </p>
                  </div>
                  :
                  <div><p>Please select the interview round here<span className="glyphicon glyphicon-arrow-down"></span></p></div>
                }


                  { showInterviews ? <table
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
                            <td className="interview-round">Technical Round</td>
                              <td>
                              <Evaluation candidateData={candidateData} url={url} sendInterviewStatus={this.sendInterviewStatus} />
                            </td>
                          <td>{currentStatus}</td>
                          </tr>
                          <tr>
                            <td className="interview-round">Manager Round</td>
                              <td>
                              <ManagerEvaluation candidateData={candidateData} url={url} sendInterviewStatus={this.sendInterviewStatus} />
                            </td>
                          <td>{currentStatus}</td>
                          </tr>
                          <tr>
                            <td className="interview-round">HR Round</td>
                              <td>
                              <HumanResourceEvaluation candidateData={candidateData} url={url} sendInterviewStatus={this.sendInterviewStatus} />
                            </td>
                          <td>{currentStatus}</td>
                          </tr>
                          {  listOfInterviewRounds.map((list, index)=> (
                              <tr key={index}>
                                <td className="interview-round">Technical Round</td>
                                  <td>
                                  <Evaluation candidateData={candidateData} url={url} sendInterviewStatus={this.sendInterviewStatus} />
                                </td>
                              <td>{currentStatus}</td>
                              </tr>

                            ))
                          }

                        </tbody>
                      </table>


                    :
                  null
                  }
                  <button onClick={this.addInterviews}> Add Technical Interview</button>

                </center>
            </div>
        )
    }
}
