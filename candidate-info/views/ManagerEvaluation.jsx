import React, { Component } from 'react';
import Summary from './Summary';
import EvaluationStatus from './EvaluationStatus';
import { Modal,Button } from 'react-bootstrap';
import axios from 'axios';
import InputBox from './InputBox';
import TextArea from './TextArea';

class ManagerEvaluation extends Component {
  constructor(props, context) {
     super(props, context);

     this.state = {
       managerEvaluationData:[],
       url: props.url,
       interviewerName2: '',
       jobTitle: '',
       interviewerRound:'',
       clientOrientationRatings1: '',
       clientOrientationComments1: '',
       clientOrientationRatings2: '',
       clientOrientationComments2: '',
       clientOrientationRatings3: '',
       clientOrientationComments3: '',
       projectManagementRatings: '',
       projectManagementComments: '',
       leadershipRatings: '',
       leadershipComments: '',
       communicationRatings: '',
       communicationComments: '',
       domainRatings: '',
       domainComments: '',
       technicalSolutionsRatings1: '',
       technicalSolutionsComments1: '',
       technicalSolutionsRatings2: '',
       technicalSolutionsComments2: '',
       technicalSolutionsRatings3: '',
       technicalSolutionsComments3: '',
       technicalSolutionsRatings4: '',
       technicalSolutionsComments4: '',
       managerInterviewStatus:''
     };

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmitManagerForm = this.handleSubmitManagerForm.bind(this);
    this.handleUpdateManagerForm = this.handleUpdateManagerForm.bind(this);
   }

   componentDidMount() {
       this.loadManagerDetails();

     //   const {managerEvaluationData} = this.state;
     //   const {candidateData, sendInterviewStatus} = this.props;
     //   let currentManagerRecord = managerEvaluationData.filter((record) => {
     //     return candidateData.candidateID === record.candidateID
     //   });
     //
     //   currentManagerRecord = currentManagerRecord[0];
     //   console.log("currentManagerRecord", currentManagerRecord);
     //   if(currentManagerRecord != undefined) {
     //     if(Object.keys(currentManagerRecord).length > 0) {
     //      const clientOrientationRatings1= currentManagerRecord.clientOrientationRatings1;
     //      const clientOrientationComments1= currentManagerRecord.clientOrientationComments1;
     //      const clientOrientationRatings2= currentManagerRecord.clientOrientationRatings2 ? currentManagerRecord.clientOrientationRatings2 : "";
     //      const clientOrientationComments2= currentManagerRecord.clientOrientationComments2 ? currentManagerRecord.clientOrientationComments2 : "";
     //      const clientOrientationRatings3= currentManagerRecord.clientOrientationRatings3 ? currentManagerRecord.clientOrientationRatings3 : "";
     //      const clientOrientationComments3= currentManagerRecord.clientOrientationComments3 ? currentManagerRecord.clientOrientationComments3 : "";
     //      const projectManagementRatings= currentManagerRecord.projectManagementRatings ? currentManagerRecord.projectManagementRatings : "";
     //      const projectManagementComments= currentManagerRecord.projectManagementComments ? currentManagerRecord.projectManagementComments : "";
     //      const leadershipRatings= currentManagerRecord.leadershipRatings ? currentManagerRecord.leadershipRatings : "";
     //      const leadershipComments= currentManagerRecord.leadershipComments ? currentManagerRecord.leadershipComments : "";
     //      const communicationRatings= currentManagerRecord.communicationRatings ? currentManagerRecord.communicationRatings : "";
     //      const communicationComments= currentManagerRecord.communicationComments ? currentManagerRecord.communicationComments : "";
     //      const domainRatings= currentManagerRecord.domainRatings ? currentManagerRecord.domainRatings : "";
     //      const domainComments= currentManagerRecord.domainComments ? currentManagerRecord.domainComments : "";
     //      const technicalSolutionsRatings1= currentManagerRecord.technicalSolutionsRatings1 ? currentManagerRecord.technicalSolutionsRatings1 : "";
     //      const technicalSolutionsComments1= currentManagerRecord.technicalSolutionsComments1 ? currentManagerRecord.technicalSolutionsComments1 : "";
     //      const technicalSolutionsRatings2 = currentManagerRecord.technicalSolutionsRatings2 ? currentManagerRecord.technicalSolutionsRatings2 : "";
     //      const technicalSolutionsComments2= currentManagerRecord.technicalSolutionsComments2 ? currentManagerRecord.technicalSolutionsComments2 : "";
     //      const technicalSolutionsRatings3= currentManagerRecord.technicalSolutionsRatings3 ? currentManagerRecord.technicalSolutionsRatings3 : "";
     //      const technicalSolutionsComments3= currentManagerRecord.technicalSolutionsComments3 ? currentManagerRecord.technicalSolutionsComments3 : "";
     //      const technicalSolutionsRatings4= currentManagerRecord.technicalSolutionsRatings4 ? currentManagerRecord.technicalSolutionsRatings4 : "";
     //      const technicalSolutionsComments4= currentManagerRecord.technicalSolutionsComments4 ? currentManagerRecord.technicalSolutionsComments4 : "";
     //      const managerInterviewStatus = currentManagerRecord.managerInterviewStatus ? currentManagerRecord.managerInterviewStatus : "";
     //
     //       this.setState({clientOrientationRatings1, clientOrientationComments1, clientOrientationRatings2, clientOrientationComments2, clientOrientationRatings3, clientOrientationComments3, projectManagementRatings, projectManagementComments, leadershipRatings, leadershipComments, communicationRatings, communicationComments, domainRatings, domainComments, technicalSolutionsRatings1, technicalSolutionsComments1, technicalSolutionsRatings2,technicalSolutionsComments2, technicalSolutionsRatings3, technicalSolutionsComments3, technicalSolutionsRatings4,  technicalSolutionsComments4,  managerInterviewStatus }, ()=>{
     //         sendInterviewStatus(hrInterviewStatus, "manager")});
     //     }
     // }
   }


