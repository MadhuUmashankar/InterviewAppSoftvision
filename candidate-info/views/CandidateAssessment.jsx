import React, { Component } from 'react';
import ManagerEvaluation from './ManagerEvaluation';
import HumanResourceEvaluation from './HumanResourceEvaluation';
import Evaluation from './Evaluation';
import axios from 'axios';
import {hashHistory} from 'react-router';
import { Modal, Button } from 'react-bootstrap';
import Header from './Header';
import Footer from './Footer';
import {
  BrowserRouter as Router,
  Link,
  Route,
  HashRouter
} from 'react-router-dom';
import {getRole, getCandidateRecords, getOverallRole} from './ruleEngine';
import Switch from 'react-toggle-switch';
// import "node_modules/react-toggle-switch/dist/css/switch.min.css"

export default class CandidateAssessment extends Component {
    constructor(props) {
        super(props)
        this.state = {
          candidateData: '',
          interViewToBeTaken: ['Technical Round', 'Manager Round', 'HR Round'],
          showTable: false,
          status:'',
          type:'',
          showText: true,
          listOfInterviewRounds: [],
          IAData: [],
          users:[],
          show: false,
          candidateInterviewRecords: [],
          newInterviewRound: {},
          isShowProceedButton : false,
          firstname: '',
          lastname: '',
          switched: false,
          isOffered: false,
          offered: false
        };
      this.handleInterviewChange = this.handleInterviewChange.bind(this);
      this.startEvaluating = this.startEvaluating.bind(this);
      this.sendInterviewStatus = this.sendInterviewStatus.bind(this);
      this.logout = this.logout.bind(this);
      this.handleShow = this.handleShow.bind(this);
      this.handleClose = this.handleClose.bind(this);
      this.handleDeleteInterview = this.handleDeleteInterview.bind(this);
      this.toggleSwitch = this.toggleSwitch.bind(this);
      this.offeredToggleSwitch = this.offeredToggleSwitch.bind(this);
  }
      toggleSwitch() {
        this.setState(prevState => {
          return {
            switched: !prevState.switched,
            isOffered:true
          };
        });
    };
    offeredToggleSwitch() {
      let {candidateData, offered} = this.state;
      let url = "http://localhost:3000/candidateInfo";
      this.setState({
        offered: !this.state.offered
      }, (prevState) => {
        candidateData["offered"] = (this.state.offered) ? 'offered': 'rejected';
        axios.put(`${url}/${candidateData._id}`, candidateData)
        .then(response => {
            console.log('response', response)
          })
      });

    }


      // console.log(offered);
      //
      // // this.setState(prevState => {
      //   candidateData["offered"] = offered;
      //   axios.put(`${url}/${candidateData._id}`, candidateData)
      //   .then(response => {
      //       console.log('response', response)
      //     })
      // });

      // candidateData["offered"] = this.state.offered;
      // axios.put(`${url}/${candidateData._id}`, candidateData)
      // .then(response => {
      //     console.log('response', response)
      // })

    handleDeleteInterview(e, index, id) {
      e.preventDefault();
        if (confirm("Please confirm to delete this particular round?")) {
      const {candidateInterviewRecords, candidateData} = this.state;
      let arr = candidateInterviewRecords
      let url = "http://localhost:3000/candidateInfo";
      let roundUrl = url + '/CandidateRounds';

      for (var i = arr.length; i--;) {
        if (i === index) {
            arr.splice(i, 1);
        }
    }

    this.setState({candidateInterviewRecords: arr, listOfInterviewRounds: arr });
    if(arr.length === 0){
        this.setState({ isShowProceedButton : false, listOfInterviewRounds: candidateInterviewRecords, showTable:false, showText: true, candidateInterviewRecords: candidateInterviewRecords });
    }

    candidateData["no_of_rounds"] = candidateInterviewRecords.length;
    axios.put(`${url}/${candidateData._id}`, candidateData)
    .then(response => {
        console.log('response', response)
        location.reload();
      })

    axios.delete(`${roundUrl}/${id}`)
        .then(res => {
          console.log('Record deleted');
        })
        .catch(err=> {
          console.error('err in delete-----------', err);
        })
      }
      else {
        false;
      }
    };

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
                  const username = sessionStorage.getItem('username');
                  const {users} = this.state;
                  const currentUser = users.length > 0 && users.filter((user)=> (user.username == username));
                  const firstname = currentUser.length > 0 && currentUser[0].firstname,
                  lastname = currentUser.length > 0 && currentUser[0].lastname,
                  role = currentUser.length > 0 && currentUser[0].role,
                  roleDef = getRole(role);
                  this.setState({firstname:firstname, lastname:lastname, role:role})
                  const roleOverall = getOverallRole(role);

