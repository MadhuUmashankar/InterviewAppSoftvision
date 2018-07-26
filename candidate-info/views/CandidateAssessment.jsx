import React, {Component} from 'react';
import ManagerEvaluation from './ManagerEvaluation';
import HumanResourceEvaluation from './HumanResourceEvaluation';
import Evaluation from './Evaluation';
import {hashHistory} from 'react-router';
import {Modal, Button} from 'react-bootstrap';
import Header from './Header';
import Footer from './Footer';
import {BrowserRouter as Router, Link, Route, HashRouter} from 'react-router-dom';
import {getRole, getCandidateRecords, getOverallRole} from './ruleEngine';
import Switch from 'react-toggle-switch';
import {RadioGroup, RadioButton, ReversedRadioButton} from 'react-radio-buttons';
import $http from '../routes/http';
import ActiveRoleBreadScrumb from './ActiveRoleBreadScrumb';
// import "node_modules/react-toggle-switch/dist/css/switch.min.css"

export default class CandidateAssessment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      candidateData: '',
      interViewToBeTaken: [
        'Technical Round', 'Manager Round', 'HR Round'
      ],
      showTable: false,
      status: '',
      type: '',
      showText: true,
      listOfInterviewRounds: [],
      IAData: [],
      users: [],
      show: false,
      candidateInterviewRecords: [],
      newInterviewRound: {},
      isShowProceedButton: false,
      firstname: '',
      lastname: '',
      endInterview: false,
      removeEndInterview: false,
      endInterviewButton: false,
      candidateSelected: false,
      candidateOffered: false,
      candidateHired: false,
      candidateOnHold: false,
      candidateRejectedByEmployer: false,
      candidateRejectedByHimself: false,
      candidateOfferOnHold: false,
      candidateAccepted: false,
      currentUser: {}
    };
    this.handleInterviewChange = this.handleInterviewChange.bind(this);
    this.sendInterviewStatus = this.sendInterviewStatus.bind(this);
    this.logout = this.logout.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleDeleteInterview = this.handleDeleteInterview.bind(this);
    this.onOfferedSave = this.onOfferedSave.bind(this);
    this.endInterview = this.endInterview.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.reset = this.reset.bind(this);
    this.checkStatus = this.checkStatus.bind(this);
  }

  reset() {
    let {hiredChecked, rejectedChecked, offeredChecked} = this.state;

    this.setState({hiredChecked: false, rejectedChecked: false, offeredChecked: false});
  }

  checkStatus () {
    const {role, candidateSelected} = this.state;

    if(role === "TECH INTERVIEWER" || role === "MANAGER" ) {
      return true;
    }

    return false;

  }

  handleOnChange(event) {
    let value = event.target.checked;
    switch (event.target.name) {
      case "candidateSelected":
        this.setState({
          candidateSelected: value,
          candidateOnHold: false,
          candidateOffered: false,
          candidateAccepted: false,
          CandidateHired:false,
          candidateRejectedByEmployer: false,
          candidateRejectedByHimself:false
        }, () => {
          this.onOfferedSave();
        })
        break;
      case "candidateOffered":
        this.setState({
          candidateRejectedByEmployer: false,
          candidateRejectedByHimself:false,
          candidateOffered: value
        }, () => {
          this.onOfferedSave();
        })
        break;
      case "candidateHired":
        this.setState({
          candidateRejectedByEmployer: false,
          candidateRejectedByHimself:false,
          candidateHired: value,
          candidateOfferOnHold: false
        }, () => {
          this.onOfferedSave();
        })
        break;
      case "candidateOnHold":
        this.setState({
          candidateRejectedByEmployer: false,
          candidateRejectedByHimself:false,
          candidateOnHold: value,
          candidateSelected: false,
          candidateOffered: false,
          candidateAccepted: false,
          CandidateHired:false
        }, () => {
          this.onOfferedSave();
        })
        break;
      case "candidateRejectedByEmployer":
        this.setState({
          candidateSelected: false,
          candidateOffered: false,
          candidateHired: false,
          candidateOnHold: false,
          candidateAccepted: false,
          candidateOfferOnHold:false,
          candidateRejectedByEmployer: event.target.checked
        }, () => {
          this.onOfferedSave();
        })
        break;
      case "candidateRejectedByHimself":
        this.setState({
          candidateAccepted:false,
          candidateHired: false,
          candidateOfferOnHold:false,
          candidateRejectedByHimself: event.target.checked
        }, () => {
          this.onOfferedSave();
        })
        break;
        case "candidateOfferOnHold":
          this.setState({
            candidateOfferOnHold: value,
            candidateHired: false
          }, () => {
            this.onOfferedSave();
          })
          break;
          case "candidateAccepted":
            this.setState({
              candidateAccepted: value,
              candidateRejectedByHimself: false
            }, () => {
              this.onOfferedSave();
            })
            break;
      default:
        break;
    }
  }

  onOfferedSave() {
    let {
      candidateData,
      candidateSelected,
      candidateOffered,
      candidateHired,
      candidateOnHold,
      candidateRejectedByEmployer,
      candidateRejectedByHimself,
      candidateOfferOnHold,
      candidateAccepted
    } = this.state;
    let url = "/candidateInfo";
    candidateData["candidateSelected"] = candidateSelected ? true: false;
    candidateData["candidateOffered"] = candidateOffered ? true: false;
    candidateData["candidateHired"] = candidateHired ? true: false;
    candidateData["candidateOnHold"] = candidateOnHold ? true: false;
    candidateData["candidateRejectedByEmployer"] = candidateRejectedByEmployer ? true: false;
    candidateData["candidateRejectedByHimself"] = candidateRejectedByHimself ? true: false;
    candidateData["candidateOfferOnHold"] = candidateOfferOnHold ? true :false;
    candidateData["candidateAccepted"] = candidateAccepted ? true : false;
    $http.put(`${url}/${candidateData._id}`, candidateData).then(response => {
      console.log('response on offered save', response)
    })
  }

  endInterview() {
    this.setState({endInterview: true})
  }

  handleDeleteInterview(e, index, id) {
    e.preventDefault();
    if (confirm("Please confirm to delete this particular round?")) {
      const {candidateInterviewRecords, candidateData} = this.state;
      let arr = candidateInterviewRecords
      let url = "/candidateInfo";
      let roundUrl = url + '/CandidateRounds';

      for (var i = arr.length; i--;) {
        if (i === index) {
          arr.splice(i, 1);
        }
      }

      this.setState({candidateInterviewRecords: arr, listOfInterviewRounds: arr});
      if (arr.length === 0) {
        this.setState({isShowProceedButton: false, listOfInterviewRounds: candidateInterviewRecords, showTable: false, showText: true, candidateInterviewRecords: candidateInterviewRecords});
      }

      candidateData["no_of_rounds"] = candidateInterviewRecords.length;
      $http.put(`${url}/${candidateData._id}`, candidateData).then(response => {
        console.log('response', response)
        location.reload();
      })

      $http.delete(`${roundUrl}/${id}`).then(res => {
        console.log('Record deleted');
      }).catch(err => {
        console.error('err in delete-----------', err);
      })
    } else {
      false;
    }
  };

  handleClose() {
    this.setState({show: false});
  }

  handleShow() {
    this.setState({show: true, modalLabelView: false});
  }

  componentWillMount() {
    $http.get("/candidateInfo/users").then(res => {
      this.setState({users: res.data});
      const username = sessionStorage.getItem('username');
      const {users} = this.state;
      const currentUser = users.length > 0 && users.filter((user) => (user.username == username));
      const firstname = currentUser.length > 0 && currentUser[0].firstname,
        lastname = currentUser.length > 0 && currentUser[0].lastname,
        role = sessionStorage.getItem('activeRole'),
        roleDef = getRole(role);
      this.setState({firstname: firstname, lastname: lastname, role: role, currentUser: currentUser})
      const roleOverall = getOverallRole(role);

      for (let props in roleOverall) {
        var object = {};
        object[props] = roleOverall[props];
        this.setState(object);
      }

      this.loadCandidateDetails();
      this.loadDetailsFromServerForIASheet();
      this.loadDetailsFromServerInterviewRounds();
    })
  }

  handleInterviewChange(e) {
    let url = "/candidateInfo";
    let {status, listOfInterviewRounds, IAdata, candidateData, candidateInterviewRecords, role} = this.state;
    let item = {};
    let round,
      item1,
      sts;
    if (e.target.value === 'manager') {
      item = {
        round: "Manager Round",
        item1: 'ManagerEvaluation',
        sts: "In-Progress"
      }
    } else if (e.target.value === 'technical') {
      item = {
        round: "Technical Round",
        item1: 'Evaluation',
        sts: "In-Progress"
      }
    } else {
      item = {
        round: "HR Round",
        item1: 'HumanResourceEvaluation',
        sts: "In-Progress"
      }
    }

    this.setState({
      showTable: true,
      interViewToBeTaken: e.target.value,
      listOfInterviewRounds: listOfInterviewRounds,
      isShowProceedButton: false,
      status: '',
      show: false
    })

    let rounds = item;
    rounds["candidateID"] = candidateData._id;
    rounds["IA_id"] = IAdata.length > 0
      ? IAdata._id
      : '';
    $http.post(url + '/CandidateRounds', rounds).then(res => {
      let array = candidateInterviewRecords || [];
      array.push(res.data);
      // candidateInterviewRecords = listOfInterviewRounds = [];

      listOfInterviewRounds = [];
      if(role === "TECH INTERVIEWER") {
        for(let i=0; i< array.length; i++) {
            if(array[i].round == "Technical Round") {
              listOfInterviewRounds.push(array[i]);
            }
        }
      } else if(role ==="MANAGER") {
        for(let i=0; i< array.length; i++) {
            if(array[i].round == "Manager Round" || array[i].round == "Technical Round") {
              listOfInterviewRounds.push(array[i]);
            }
        }

      } else if(role==="HR") {
        for(let i=0; i< array.length; i++) {
            if(array[i].round == "HR Round" || array[i].round == "Manager Round" || array[i].round == "Technical Round") {
              listOfInterviewRounds.push(array[i]);
            }
        }
      }

      candidateInterviewRecords = listOfInterviewRounds;

      let isShowProceedButton = true;

      for (let i = 0; i < listOfInterviewRounds.length; i++) {
        if (listOfInterviewRounds[i].sts === "On Hold" || listOfInterviewRounds[i].sts === "Rejected") {
          isShowProceedButton = false;
          endInterviewButton = false;
        }
        if (listOfInterviewRounds[i].sts === "In-Progress") {
          listOfInterviewRounds[i]["isShowDeleteButton"] = true;
          isShowProceedButton = false;
          endInterviewButton = false;
        }
      }
      if (listOfInterviewRounds.length === 0 || !listOfInterviewRounds) {
        this.setState({showText: true, showTable: false, isShowProceedButton: isShowProceedButton});
      } else {
        this.setState({showText: false, showTable: true, isShowProceedButton: isShowProceedButton});
      }
      this.setState({isShowProceedButton: isShowProceedButton, listOfInterviewRounds: listOfInterviewRounds, candidateInterviewRecords: candidateInterviewRecords});

      candidateData["no_of_rounds"] = listOfInterviewRounds.length;
      $http.put(`${url}/${candidateData._id}`, candidateData).then(response => {
        console.log('response', response)
      })

    }).catch(err => {
      console.error(err);
    });
  }

  getCandidateIDqs(key) {
    var vars = [],
      hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }
    return vars[key];
  }

  loadCandidateDetails() {
    $http.defaults.headers.common['Authorization'] = sessionStorage.getItem('jwtToken');
    let id = this.getCandidateIDqs('id');
    let url = "/candidateInfo";
    $http.get(`${url}/${id}`).then(response => {
      this.setState({candidateData: response.data, candidateSelected: response.data.candidateSelected, candidateOffered: response.data.candidateOffered,
        candidateHired: response.data.candidateHired, candidateOnHold: response.data.candidateOnHold, candidateRejectedByEmployer: response.data.candidateRejectedByEmployer,
         candidateRejectedByHimself: response.data.candidateRejectedByHimself, candidateOfferOnHold: response.data.candidateOfferOnHold, candidateAccepted: response.data.candidateAccepted});
      console.log('candidate Data', response.data);
    }).catch(error => {
      if (error.response.status === 401) {
        hashHistory.push({pathname: '#/'})
      }
    })
  }

  loadDetailsFromServerForIASheet() {
    $http.defaults.headers.common['Authorization'] = sessionStorage.getItem('jwtToken');
    let url = "/candidateInfo";
    let iaUrl = url + '/newIAForm';
    $http.get(iaUrl).then(res => {
      console.log('response from server in candidate assessment', res.data);
      this.setState({IAdata: res.data});
    })
  }

  loadDetailsFromServerInterviewRounds() {

    $http.defaults.headers.common['Authorization'] = sessionStorage.getItem('jwtToken');
    let url = "/candidateInfo";
    let id = this.getCandidateIDqs('id');
    let {candidateData, users, role,endInterviewButton, isShowProceedButton } = this.state;
    let roundUrl = url + '/CandidateRounds';
    let listOfInterviewRounds = [];
    $http.get(roundUrl).then(res => {
      console.log('loadDetailsFromServerInterviewRounds---------', res.data);
      let candidateInterviewRecords = res.data.length > 0 && res.data.filter((record) => {
        return id === record.candidateID
      });

      let array = candidateInterviewRecords || [];

      if(role === "TECH INTERVIEWER") {
        for(let i=0; i< array.length; i++) {
            if(array[i].round == "Technical Round") {
              listOfInterviewRounds.push(array[i]);
            }
        }
      } else if(role ==="MANAGER") {
        for(let i=0; i< array.length; i++) {
            if(array[i].round == "Manager Round" || array[i].round == "Technical Round" ) {
              listOfInterviewRounds.push(array[i]);
            }
        }

      } else if(role==="HR") {
        for(let i=0; i< array.length; i++) {
            if(array[i].round == "HR Round" || array[i].round == "Manager Round" || array[i].round == "Technical Round") {
              listOfInterviewRounds.push(array[i]);
            }
        }
      } else if(role==="TA") {
        listOfInterviewRounds = array;
      }else if(role==="ADMIN") {
        listOfInterviewRounds = array;
      }

      if(role) {
        const roleStatus = getOverallRole(role);
        isShowProceedButton = roleStatus.isShowProceedButton;
        endInterviewButton = roleStatus.endInterviewButton;
      }

      candidateInterviewRecords = listOfInterviewRounds;

      candidateInterviewRecords = getCandidateRecords(users[0].role, candidateInterviewRecords, candidateData, res.data);
      // let isShowProceedButton = true;

      if (candidateInterviewRecords && candidateInterviewRecords.length > 0) {
        for (let i = 0; i < candidateInterviewRecords.length; i++) {
          if (candidateInterviewRecords[i].sts === "On Hold" || candidateInterviewRecords[i].sts === "Rejected") {
            isShowProceedButton = false;
            endInterviewButton = false;
          }
          if (candidateInterviewRecords[i].sts === "In-Progress") {
            candidateInterviewRecords[i]["isShowDeleteButton"] = true;
            isShowProceedButton = false;
            endInterviewButton = false; 
          }
        }
      }

      if (candidateInterviewRecords.length === 0 || !candidateInterviewRecords) {
        this.setState({showText: true, showTable: false, isShowProceedButton: isShowProceedButton,  endInterviewButton : false});
      } else {
        this.setState({showText: false, showTable: true, isShowProceedButton: isShowProceedButton, endInterviewButton : endInterviewButton});
      }

      this.setState({isShowProceedButton: isShowProceedButton,
        listOfInterviewRounds: candidateInterviewRecords, candidateInterviewRecords: candidateInterviewRecords});

    }).catch(err => {
      console.error('erro message', err);
    });
  }

  sendInterviewStatus(status, type, idx) {
    // this.state.listOfInterviewRounds[idx].sts = "Selected";
    // this.setState({status, type, listOfInterviewRounds:this.state.listOfInterviewRounds});
  }

  logout() {
    sessionStorage.removeItem('jwtToken');
    sessionStorage.removeItem('activeRole');
    window.location = "/";
  }

  navigateToHome() {
    //sessionStorage.removeItem('jwtToken');
    window.location.reload();
    hashHistory.push({pathname: '#/'});
  }

  render() {
    let {
      interViewToBeTaken,
      candidateData,
      showTable,
      isShowProceedButton,
      status,
      type,
      showText,
      listOfInterviewRounds,
      interviewStatus,
      users,
      candidateInterviewRecords,
      isShowDeleteButton,
      firstname,
      lastname,
      endInterview,
      role,
      endInterviewButton,
      candidateSelected,
      candidateOffered,
      candidateHired,
      candidateOnHold,
      candidateRejectedByEmployer,
      candidateRejectedByHimself,
      candidateOfferOnHold,
      candidateAccepted,
      currentUser
    } = this.state;

    const fullname = candidateData.firstname + " " + candidateData.lastname;
    let url = "/candidateInfo";

    if (listOfInterviewRounds.length > 0) {
      for (let i = 0; i < listOfInterviewRounds.length; i++) {
        if (listOfInterviewRounds[i].round === "Technical Round" || listOfInterviewRounds[i].round === "HR Round" || listOfInterviewRounds[i].round === "Manager Round") {
          if (listOfInterviewRounds[i].round === "HR Round" && listOfInterviewRounds[i].round === "Manager Round") {
            endInterviewButton = true;
            endInterview = true;
          }
        }
      }
    }


    return (<div>
      <Header/>

      <div className="container-fluid candidate-info-list-container-fluid">
        <div className="container candidate-info-list-container">

          {
            sessionStorage.getItem('jwtToken') && <div className="log-in">
                <span className="username">{firstname + " " + lastname + "  " + "(" + role + ")"}</span>
                <button className="btn btn-primary" onClick={this.logout}>
                  Logout</button>
              </div>
          }

          <ActiveRoleBreadScrumb currentUser={currentUser} />

          <div>
            <label className="candidate-assessment-label">{fullname}</label>
            <a className="margin-tiny ca-resume" target="_blank" href={candidateData.selectedFile_name} download="download">
              <span className="glyphicon glyphicon-download-alt"></span>
            </a>
            <button className="btn btn-primary move-right" onClick={this.navigateToHome}>Home</button>
            <div>
              <span className="margin-tiny glyphicon glyphicon-wrench"></span>
              <label>Skills: {candidateData.skills}</label>
            </div>
          </div>
          <hr/>
          <center>

            {
              showText
                ? <div>
                    <h2>No interview is scheduled for this particular candidate.</h2>
                  </div>
                : ''
            }

            {
              showTable
                ? <table className="table table-responsive" id="interview_round_id">
                    <thead className="thead-dark">
                      <tr>
                        <th>Interview Round</th>
                        <th>Status</th>
                        <th>Evaluation</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>

                      {
                        listOfInterviewRounds.length && listOfInterviewRounds.map((list, index) => (

                          <tr key={index}>
                          <td className="interview-round">{list.round}</td>
                          <td>{list.sts}</td>
                          {
                            list.item1 === 'Evaluation'
                              ? <td>
                                  <Evaluation currentUser={currentUser} candidateInterviewRecords={listOfInterviewRounds} candidateData={candidateData} url={url} sendInterviewStatus={this.sendInterviewStatus} idx={index}/>
                                </td>
                              : (
                                list.item1 === 'ManagerEvaluation'
                                ? <td>
                                  <ManagerEvaluation currentUser={currentUser} candidateInterviewRecords={listOfInterviewRounds} candidateData={candidateData} url={url} sendInterviewStatus={this.sendInterviewStatus} interViewToBeTaken={list.round} idx={index}/>
                                </td>
                                : <td>
                                  <HumanResourceEvaluation currentUser={currentUser} candidateInterviewRecords={listOfInterviewRounds} candidateData={candidateData} url={url} sendInterviewStatus={this.sendInterviewStatus} interViewToBeTaken={list.round} idx={index}/>
                                </td>)
                          }

                          <td>{
                              list.isShowDeleteButton
                                ? <button onClick={(e) => {
                                      this.handleDeleteInterview(e, index, list._id)
                                    }} className="btn btn-danger float-right">
                                    <span className="glyphicon glyphicon-trash" title="Delete"/>
                                  </button>
                                : ''
                            }</td>
                        </tr>))
                      }

                    </tbody>
                  </table>

                : null
            }

          </center>



          {
            isShowProceedButton && (!candidateSelected) && (!candidateRejectedByEmployer) && (!candidateOnHold)
              ? <div>
                  <div>
                    <Button bsStyle="primary" bsSize="large" onClick={this.handleShow}>
                      Proceed interview
                    </Button>

                  </div>

                  <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton="closeButton">
                      <Modal.Title>
                        <h3>Select the round of interview</h3>
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <select required className="form-control experience-width" id="interViewToBeTakenId" onChange={this.handleInterviewChange} value={interViewToBeTaken}>
                        <option value="">Select</option>
                        {role === "ADMIN" ?
                        <span>
                          <option value="technical">Technical Round</option>
                          <option value="manager">Manager Round</option>
                          <option value="hr">HR Round</option>
                        </span>

                        : ''
                      }

                        {role == "TECH INTERVIEWER" ?
                        <option value="technical">Technical Round</option>
                        :''}
                        {role == "MANAGER" ?
                        <option value="manager">Manager Round</option>
                        :''}
                        {role == "HR" ?
                          <option value="hr">HR Round</option>
                        :''}

                      </select>
                    </Modal.Body>
                  </Modal>
                </div>
              : null
          }


          {
            endInterviewButton  && (!candidateSelected) && (!candidateRejectedByEmployer) && (!candidateOnHold)
              ? <div className="endInterview-class">
                  <Button bsStyle="primary" bsSize="large" onClick={this.endInterview}>End Interview</Button>
                </div>
              : ''
          }

        { endInterview || candidateSelected || candidateRejectedByEmployer || candidateOnHold ?   <div className="row offered-class">
            <div className="col-md-12">
              <div className="panel panel-success">
                    <div className="panel-heading">Interview  Status  </div>
                    <div className="panel-body test">
                        <p className="hiring-status">
                          <input disabled={this.checkStatus()} className="checkbox checkbox-primary" name="candidateSelected" type="checkbox"
                          value={candidateSelected} onChange={this.handleOnChange} checked={candidateSelected}/>
                          <span>Candidate Selected?</span>
                        </p>
                        <p className="hiring-status">

                          <input disabled={this.checkStatus()} className="checkbox checkbox-success" name="candidateRejectedByEmployer"
                           type="checkbox" value={candidateRejectedByEmployer} onChange={this.handleOnChange} checked={candidateRejectedByEmployer}/>
                          <span>Candidate rejected by employer?</span>
                        </p>

                      <p className="hiring-status">
                        <input disabled={this.checkStatus()} className="checkbox checkbox-danger" name="candidateOnHold" type="checkbox"
                        value={candidateOnHold} onChange={this.handleOnChange} checked={candidateOnHold}/>
                        <span>Candidate on hold?</span>
                      </p>
                  </div>

                    {candidateSelected ? (<div className="panel-body test">
                    <p className="hiring-status">
                      <input disabled={this.checkStatus()} className="checkbox checkbox-primary" name="candidateOffered" type="checkbox"
                      value={candidateOffered} onChange={this.handleOnChange} checked={candidateOffered}/>
                      <span>Candidate Offered?</span>
                    </p></div>): ''}

                    {(candidateSelected && candidateOffered) ? (<div className="panel-body test">
                      <p className="hiring-status">
                        <input disabled={this.checkStatus()} className="checkbox checkbox-primary" name="candidateAccepted" type="checkbox"
                        value={candidateAccepted} onChange={this.handleOnChange} checked={candidateAccepted}/>
                        <span>Candidate Accepted?</span>
                      </p>

                    <p className="hiring-status">
                      <input disabled={this.checkStatus()} className="checkbox checkbox-danger" name="candidateRejectedByHimself" type="checkbox"
                      value={candidateRejectedByHimself} onChange={this.handleOnChange} checked={candidateRejectedByHimself}/>
                      <span>Candidate rejected the offer?</span>
                    </p>
                </div>) : ''}

                {candidateSelected && candidateOffered && candidateAccepted && (<div className="panel-body test">
                        <p className="hiring-status">
                          <input disabled={this.checkStatus()} className="checkbox checkbox-primary" name="candidateHired" type="checkbox"
                          value={candidateHired} onChange={this.handleOnChange} checked={candidateHired}/>
                          <span>Candidate Hired?</span>
                        </p>

                      <p className="hiring-status">
                        <input disabled={this.checkStatus()} className="checkbox checkbox-danger" name="candidateOfferOnHold" type="checkbox"
                        value={candidateOfferOnHold} onChange={this.handleOnChange} checked={candidateOfferOnHold}/>
                        <span>Candidate offer on hold?</span>
                      </p>
                  </div>)}
                  </div>
                </div>
                </div>
                :'' }


                {(candidateSelected && candidateOffered && candidateAccepted && candidateHired)? (<div className="alert alert-font alert-success offered-class">
                          Candidate has been hired.
                        </div>):''}

              {(candidateRejectedByEmployer)? (<div className="alert alert-danger alert-font offered-class">
                        Candidate has been rejected.
                      </div>):''}
              {(candidateSelected && candidateOffered && candidateRejectedByHimself)? (<div className="alert alert-danger alert-font offered-class">
                        Candidate has rejected the offer.
                      </div>):''}

            {(candidateOnHold)? (<div className="alert alert-info alert-font offered-class">
                      Candidate is kept on hold.
                    </div>):''}

        </div>
      </div>
      <Footer/>
    </div>)
  }
}