   loadManagerDetails() {
     let managerUrl = this.props.url + '/newManagerForm';
       axios.get(managerUrl)
           .then(res => {
             console.log('response from server Manager data', res.data);
               this.setState({ managerEvaluationData: res.data });
           })
   }


  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleOnChange(event) {
     const {sendInterviewStatus} = this.props;
     switch (event.target.name) {
        case "interviewerName2":
            this.setState({interviewerName2 : event.target.value})
            break;
        case "jobTitle":
            this.setState({jobTitle : event.target.value})
            break;
        case "interviewerRound":
            this.setState({interviewerRound : event.target.value})
            break;
        case "managerInterviewStatus":
            this.setState({managerInterviewStatus : event.target.value})
            sendInterviewStatus(event.target.value, "manager");
            break;
        case "clientOrientationRatings1":
            this.setState({clientOrientationRatings1 : event.target.value})
            break;
        case "clientOrientationComments1":
            this.setState({clientOrientationComments1 : event.target.value})
            break;
        case "clientOrientationRatings2":
            this.setState({clientOrientationRatings2 : event.target.value})
            break;
        case "clientOrientationComments2":
            this.setState({clientOrientationComments2 : event.target.value})
            break;
        case "clientOrientationRatings3":
            this.setState({clientOrientationRatings3 : event.target.value})
            break;
        case "clientOrientationComments3":
            this.setState({clientOrientationComments3 : event.target.value})
            break;
        case "projectManagementRatings":
            this.setState({projectManagementRatings : event.target.value})
            break;
        case "projectManagementComments":
            this.setState({projectManagementComments : event.target.value})
            break;
        case "leadershipRatings":
            this.setState({leadershipRatings : event.target.value})
            break;
        case "leadershipComments":
            this.setState({leadershipComments : event.target.value})
            break;
        case "communicationRatings":
            this.setState({communicationRatings : event.target.value})
            break;
        case "communicationComments":
            this.setState({communicationComments : event.target.value})
            break;
        case "domainRatings":
            this.setState({domainRatings : event.target.value})
            break;
        case "domainComments":
            this.setState({domainComments : event.target.value})
            break;
        case "technicalSolutionsRatings1":
            this.setState({technicalSolutionsRatings1 : event.target.value})
            break;
        case "technicalSolutionsComments1":
            this.setState({technicalSolutionsComments1 : event.target.value})
            break;
        case "technicalSolutionsRatings2":
            this.setState({technicalSolutionsRatings2 : event.target.value})
            break;
        case "technicalSolutionsComments2":
            this.setState({technicalSolutionsComments2 : event.target.value})
            break;
        case "technicalSolutionsRatings3":
            this.setState({technicalSolutionsRatings3 : event.target.value})
            break;
        case "technicalSolutionsComments3":
            this.setState({technicalSolutionsComments3 : event.target.value})
            break;
        case "technicalSolutionsRatings4":
            this.setState({technicalSolutionsRatings4 : event.target.value})
            break;
        case "technicalSolutionsComments4":
            this.setState({technicalSolutionsComments4 : event.target.value})
            break;
        default:
            break;
    }
  }


