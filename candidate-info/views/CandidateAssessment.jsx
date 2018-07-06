import React, { Component } from 'react';
import ManagerEvaluation from './ManagerEvaluation';
import HumanResourceEvaluation from './HumanResourceEvaluation';
import Evaluation from './Evaluation';
import axios from 'axios';
import {hashHistory} from 'react-router';
import { Modal, Button } from 'react-bootstrap';
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
          IAData: [],
          users:[],
          show: false
        };
      this.handleInterviewChange = this.handleInterviewChange.bind(this);
      this.startEvaluating = this.startEvaluating.bind(this);
      this.sendInterviewStatus = this.sendInterviewStatus.bind(this);
      this.logout = this.logout.bind(this);
      this.addInterviews = this.addInterviews.bind(this);
      this.handleShow = this.handleShow.bind(this);
      this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true, modalLabelView:false });
    }

    componentDidMount() {
      axios.get("http://localhost:3000/candidateInfo/users")
            .then(res => {
                  this.setState({ users: res.data });
            })
        this.loadCandidateDetails();
        this.loadDetailsFromServerForIASheet();
    }

    handleInterviewChange(e){
      const {status, listOfInterviewRounds} = this.state;
      let item = {};
      let round,item1,sts;
      if(e.target.value === 'manager') {
        item =  {round : "Manager Round",
        item1 : 'ManagerEvaluation',
        sts : "In-Progress"
      }}
      else if(e.target.value === 'technical'){
         item = {round : "Technical Round",
        item1 : 'Evaluation',
        sts : "In-Progress"
      }}
      else {
        item = {round : "HR Round",
         item1 : 'HumanResourceEvaluation',
         sts : "In-Progress"
      }}
      listOfInterviewRounds.push(item);
      this.setState({showTable: true, interViewToBeTaken : e.target.value,
        show: false, listOfInterviewRounds : listOfInterviewRounds, showInterviews :false,
        status : ''})
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
      axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('jwtToken');
      let id = this.getCandidateIDqs('id');
      let url = "http://localhost:3000/candidateInfo";
      axios.get(`${url}/${id}`)
          .then(response => {
            this.setState({ candidateData: response.data });
            console.log(response.data);
          })
          .catch(error => {
            if(error.response.status === 401) {
               hashHistory.push({
                 pathname: '#/'
               })
             }
         })
    }

    loadDetailsFromServerForIASheet() {
      axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('jwtToken');
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

     sendInterviewStatus(status, type,idx) {
       console.log("Inside iNterveiw Statys", status, type , idx)
      this.state.listOfInterviewRounds[idx].sts = "Cleared";
      this.setState({status,type,listOfInterviewRounds:this.state.listOfInterviewRounds});
     }

     logout() {
      sessionStorage.removeItem('jwtToken');
      window.location.reload();
      hashHistory.push({
          pathname: '#/'
        })
    }

    addInterviews(e) {
      e.preventDefault();
     /* const {status, listOfInterviewRounds} = this.state;
      let item;
      if(status === 'Move to Manager round') {
        item = 'ManagerEvaluation'
      }
      else if(status === 'Move to Technical round 2'){
        item = 'Evaluation'
      }
      else {
         item = 'HumanResourceEvaluation'
      }
      listOfInterviewRounds.push(item);
      this.setState({listOfInterviewRounds : listOfInterviewRounds});
    */}

    render() {
      const {interViewToBeTaken, candidateData, showInterviews, showTable, status, type, showText, listOfInterviewRounds, interviewStatus, users} = this.state;


      const fullname = candidateData.firstname + " " + candidateData.lastname;
      let url = "http://localhost:3000/candidateInfo", currentStatus;

    //  if(interViewToBeTaken === "Technical Round") {
        currentStatus = status

     // }
      const username = sessionStorage.getItem('username');

      const currentUser = users.length > 0 && users.filter((user)=> (user.username == username));

      const firstname = currentUser.length > 0 && currentUser[0].firstname,
      lastname = currentUser.length > 0 && currentUser[0].lastname,
      role = currentUser.length > 0 && currentUser[0].role.toLowerCase();
      //classname = (role === "interviewer" || role === "manager" || role === "hr") ? true : false;

        return (
            <div className="App">
              {sessionStorage.getItem('jwtToken') &&
                <div className="log-in"><span className="username">{firstname + " " +lastname}</span><button className="btn btn-primary" onClick={this.logout}> Logout</button></div>
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

                {showInterviews ?
                  <div>
                    <div>
                        <Button bsStyle="primary" bsSize="large" onClick={this.handleShow} >
                            Proceed interview
                        </Button>
                    </div>

                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title><h3>Select the round of interview</h3></Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <select className="form-control experience-width" id="interViewToBeTakenId" onChange = {this.handleInterviewChange} value = {interViewToBeTaken}>
                              <option>Select</option>
                              <option value="technical">Technical Round</option>
                              <option value="manager">Manager Round</option>
                              <option value="hr">HR Round</option>
                          </select>
                        </Modal.Body>
                    </Modal>
                  </div>
                  :
                  null
                }

                  { showTable  ? <table
                  className="table table-bordered table-responsive" id="interview_round_id">
                      <thead>
                          <tr>
                            <th>Interview Round</th>
                            <th>Evaluation</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>

                           {  listOfInterviewRounds.map((list, index)=> (
                              <tr key={index}>
                                <td className="interview-round">{list.round}</td>
                                { list.item1 === 'Evaluation' ?
                                  <td>
                                  <Evaluation candidateData={candidateData} url={url} sendInterviewStatus={this.sendInterviewStatus} idx = {index}/>
                                </td>
                                :
                               ( list.item1 === 'ManagerEvaluation' ?
                                <td>
                                  <ManagerEvaluation candidateData={candidateData} url={url} sendInterviewStatus={this.sendInterviewStatus} idx = {index}/>
                                </td>
                                :
                                <td>
                                  <HumanResourceEvaluation candidateData={candidateData} url={url} sendInterviewStatus={this.sendInterviewStatus} idx = {index}/>
                                </td>
                               )}
                                <td>{list.sts}</td>
                              </tr>

                            ))
                          }

                        </tbody>
                      </table>


                    :
                  null
                  }
                   {currentStatus === 'Cleared' ?
               <div>
                    <div>
                        <Button bsStyle="primary" bsSize="large" onClick={this.handleShow} >
                            Proceed interview
                        </Button>
                    </div>

                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title><h3>Select the round of interview</h3></Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <select className="form-control experience-width" id="interViewToBeTakenId" onChange = {this.handleInterviewChange} value = {interViewToBeTaken}>
                          <option value="technical">Select</option>
                              <option value="technical">Technical Round</option>
                              <option value="manager">Manager Round</option>
                              <option value="hr">HR Round</option>
                          </select>
                        </Modal.Body>
                    </Modal>
                  </div>
                :
                null}


                </center>
            </div>
        )
    }
}