                  for( let props in roleOverall) {
                      var object = {};
                      object[props] = roleOverall[props];
                      this.setState(object);
                  }

                  this.loadCandidateDetails();
                  this.loadDetailsFromServerForIASheet();
                  this.loadDetailsFromServerInterviewRounds();
            })
    }

    handleInterviewChange(e){
      let url = "http://localhost:3000/candidateInfo";
      let {status, listOfInterviewRounds, IAdata, candidateData, candidateInterviewRecords} = this.state;
      let item = {};
      let round, item1, sts;
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

      this.setState({showTable: true, interViewToBeTaken : e.target.value, listOfInterviewRounds : listOfInterviewRounds, isShowProceedButton :false,
        status : '', show: false})

      let rounds = item;
      rounds["candidateID"] = candidateData._id;
      rounds["IA_id"] = IAdata.length>0 ? IAdata._id : '';
        axios.post(url + '/CandidateRounds', rounds)
            .then(res => {
              let array = candidateInterviewRecords || [];
              array.push(res.data);
              candidateInterviewRecords = listOfInterviewRounds = array;
              let isShowProceedButton = true;
              for(let i=0;i<listOfInterviewRounds.length;i++) {
                 if(listOfInterviewRounds[i].sts === "Not Cleared" || listOfInterviewRounds[i].sts ==="Selected" || listOfInterviewRounds[i].sts ==="Rejected") {
                    isShowProceedButton = false;
                 }
                 if(listOfInterviewRounds[i].sts === "In-Progress"){
                    listOfInterviewRounds[i]["isShowDeleteButton"] = true
                 }
              }
              if(listOfInterviewRounds.length===0){
                this.setState({showText :true, showTable:false, isShowProceedButton:isShowProceedButton});
              }else {
                this.setState({showText :false, showTable:true, isShowProceedButton:isShowProceedButton});
              }
              this.setState({isShowProceedButton : isShowProceedButton, listOfInterviewRounds: listOfInterviewRounds, candidateInterviewRecords:candidateInterviewRecords });

              candidateData["no_of_rounds"] = listOfInterviewRounds.length;
              axios.put(`${url}/${candidateData._id}`, candidateData)
              .then(response => {
                  console.log('response', response)
                })

            })
            .catch(err => {
                console.error(err);
            });
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
            let offered = response.data.offered  == "offered" ? true: false;
            this.setState({ candidateData: response.data, offered:offered , switched: offered});
            console.log('candidate Data', response.data);
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


    loadDetailsFromServerInterviewRounds() {
      axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('jwtToken');
      let url = "http://localhost:3000/candidateInfo";
      let id = this.getCandidateIDqs('id');
       let {candidateData,users} = this.state;
        let roundUrl = url + '/CandidateRounds';
            axios.get(roundUrl)
              .then(res => {
                console.log('loadDetailsFromServerInterviewRounds---------', res.data);

                    let candidateInterviewRecords = res.data.length > 0 && res.data.filter((record) => {
                      return id === record.candidateID
                    });
                    candidateInterviewRecords = getCandidateRecords(users[0].role, candidateInterviewRecords, candidateData, res.data);
                    let isShowProceedButton = true;
                    if(candidateInterviewRecords && candidateInterviewRecords.length>0) {
                      for(let i=0;i<candidateInterviewRecords.length;i++) {
                         if(candidateInterviewRecords[i].sts === "Not Cleared" || candidateInterviewRecords[i].sts ==="Selected" ||
                            candidateInterviewRecords[i].sts ==="Rejected") {
                            isShowProceedButton = false;
                         }
                         if(candidateInterviewRecords[i].sts === "In-Progress"){
                           candidateInterviewRecords[i]["isShowDeleteButton"] = true;
                         }
                      }
                    }
                    if(candidateInterviewRecords.length===0){
                      this.setState({showText :true, showTable:false, isShowProceedButton:isShowProceedButton});
                    }else {
                      this.setState({showText :false, showTable:true, isShowProceedButton:isShowProceedButton});
                    }
                    this.setState({isShowProceedButton : isShowProceedButton, listOfInterviewRounds: candidateInterviewRecords, candidateInterviewRecords: candidateInterviewRecords});
              })
              .catch(err => {
                  console.error('erro message',err);
              });
      }

    startEvaluating() {
      this.setState({ isShowProceedButton: true , showText: false});
     }

    sendInterviewStatus(status, type,idx) {
      // this.state.listOfInterviewRounds[idx].sts = "Cleared";
      // this.setState({status, type, listOfInterviewRounds:this.state.listOfInterviewRounds});
     }

    logout() {
      sessionStorage.removeItem('jwtToken');
      window.location.reload();
      hashHistory.push({
          pathname: '#/'
        })
    }

    navigateToHome() {
      // sessionStorage.removeItem('jwtToken');
      window.location.reload();
      hashHistory.push({
          pathname: '#/'
        })
    }


    render() {
      const {interViewToBeTaken, candidateData, showTable,
        isShowProceedButton,status, type, showText, listOfInterviewRounds,
        interviewStatus, users, candidateInterviewRecords, isShowDeleteButton, firstname, lastname, switched, offered} = this.state;

      const fullname = candidateData.firstname + " " + candidateData.lastname;
      let url = "http://localhost:3000/candidateInfo", currentStatus;

    //  if(interViewToBeTaken === "Technical Round") {
        currentStatus = status

     // }


        return (
            <div>
              <Header />

              <div className="container-fluid candidate-info-list-container-fluid">
              <div className="container candidate-info-list-container">

              {sessionStorage.getItem('jwtToken') &&
                <div className="log-in"><span className="username">{firstname + " " +lastname}</span><button className="btn btn-primary" onClick={this.logout}> Logout</button></div>
              }

              <div>
                <label className="candidate-assessment-label">{fullname}</label>
                <a className="margin-tiny ca-resume" target="_blank" href= {candidateData.selectedFile_name} download> <span className="glyphicon glyphicon-download-alt"></span> </a><button className="btn btn-primary move-right" onClick={this.navigateToHome}>Home</button>
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


                  { showTable  ? <table
                  className="table table-bordered table-responsive" id="interview_round_id">
                      <thead>
                          <tr>
                            <th>Interview Round</th>
                            <th>Evaluation</th>
                            <th>Status</th>
                            <th>Delete</th>
                          </tr>
                        </thead>
                        <tbody>

                           {  listOfInterviewRounds.length>0 && listOfInterviewRounds.map((list, index)=> (
                              <tr key={index}>
                                <td className="interview-round">{list.round}</td>
                                { list.item1 === 'Evaluation' ?
                                  <td>
                                  <Evaluation candidateInterviewRecords={listOfInterviewRounds}
                                    candidateData={candidateData} url={url} sendInterviewStatus={this.sendInterviewStatus} idx = {index}/>
                                </td>
                                :
                               ( list.item1 === 'ManagerEvaluation' ?
                                <td>
                                  <ManagerEvaluation candidateInterviewRecords={listOfInterviewRounds} candidateData={candidateData} url={url} sendInterviewStatus={this.sendInterviewStatus} idx = {index}/>
                                </td>
                                :
                                <td>
                                  <HumanResourceEvaluation candidateInterviewRecords={listOfInterviewRounds} candidateData={candidateData} url={url} sendInterviewStatus={this.sendInterviewStatus} idx = {index}/>
                                </td>
                               )}
                                <td>{list.sts}</td>
                                <td>{list.isShowDeleteButton ? <button onClick={(e)=>{this.handleDeleteInterview(e, index, list._id)}} className="btn btn-danger float-right">
                                  Delete
                                </button>: ''}</td>
                              </tr>

                            ))
                          }

                        </tbody>
                      </table>


                    :
                  null
                  }
                   {isShowProceedButton ?
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
                { listOfInterviewRounds.length > 0 &&

            <div className="candidate-hired">
              { listOfInterviewRounds.length > 0 ? <div className="alert alert-info">
                  <div><div>Hired or not?</div>
                  <span><Switch onClick={this.toggleSwitch} on={this.state.switched}/></span>
              </div>
            </div> : ''}

                  {switched ? <div className="alert alert-info">
                  <div>Offered or not?</div>
                  <span><Switch onClick={this.offeredToggleSwitch} on={this.state.offered}/></span>
                </div> : ''}
                {(switched && offered) ? <div className="alert alert-success">
                  <strong>Success!</strong> Candidate have been offered.
                </div>: ''}
               </div>}
            </div>
          </div>
        <Footer />
        </div>
        )
    }
}