  handleSubmitManagerForm(e) {
    e.preventDefault();
    const {candidateData} = this.props;
    const candidateFullname = candidateData.firstname + " " + candidateData.lastname;
    const {interviewerName2, jobTitle, interviewerRound, clientOrientationRatings1, clientOrientationComments1, clientOrientationRatings2, clientOrientationComments2, clientOrientationRatings3, clientOrientationComments3, projectManagementRatings, projectManagementComments, leadershipRatings, leadershipComments, communicationRatings, communicationComments, domainRatings, domainComments, technicalSolutionsRatings1, technicalSolutionsComments1, technicalSolutionsRatings2,technicalSolutionsComments2, technicalSolutionsRatings3, technicalSolutionsComments3, technicalSolutionsRatings4,  technicalSolutionsComments4, managerInterviewStatus} = this.state;
    // Candidate Manager
     const managerRecord = Object.assign({}, {candidateFullname}, {candidateID: candidateData.candidateID}, {interviewerName2}, {jobTitle}, {interviewerRound}, {clientOrientationRatings1}, {clientOrientationComments1}, {clientOrientationRatings2}, {clientOrientationComments2}, {clientOrientationRatings3}, {clientOrientationComments3}, {projectManagementRatings}, {projectManagementComments}, {leadershipRatings}, {leadershipComments}, {communicationRatings}, {communicationComments}, {domainRatings}, {domainComments}, {technicalSolutionsRatings1}, {technicalSolutionsComments1}, {technicalSolutionsRatings2}, {technicalSolutionsComments2}, {technicalSolutionsRatings3}, {technicalSolutionsComments3}, {technicalSolutionsRatings4},  {technicalSolutionsComments4}, {managerInterviewStatus});

    this.setState({ show: false });
      if(managerRecord) {
          let records = this.state.managerEvaluationData;
          let newManagerEvaluationData = records.concat(managerRecord);
          this.setState({ managerEvaluationData: newManagerEvaluationData });

          axios.post(this.props.url + '/newManagerForm', managerRecord)
              .catch(err => {
                  console.error(err);
                  this.setState({ managerEvaluationData: records });
              });
      }
      this.loadManagerDetails();
  }

  handleUpdateManagerForm(e, id, record) {
    e.preventDefault();
    const {candidateData} = this.props;
    const {interviewerName2, jobTitle, interviewerRound, clientOrientationRatings1, clientOrientationComments1, clientOrientationRatings2, clientOrientationComments2, clientOrientationRatings3, clientOrientationComments3, projectManagementRatings, projectManagementComments, leadershipRatings, leadershipComments, communicationRatings, communicationComments, domainRatings, domainComments, technicalSolutionsRatings1, technicalSolutionsComments1, technicalSolutionsRatings2,technicalSolutionsComments2, technicalSolutionsRatings3, technicalSolutionsComments3, technicalSolutionsRatings4,  technicalSolutionsComments4, managerInterviewStatus} = this.state;
    const candidateFullname = candidateData.firstname + " " + candidateData.lastname;

    const updatedManagerRecord = Object.assign({},{candidateFullname}, {candidateID: candidateData.candidateID}, {interviewerName2}, {jobTitle}, {interviewerRound}, {clientOrientationRatings1}, {clientOrientationComments1}, {clientOrientationRatings2}, {clientOrientationComments2}, {clientOrientationRatings3}, {clientOrientationComments3}, {projectManagementRatings}, {projectManagementComments}, {leadershipRatings}, {leadershipComments}, {communicationRatings}, {communicationComments}, {domainRatings}, {domainComments}, {technicalSolutionsRatings1}, {technicalSolutionsComments1}, {technicalSolutionsRatings2}, {technicalSolutionsComments2}, {technicalSolutionsRatings3}, {technicalSolutionsComments3}, {technicalSolutionsRatings4},  {technicalSolutionsComments4}, {managerInterviewStatus})

    let iaUrl = this.props.url + '/newManagerForm';
    this.setState({ show: false });

    //sends the new candidate id and new candidate to our api
    axios.put(`${iaUrl}/${id}`, updatedManagerRecord)
        .catch(err => {
            console.log(err);
        })
    this.loadManagerDetails();
  }

  render() {
    const {candidateData, interViewToBeTaken} = this.props;
    const candidateFullname = candidateData.firstname + " " + candidateData.lastname;
    const {managerEvaluationData, interviewerName2, jobTitle, interviewerRound, clientOrientationRatings1, clientOrientationComments1, clientOrientationRatings2, clientOrientationComments2, clientOrientationRatings3, clientOrientationComments3, projectManagementRatings, projectManagementComments, leadershipRatings, leadershipComments, communicationRatings, communicationComments, domainRatings, domainComments, technicalSolutionsRatings1, technicalSolutionsComments1, technicalSolutionsRatings2,technicalSolutionsComments2, technicalSolutionsRatings3, technicalSolutionsComments3, technicalSolutionsRatings4,  technicalSolutionsComments4, managerInterviewStatus }
     = this.state;

    let currentManagerRecord = managerEvaluationData.filter((record) => {
      return candidateData.candidateID === record.candidateID
    });

    currentManagerRecord = currentManagerRecord[0];
    const currManagerObject = currentManagerRecord || {};

    return (
      <div>
        <Button bsStyle="primary" onClick={()=>{this.handleShow()}}>
          Manager Form
        </Button>

        <Modal bsSize="large" show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
          <h2 className="ia-form-title">Manager Evaluation Form</h2>
          </Modal.Header>
          <Modal.Body>
            <div className="form-container">
              <form className="form-horizontal" onSubmit= {this.handleSubmitManagerForm}>
                <fieldset className = "background">
                    <div>
                      <table
                          className="table table-bordered table-responsive" id="manager_evaluation_detais_id">
                          <tbody>
                            <tr>
                              <td><strong>Candidate Name</strong></td><td>{candidateFullname}</td>
                              <td><strong>Candidate Id</strong></td><td>{candidateData.candidateID}</td>
                              <td><strong>Interview Type</strong></td><td className="interview-round">{interViewToBeTaken}</td>
                            </tr>
                            <tr>
                              <td><strong>Interviewer</strong><span className="mandatory">*</span></td><td><InputBox
                                  type="text"
                                  placeholder="Enter Interviewer's name"
                                  classname="form-control"
                                  name="interviewerName2"
                                  id="interviewerId2"
                                  value = {currManagerObject.interviewerName2 || this.state.interviewerName2 }
                                  maxLength="20"
                                  required
                                  onChange = {this.handleOnChange}
                              /></td>
                            <td><strong>Job Title</strong><span className="mandatory">*</span></td><td><InputBox
                                  type="text"
                                  placeholder="Enter Job title"
                                  classname="form-control"
                                  name="jobTitle"
                                  id="jobTitleId"
                                  value = {currManagerObject.jobTitle || this.state.jobTitle }
                                  maxLength="20"
                                  required
                                  onChange = {this.handleOnChange}
                              /></td>
                            <td><strong>Interview Round</strong><span className="mandatory">*</span></td><td><InputBox
                                  type="text"
                                  placeholder="Enter the round"
                                  classname="form-control"
                                  name="interviewerRound"
                                  id="interviewerRoundId1"
                                  value = {currManagerObject.interviewerRound || this.state.interviewerRound }
                                  maxLength="20"
                                  required
                                  onChange = {this.handleOnChange}
                              /></td>
                            </tr>
                          </tbody>
                        </table>

                        <table className="table table-bordered table-responsive">
                        <thead>
                          <tr>
                            <th colSpan="2" className="evaluation-criteria">Evaluation Criteria<span className="mandatory">*</span></th>
                            <th>Ratings<span className="mandatory">*</span></th>
                            <th>Comments<span className="mandatory">*</span></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td rowSpan="3">Client Orientation<span className="mandatory">*</span></td>
                            <td className="col-sm-3">Understanding Customer Needs</td>
                            <td>
                              <select className="form-control" id="ratings_id1" name="clientOrientationRatings1" onChange={this.handleOnChange}
                                value={currManagerObject.clientOrientationRatings1}>
                                  <option>Select</option>
                                  <option>0 - Not Applicaple</option>
                                  <option>1 - Below Expectation</option>
                                  <option>2 - Needs Improvement</option>
                                  <option>3 - Meets Expectation</option>
                                  <option>4 - Exceeds Expectation</option>
                              </select>
                            </td>
                            <td>
                              <TextArea required rows="2" cols="25" onChange = {this.handleOnChange} name="clientOrientationComments1"
                              id="clientOrientationCommentsId1" placeholder="Please enter the comments" value={currManagerObject.clientOrientationComments1}></TextArea>
                            </td>
                          </tr>
                          <tr>

                            <td className="col-sm-3">Follow client process</td>
                            <td>
                              <select className="form-control" id="ratings_id2" name="clientOrientationRatings2" onChange={this.handleOnChange}
                                value={currManagerObject.clientOrientationRatings2}>
                                  <option>Select</option>
                                  <option>0 - Not Applicaple</option>
                                  <option>1 - Below Expectation</option>
                                  <option>2 - Needs Improvement</option>
                                  <option>3 - Meets Expectation</option>
                                  <option>4 - Exceeds Expectation</option>
                              </select>
                            </td>
                            <td>
                              <TextArea required rows="2" cols="25" onChange = {this.handleOnChange} name="clientOrientationComments2"
                              id="clientOrientationCommentsId2" placeholder="Please enter the comments" value={currManagerObject.clientOrientationComments2}></TextArea>
                            </td>
                          </tr>
                          <tr>

                            <td className="col-sm-3">Developing relationships with client</td>
                            <td>
                              <select className="form-control" id="ratings_id3" name="clientOrientationRatings3" onChange={this.handleOnChange}
                                value={currManagerObject.clientOrientationRatings3}>
                                  <option>Select</option>
                                  <option>0 - Not Applicaple</option>
                                  <option>1 - Below Expectation</option>
                                  <option>2 - Needs Improvement</option>
                                  <option>3 - Meets Expectation</option>
                                  <option>4 - Exceeds Expectation</option>
                              </select>
                            </td>
                            <td>
                              <TextArea required rows="2" cols="25" onChange = {this.handleOnChange} name="clientOrientationComments3"
                              id="clientOrientationCommentsId3" placeholder="Please enter the comments" value={currManagerObject.clientOrientationComments3}></TextArea>
                            </td>
                          </tr>

                          <tr>
                            <td>Project Management<span className="mandatory">*</span></td>
                            <td className="col-sm-3">People Management</td>
                            <td>
                              <select className="form-control" id="ratings_id4" name="projectManagementRatings" onChange={this.handleOnChange} value={ currManagerObject.projectManagementRatings}>
                                  <option>Select</option>
                                  <option>0 - Not Applicaple</option>
                                  <option>1 - Below Expectation</option>
                                  <option>2 - Needs Improvement</option>
                                  <option>3 - Meets Expectation</option>
                                  <option>4 - Exceeds Expectation</option>
                              </select>
                            </td>
                            <td>
                              <TextArea required rows="2" cols="25" onChange = {this.handleOnChange} name="projectManagementComments"
                              id="projectManagementCommentsId" placeholder="Please enter the comments" value={currManagerObject.projectManagementComments}></TextArea>
                            </td>
                          </tr>

                          <tr>
                            <td>Leadership<span className="mandatory">*</span></td>
                            <td className="col-sm-3"></td>
                            <td>
                              <select className="form-control" id="ratings_id5" name="leadershipRatings" onChange={this.handleOnChange} value={currManagerObject.leadershipRatings}>
                                  <option>Select</option>
                                  <option>0 - Not Applicaple</option>
                                  <option>1 - Below Expectation</option>
                                  <option>2 - Needs Improvement</option>
                                  <option>3 - Meets Expectation</option>
                                  <option>4 - Exceeds Expectation</option>
                              </select>
                            </td>
                            <td>
                              <TextArea required rows="2" cols="25" onChange = {this.handleOnChange} name="leadershipComments"
                              id="leadershipCommentsId" placeholder="Please enter the comments" value={currManagerObject.leadershipComments}></TextArea>
                            </td>
                          </tr>

                          <tr>
                            <td>Communication<span className="mandatory">*</span></td>
                            <td className="col-sm-3"></td>
                            <td>
                              <select className="form-control" id="ratings_id6" onChange={this.handleOnChange} name="communicationRatings" value={currManagerObject.communicationRatings}>
                                  <option>Select</option>
                                  <option>0 - Not Applicaple</option>
                                  <option>1 - Below Expectation</option>
                                  <option>2 - Needs Improvement</option>
                                  <option>3 - Meets Expectation</option>
                                  <option>4 - Exceeds Expectation</option>
                              </select>
                            </td>
                            <td>
                              <TextArea required rows="2" cols="25" onChange = {this.handleOnChange} name="communicationComments"
                              id="communicationCommentsId" placeholder="Please enter the comments" value={currManagerObject.communicationComments} ></TextArea>
                            </td>
                          </tr>

                          <tr>
                            <td>Domain (Business/Technology)<span className="mandatory">*</span></td>
                            <td className="col-sm-3"></td>
                            <td>
                              <select className="form-control" id="ratings_id7" name = "domainRatings" onChange={this.handleOnChange} value={currManagerObject.domainRatings}>
                                  <option>Select</option>
                                  <option>0 - Not Applicaple</option>
                                  <option>1 - Below Expectation</option>
                                  <option>2 - Needs Improvement</option>
                                  <option>3 - Meets Expectation</option>
                                  <option>4 - Exceeds Expectation</option>
                              </select>
                            </td>
                            <td>
                              <TextArea required rows="2" cols="25" onChange = {this.handleOnChange} name="domainComments"
                              id="domainCommentsId" placeholder="Please enter the comments" value={currManagerObject.domainComments}></TextArea>
                            </td>
                          </tr>
                          <tr>
                            <td rowSpan="4">Technical Solutions<span className="mandatory">*</span></td>
                            <td className="col-sm-3">Requirement gathering</td>
                            <td>
                              <select className="form-control" id="ratings_id8" onChange={this.handleOnChange} name="technicalSolutionsRatings1" value={currManagerObject.technicalSolutionsRatings1}>
                                  <option>Select</option>
                                  <option>0 - Not Applicaple</option>
                                  <option>1 - Below Expectation</option>
                                  <option>2 - Needs Improvement</option>
                                  <option>3 - Meets Expectation</option>
                                  <option>4 - Exceeds Expectation</option>
                              </select>
                            </td>
                            <td>
                              <TextArea required rows="2" cols="25" onChange = {this.handleOnChange} name="technicalSolutionsComments1"
                              id="technicalSolutionsCommentsId1" placeholder="Please enter the comments" value={currManagerObject.technicalSolutionsComments1}></TextArea>
                            </td>
                            </tr>

                            <tr>
                            <td className="col-sm-3">Architect/ Design</td>
                            <td>
                              <select className="form-control" id="ratings_id9" onChange={this.handleOnChange} name="technicalSolutionsRatings2" value={currManagerObject.technicalSolutionsRatings2}>
                                  <option>Select</option>
                                  <option>0 - Not Applicaple</option>
                                  <option>1 - Below Expectation</option>
                                  <option>2 - Needs Improvement</option>
                                  <option>3 - Meets Expectation</option>
                                  <option>4 - Exceeds Expectation</option>
                              </select>
                            </td>
                            <td>
                              <TextArea required rows="2" cols="25" onChange = {this.handleOnChange} name="technicalSolutionsComments2"
                              id="technicalSolutionsCommentsId2" placeholder="Please enter the comments" value={currManagerObject.technicalSolutionsComments2}></TextArea>
                            </td>
                          </tr>
                          <tr>

                            <td className="col-sm-3">Coding</td>
                            <td>
                              <select className="form-control" id="ratings_id10" onChange={this.handleOnChange} name="technicalSolutionsRatings3" value={currManagerObject.technicalSolutionsRatings3}>
                                  <option>Select</option>
                                  <option>0 - Not Applicaple</option>
                                  <option>1 - Below Expectation</option>
                                  <option>2 - Needs Improvement</option>
                                  <option>3 - Meets Expectation</option>
                                  <option>4 - Exceeds Expectation</option>
                              </select>
                            </td>
                            <td>
                              <TextArea required rows="2" cols="25" onChange = {this.handleOnChange} name="technicalSolutionsComments3"
                              id="technicalSolutionsCommentsId3" placeholder="Please enter the comments" value={currManagerObject.technicalSolutionsComments3}></TextArea>
                            </td>
                          </tr>
                          <tr>

                            <td className="col-sm-3">Testing</td>
                            <td>
                              <select className="form-control" id="ratings_id11" onChange={this.handleOnChange} name="technicalSolutionsRatings4" value={currManagerObject.technicalSolutionsRatings4}>
                                  <option>Select</option>
                                  <option>0 - Not Applicaple</option>
                                  <option>1 - Below Expectation</option>
                                  <option>2 - Needs Improvement</option>
                                  <option>3 - Meets Expectation</option>
                                  <option>4 - Exceeds Expectation</option>
                              </select>
                            </td>
                            <td>
                              <TextArea required rows="2" cols="25" onChange = {this.handleOnChange} name="technicalSolutionsComments4"
                              id="technicalSolutionsCommentsId4" placeholder="Please enter the comments" value={currManagerObject.technicalSolutionsComments4}></TextArea>
                            </td>
                          </tr>
                        </tbody>
                      </table>


                    </div>
                    <div className="margin-small pd-small">
                      <div className="col-sm-4"><label>Interview Status</label><span className="mandatory">*</span></div>
                        <div className="col-sm-6">
                          <div className="form-group experience-width">
                            <select required className="form-control experience-width" onChange = {this.handleOnChange} name="managerInterviewStatus"
                            id="managerInterviewStatusId" value ={currManagerObject.managerInterviewStatus}>
                              <option>Yet to be interviewed</option>
                              <option>Rejected</option>
                              <option>Selected</option>
                              <option>On Hold</option>
                              <option>Withdraw</option>
                              <option>Move to HR round</option>
                              <option>Took other offer</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="margin-small">
                        {
                          currentManagerRecord &&
                          <Button className="move-right"
                            onClick={(e)=>this.handleUpdateManagerForm(e, currentManagerRecord._id, managerEvaluationData)}>Update</Button>
                        }
                        { !currentManagerRecord &&
                           <Button className="move-right" type="submit">Save</Button>
                        }

                        <Button className="" onClick={this.handleClose}>Cancel</Button>
                      </div>
                      </fieldset>
              </form>
            </div>
          </Modal.Body>


        </Modal>
      </div>
    );

  }
}

export default ManagerEvaluation;
