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
       managerInterviewStatus:'',
       excellentRemark: '',
       goodRemark: '',
       averageRemark: '',
       poorRemark: '',
       finalRemark: ''
     };

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmitManagerForm = this.handleSubmitManagerForm.bind(this);
    this.handleUpdateManagerForm = this.handleUpdateManagerForm.bind(this);
   }

   componentDidMount() {
       this.loadManagerDetails();
   }


   loadManagerDetails() {
       let {candidateInterviewRecords, idx} = this.props;
       let {managerEvaluationData} = this.state;
       let managerUrl = this.props.url + '/newManagerForm';
       axios.get(managerUrl)
           .then(res => {
             console.log('response from server Manager data', res.data);
               this.setState({ managerEvaluationData: res.data });
               managerEvaluationData = res.data;
               let currentManagerRecord = managerEvaluationData.length>0 && managerEvaluationData.filter((record) => {
                     return candidateInterviewRecords[idx].IA_id === record._id
              });
              const currManagerObject = currentManagerRecord[0] || {};
              for (var prop in currManagerObject) {
                    var object = {};
                    object[prop] = currManagerObject[prop];
                   this.setState(object);
               }
           })
   }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleOnChange(event) {
    const { value } = event.target;
     let {sendInterviewStatus,idx} = this.props;
     let {managerEvaluationData} = this.state;
     idx = 0;
     if(!managerEvaluationData.length)
     managerEvaluationData[idx] = {};

     switch (event.target.name) {
        case "interviewerName2":
          managerEvaluationData[idx]["interviewerName2"] = value;
            this.setState({interviewerName2 : event.target.value})
            break;
        case "jobTitle":
          managerEvaluationData[idx]["jobTitle"] = value;
            this.setState({jobTitle : event.target.value})
            break;
        case "interviewerRound":
          managerEvaluationData[idx]["interviewerRound"] = value;
            this.setState({interviewerRound : event.target.value})
            break;
        case "managerInterviewStatus":
          managerEvaluationData[idx]["managerInterviewStatus"] = value;
            this.setState({managerInterviewStatus : event.target.value})
            sendInterviewStatus(event.target.value, "manager",idx);
            break;
        case "clientOrientationRatings1":
          managerEvaluationData[idx]["clientOrientationRatings1"] = value;
            this.setState({clientOrientationRatings1 : event.target.value})
            break;
        case "clientOrientationComments1":
        managerEvaluationData[idx]["clientOrientationComments1"] = value;
            this.setState({clientOrientationComments1 : event.target.value})
            break;
        case "clientOrientationRatings2":
        managerEvaluationData[idx]["clientOrientationRatings2"] = value;
            this.setState({clientOrientationRatings2 : event.target.value})
            break;
        case "clientOrientationComments2":
        managerEvaluationData[idx]["clientOrientationComments2"] = value;
            this.setState({clientOrientationComments2 : event.target.value})
            break;
        case "clientOrientationRatings3":
        managerEvaluationData[idx]["clientOrientationRatings3"] = value;
            this.setState({clientOrientationRatings3 : event.target.value})
            break;
        case "clientOrientationComments3":
        managerEvaluationData[idx]["clientOrientationComments3"] = value;
            this.setState({clientOrientationComments3 : event.target.value})
            break;
        case "projectManagementRatings":
        managerEvaluationData[idx]["projectManagementRatings"] = value;
            this.setState({projectManagementRatings : event.target.value})
            break;
        case "projectManagementComments":
        managerEvaluationData[idx]["projectManagementComments"] = value;
            this.setState({projectManagementComments : event.target.value})
            break;
        case "leadershipRatings":
        managerEvaluationData[idx]["leadershipRatings"] = value;
            this.setState({leadershipRatings : event.target.value})
            break;
        case "leadershipComments":
        managerEvaluationData[idx]["leadershipComments"] = value;
            this.setState({leadershipComments : event.target.value})
            break;
        case "communicationRatings":
        managerEvaluationData[idx]["communicationRatings"] = value;
            this.setState({communicationRatings : event.target.value})
            break;
        case "communicationComments":
        managerEvaluationData[idx]["communicationComments"] = value;
            this.setState({communicationComments : event.target.value})
            break;
        case "domainRatings":
        managerEvaluationData[idx]["domainRatings"] = value;
            this.setState({domainRatings : event.target.value})
            break;
        case "domainComments":
        managerEvaluationData[idx]["domainComments"] = value;
            this.setState({domainComments : event.target.value})
            break;
        case "technicalSolutionsRatings1":
        managerEvaluationData[idx]["technicalSolutionsRatings1"] = value;
            this.setState({technicalSolutionsRatings1 : event.target.value})
            break;
        case "technicalSolutionsComments1":
        managerEvaluationData[idx]["technicalSolutionsComments1"] = value;
            this.setState({technicalSolutionsComments1 : event.target.value})
            break;
        case "technicalSolutionsRatings2":
        managerEvaluationData[idx]["technicalSolutionsRatings2"] = value;
            this.setState({technicalSolutionsRatings2 : event.target.value})
            break;
        case "technicalSolutionsComments2":
        managerEvaluationData[idx]["technicalSolutionsComments2"] = value;
            this.setState({technicalSolutionsComments2 : event.target.value})
            break;
        case "technicalSolutionsRatings3":
        managerEvaluationData[idx]["technicalSolutionsRatings3"] = value;
            this.setState({technicalSolutionsRatings3 : event.target.value})
            break;
        case "technicalSolutionsComments3":
        managerEvaluationData[idx]["technicalSolutionsComments3"] = value;
            this.setState({technicalSolutionsComments3 : event.target.value})
            break;
        case "technicalSolutionsRatings4":
        managerEvaluationData[idx]["technicalSolutionsRatings4"] = value;
            this.setState({technicalSolutionsRatings4 : event.target.value})
            break;
        case "technicalSolutionsComments4":
        managerEvaluationData[idx]["technicalSolutionsComments4"] = value;
            this.setState({technicalSolutionsComments4 : event.target.value})
            break;
        case "excellentRemark":
        managerEvaluationData[idx]["excellentRemark"] = value;
            this.setState({excellentRemark : event.target.value})
            break;
        case "goodRemark":
        managerEvaluationData[idx]["goodRemark"] = value;
            this.setState({goodRemark : event.target.value})
            break;
        case "averageRemark":
        managerEvaluationData[idx]["averageRemark"] = value;
            this.setState({averageRemark : event.target.value})
            break;
        case "poorRemark":
        managerEvaluationData[idx]["poorRemark"] = value;
            this.setState({poorRemark : event.target.value})
            break;
        case "finalRemark":
        managerEvaluationData[idx]["finalRemark"] = value;
            this.setState({finalRemark : event.target.value})
            break;

        default:
            break;
    }
    return false;
  }


  handleSubmitManagerForm(e) {
    e.preventDefault();
    const {candidateData, candidateInterviewRecords, idx} = this.props;
    const candidateFullname = candidateData.firstname + " " + candidateData.lastname;
    const {interviewerName2, jobTitle, interviewerRound, clientOrientationRatings1, clientOrientationComments1, clientOrientationRatings2, clientOrientationComments2, clientOrientationRatings3, clientOrientationComments3, projectManagementRatings, projectManagementComments, leadershipRatings, leadershipComments, communicationRatings, communicationComments, domainRatings, domainComments, technicalSolutionsRatings1, technicalSolutionsComments1, technicalSolutionsRatings2,technicalSolutionsComments2, technicalSolutionsRatings3, technicalSolutionsComments3, technicalSolutionsRatings4,  technicalSolutionsComments4, managerInterviewStatus, excellentRemark, goodRemark, averageRemark, poorRemark, finalRemark } = this.state;
    // Candidate Manager
    const managerRecord = Object.assign({}, {candidateFullname}, {candidateID: candidateData.candidateID}, {interviewerName2}, {jobTitle}, {interviewerRound}, {clientOrientationRatings1}, {clientOrientationComments1}, {clientOrientationRatings2}, {clientOrientationComments2}, {clientOrientationRatings3}, {clientOrientationComments3}, {projectManagementRatings}, {projectManagementComments}, {leadershipRatings}, {leadershipComments}, {communicationRatings}, {communicationComments}, {domainRatings}, {domainComments}, {technicalSolutionsRatings1}, {technicalSolutionsComments1}, {technicalSolutionsRatings2}, {technicalSolutionsComments2}, {technicalSolutionsRatings3}, {technicalSolutionsComments3}, {technicalSolutionsRatings4},  {technicalSolutionsComments4}, {managerInterviewStatus}, {excellentRemark}, {goodRemark}, {averageRemark}, {poorRemark}, {finalRemark});


    this.setState({ show: false });
      if(managerRecord) {
          let records = this.state.managerEvaluationData;
          let newManagerEvaluationData = records.concat(managerRecord);
          this.setState({ managerEvaluationData: newManagerEvaluationData });
          let url = "http://localhost:3000/candidateInfo";
          let roundUrl = url + '/CandidateRounds';
          axios.post(this.props.url + '/newManagerForm', managerRecord)
          .then(res => {
              candidateInterviewRecords[idx].IA_id = res.data._id;
              candidateInterviewRecords[idx].sts = managerRecord.managerInterviewStatus;
              axios.put(`${roundUrl}/${candidateInterviewRecords[idx]._id}`, candidateInterviewRecords[idx])
              .then(response => {
                // this.loadDetailsFromServerForIASheet();
                this.setState({ managerEvaluationData: records });
                location.reload();
              })
                  .catch(err => {
                      console.log('error message=========', err);
                  })
          })
              .catch(err => {
                  console.error(err);
                  this.setState({ managerEvaluationData: records });
              });
      }
      this.loadManagerDetails();
  }

  handleUpdateManagerForm(e, id, record) {
    e.preventDefault();
    const {candidateData, candidateInterviewRecords, idx} = this.props;
    const {interviewerName2, jobTitle, interviewerRound, clientOrientationRatings1, clientOrientationComments1, clientOrientationRatings2, clientOrientationComments2, clientOrientationRatings3, clientOrientationComments3, projectManagementRatings, projectManagementComments, leadershipRatings, leadershipComments, communicationRatings, communicationComments, domainRatings, domainComments, technicalSolutionsRatings1, technicalSolutionsComments1, technicalSolutionsRatings2,technicalSolutionsComments2, technicalSolutionsRatings3, technicalSolutionsComments3, technicalSolutionsRatings4,  technicalSolutionsComments4, managerInterviewStatus, excellentRemark, goodRemark, averageRemark, poorRemark, finalRemark} = this.state;
    const candidateFullname = candidateData.firstname + " " + candidateData.lastname;

    const updatedManagerRecord = Object.assign({},{candidateFullname}, {candidateID: candidateData.candidateID}, {interviewerName2}, {jobTitle}, {interviewerRound}, {clientOrientationRatings1}, {clientOrientationComments1}, {clientOrientationRatings2}, {clientOrientationComments2}, {clientOrientationRatings3}, {clientOrientationComments3}, {projectManagementRatings}, {projectManagementComments}, {leadershipRatings}, {leadershipComments}, {communicationRatings}, {communicationComments}, {domainRatings}, {domainComments}, {technicalSolutionsRatings1}, {technicalSolutionsComments1}, {technicalSolutionsRatings2}, {technicalSolutionsComments2}, {technicalSolutionsRatings3}, {technicalSolutionsComments3}, {technicalSolutionsRatings4},  {technicalSolutionsComments4}, {managerInterviewStatus}, {excellentRemark}, {goodRemark}, {averageRemark}, {poorRemark}, {finalRemark})

    let iaUrl = this.props.url + '/newManagerForm';
    this.setState({ show: false });
    let url = "http://localhost:3000/candidateInfo";
    let roundUrl = url + '/CandidateRounds';

    //sends the new candidate id and new candidate to our api
    axios.put(`${iaUrl}/${id}`, updatedManagerRecord)
    .then(res => {
        candidateInterviewRecords[idx].sts = updatedManagerRecord.managerInterviewStatus;
        axios.put(`${roundUrl}/${candidateInterviewRecords[idx]._id}`, candidateInterviewRecords[idx])
        .then(response => {
          // this.loadDetailsFromServerForIASheet();
          location.reload();
        })
            .catch(err => {
                console.log('error message in update-----------=========', err);
            })
    })
        .catch(err => {
            console.log(err);
        })
    this.loadManagerDetails();
  }

  render() {
    const {candidateData, interViewToBeTaken} = this.props;
    const candidateFullname = candidateData.firstname + " " + candidateData.lastname;
    const {managerEvaluationData, interviewerName2, jobTitle, interviewerRound, clientOrientationRatings1, clientOrientationComments1, clientOrientationRatings2, clientOrientationComments2, clientOrientationRatings3, clientOrientationComments3, projectManagementRatings, projectManagementComments, leadershipRatings, leadershipComments, communicationRatings, communicationComments, domainRatings, domainComments, technicalSolutionsRatings1, technicalSolutionsComments1, technicalSolutionsRatings2,technicalSolutionsComments2, technicalSolutionsRatings3, technicalSolutionsComments3, technicalSolutionsRatings4,  technicalSolutionsComments4, managerInterviewStatus, excellentRemark, goodRemark, averageRemark, poorRemark, finalRemark }
     = this.state;
       const {candidateInterviewRecords, idx} = this.props;

    let currentManagerRecord = managerEvaluationData.length>0 && managerEvaluationData.filter((record) => {
      return candidateInterviewRecords[idx].IA_id === record._id
    });


    const currManagerObject = currentManagerRecord[0] || {};



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
                                    autoComplete="off"
                                  onChange = {this.handleOnChange}
                              /></td>
                            <td><strong>Job Title</strong><span className="mandatory">*</span></td><td><InputBox
                                  type="text"
                                  placeholder="Enter Job title"
                                  classname="form-control"
                                  name="jobTitle"
                                  id="jobTitleId"
                                    autoComplete="off"
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
                                    autoComplete="off"
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
                                  <option>0 - Not Applicaple</option>
                                  <option>1 - Below Expectation</option>
                                  <option>2 - Needs Improvement</option>
                                  <option>3 - Meets Expectation</option>
                                  <option>4 - Exceeds Expectation</option>
                              </select>
                            </td>
                            <td>
                              <TextArea rows="2" cols="25" onChange = {this.handleOnChange} name="clientOrientationComments1"
                              id="clientOrientationCommentsId1" placeholder="Please enter the comments" value={currManagerObject.clientOrientationComments1}></TextArea>
                            </td>
                          </tr>
                          <tr>

                            <td className="col-sm-3">Follow client process</td>
                            <td>
                              <select className="form-control" id="ratings_id2" name="clientOrientationRatings2" onChange={this.handleOnChange}
                                value={currManagerObject.clientOrientationRatings2}>
                                  <option>0 - Not Applicaple</option>
                                  <option>1 - Below Expectation</option>
                                  <option>2 - Needs Improvement</option>
                                  <option>3 - Meets Expectation</option>
                                  <option>4 - Exceeds Expectation</option>
                              </select>
                            </td>
                            <td>
                              <TextArea rows="2" cols="25" onChange = {this.handleOnChange} name="clientOrientationComments2"
                              id="clientOrientationCommentsId2" placeholder="Please enter the comments" value={currManagerObject.clientOrientationComments2}></TextArea>
                            </td>
                          </tr>
                          <tr>

                            <td className="col-sm-3">Developing relationships with client</td>
                            <td>
                              <select className="form-control" id="ratings_id3" name="clientOrientationRatings3" onChange={this.handleOnChange}
                                value={currManagerObject.clientOrientationRatings3}>
                                  <option>0 - Not Applicaple</option>
                                  <option>1 - Below Expectation</option>
                                  <option>2 - Needs Improvement</option>
                                  <option>3 - Meets Expectation</option>
                                  <option>4 - Exceeds Expectation</option>
                              </select>
                            </td>
                            <td>
                              <TextArea rows="2" cols="25" onChange = {this.handleOnChange} name="clientOrientationComments3"
                              id="clientOrientationCommentsId3" placeholder="Please enter the comments" value={currManagerObject.clientOrientationComments3}></TextArea>
                            </td>
                          </tr>

                          <tr>
                            <td>Project Management<span className="mandatory">*</span></td>
                            <td className="col-sm-3">People Management</td>
                            <td>
                              <select className="form-control" id="ratings_id4" name="projectManagementRatings" onChange={this.handleOnChange} value={ currManagerObject.projectManagementRatings}>
                                  <option>0 - Not Applicaple</option>
                                  <option>1 - Below Expectation</option>
                                  <option>2 - Needs Improvement</option>
                                  <option>3 - Meets Expectation</option>
                                  <option>4 - Exceeds Expectation</option>
                              </select>
                            </td>
                            <td>
                              <TextArea rows="2" cols="25" onChange = {this.handleOnChange} name="projectManagementComments"
                              id="projectManagementCommentsId" placeholder="Please enter the comments" value={currManagerObject.projectManagementComments}></TextArea>
                            </td>
                          </tr>

                          <tr>
                            <td>Leadership<span className="mandatory">*</span></td>
                            <td className="col-sm-3"></td>
                            <td>
                              <select className="form-control" id="ratings_id5" name="leadershipRatings" onChange={this.handleOnChange} value={currManagerObject.leadershipRatings}>
                                  <option>0 - Not Applicaple</option>
                                  <option>1 - Below Expectation</option>
                                  <option>2 - Needs Improvement</option>
                                  <option>3 - Meets Expectation</option>
                                  <option>4 - Exceeds Expectation</option>
                              </select>
                            </td>
                            <td>
                              <TextArea rows="2" cols="25" onChange = {this.handleOnChange} name="leadershipComments"
                              id="leadershipCommentsId" placeholder="Please enter the comments" value={currManagerObject.leadershipComments}></TextArea>
                            </td>
                          </tr>

                          <tr>
                            <td>Communication<span className="mandatory">*</span></td>
                            <td className="col-sm-3"></td>
                            <td>
                              <select className="form-control" id="ratings_id6" onChange={this.handleOnChange} name="communicationRatings" value={currManagerObject.communicationRatings}>
                                  <option>0 - Not Applicaple</option>
                                  <option>1 - Below Expectation</option>
                                  <option>2 - Needs Improvement</option>
                                  <option>3 - Meets Expectation</option>
                                  <option>4 - Exceeds Expectation</option>
                              </select>
                            </td>
                            <td>
                              <TextArea rows="2" cols="25" onChange = {this.handleOnChange} name="communicationComments"
                              id="communicationCommentsId" placeholder="Please enter the comments" value={currManagerObject.communicationComments} ></TextArea>
                            </td>
                          </tr>

                          <tr>
                            <td>Domain (Business/Technology)<span className="mandatory">*</span></td>
                            <td className="col-sm-3"></td>
                            <td>
                              <select className="form-control" id="ratings_id7" name = "domainRatings" onChange={this.handleOnChange} value={currManagerObject.domainRatings}>
                                  <option>0 - Not Applicaple</option>
                                  <option>1 - Below Expectation</option>
                                  <option>2 - Needs Improvement</option>
                                  <option>3 - Meets Expectation</option>
                                  <option>4 - Exceeds Expectation</option>
                              </select>
                            </td>
                            <td>
                              <TextArea rows="2" cols="25" onChange = {this.handleOnChange} name="domainComments"
                              id="domainCommentsId" placeholder="Please enter the comments" value={currManagerObject.domainComments}></TextArea>
                            </td>
                          </tr>
                          <tr>
                            <td rowSpan="4">Technical Solutions<span className="mandatory">*</span></td>
                            <td className="col-sm-3">Requirement gathering</td>
                            <td>
                              <select className="form-control" id="ratings_id8" onChange={this.handleOnChange} name="technicalSolutionsRatings1" value={currManagerObject.technicalSolutionsRatings1}>
                                  <option>0 - Not Applicaple</option>
                                  <option>1 - Below Expectation</option>
                                  <option>2 - Needs Improvement</option>
                                  <option>3 - Meets Expectation</option>
                                  <option>4 - Exceeds Expectation</option>
                              </select>
                            </td>
                            <td>
                              <TextArea rows="2" cols="25" onChange = {this.handleOnChange} name="technicalSolutionsComments1"
                              id="technicalSolutionsCommentsId1" placeholder="Please enter the comments" value={currManagerObject.technicalSolutionsComments1}></TextArea>
                            </td>
                            </tr>

                            <tr>
                            <td className="col-sm-3">Architect/ Design</td>
                            <td>
                              <select className="form-control" id="ratings_id9" onChange={this.handleOnChange} name="technicalSolutionsRatings2" value={currManagerObject.technicalSolutionsRatings2}>
                                  <option>0 - Not Applicaple</option>
                                  <option>1 - Below Expectation</option>
                                  <option>2 - Needs Improvement</option>
                                  <option>3 - Meets Expectation</option>
                                  <option>4 - Exceeds Expectation</option>
                              </select>
                            </td>
                            <td>
                              <TextArea rows="2" cols="25" onChange = {this.handleOnChange} name="technicalSolutionsComments2"
                              id="technicalSolutionsCommentsId2" placeholder="Please enter the comments" value={currManagerObject.technicalSolutionsComments2}></TextArea>
                            </td>
                          </tr>
                          <tr>

                            <td className="col-sm-3">Coding</td>
                            <td>
                              <select className="form-control" id="ratings_id10" onChange={this.handleOnChange} name="technicalSolutionsRatings3" value={currManagerObject.technicalSolutionsRatings3}>
                                  <option>0 - Not Applicaple</option>
                                  <option>1 - Below Expectation</option>
                                  <option>2 - Needs Improvement</option>
                                  <option>3 - Meets Expectation</option>
                                  <option>4 - Exceeds Expectation</option>
                              </select>
                            </td>
                            <td>
                              <TextArea rows="2" cols="25" onChange = {this.handleOnChange} name="technicalSolutionsComments3"
                              id="technicalSolutionsCommentsId3" placeholder="Please enter the comments" value={currManagerObject.technicalSolutionsComments3}></TextArea>
                            </td>
                          </tr>
                          <tr>

                            <td className="col-sm-3">Testing</td>
                            <td>
                              <select className="form-control" id="ratings_id11" onChange={this.handleOnChange} name="technicalSolutionsRatings4" value={currManagerObject.technicalSolutionsRatings4}>
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
                    <div className="margin-small">
                      <div className="col-sm-4"><label>Interview Status</label><span className="mandatory">*</span></div>
                        <div className="col-sm-6">
                          <div className="form-group experience-width">
                            <select required className="form-control experience-width" onChange = {this.handleOnChange} name="managerInterviewStatus"
                            id="managerInterviewStatusId" value ={currManagerObject.managerInterviewStatus}>
                              <option>Yet to be interviewed</option>
                              <option>Not Cleared</option>
                              <option>On Hold</option>
                              <option>Cleared</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="pd-small">
                        <center>
                        <table className="table table-bordered table-responsive remarks-width" id="manager_evaluation_remarks_id">
                          <thead>
                            <tr>
                              <th>Proficiency</th>
                              <th>Technical Skills<span className="mandatory">*</span></th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td><strong>Excellent In</strong></td>
                              <td><TextArea required rows="2" cols="50" onChange = {this.handleOnChange} name="excellentRemark"
                              id="excellentRemarkId" placeholder="Please enter the comments" value={currManagerObject.excellentRemark}></TextArea></td>
                            </tr>
                            <tr>
                              <td><strong>Good In</strong></td>
                              <td><TextArea required rows="2" cols="50" onChange = {this.handleOnChange} name="goodRemark"
                              id="goodRemarkId" placeholder="Please enter the comments" value={currManagerObject.goodRemark}></TextArea></td>
                            </tr>
                            <tr>
                              <td><strong>Average In</strong></td>
                              <td><TextArea required rows="2" cols="50" onChange = {this.handleOnChange} name="averageRemark"
                              id="averageRemarkId" placeholder="Please enter the comments" value={currManagerObject.averageRemark}></TextArea></td>
                            </tr>
                            <tr>
                              <td><strong>Poor In</strong></td>
                              <td><TextArea required rows="2" cols="50" onChange = {this.handleOnChange} name="poorRemark"
                              id="poorRemarkId" placeholder="Please enter the comments" value={currManagerObject.poorRemark}></TextArea></td>
                            </tr>

                            <tr>
                              <td><strong>Comments</strong></td>
                              <td><TextArea required rows="2" cols="50" onChange = {this.handleOnChange} name="finalRemark"
                              id="finalRemarkId" placeholder="Please enter the comments" value={currManagerObject.finalRemark}></TextArea></td>
                            </tr>
                          </tbody>
                        </table>
                        </center>
                      </div>
                      <div className="margin-small">
                        {
                          currManagerObject._id &&
                          <Button className="move-right"
                            onClick={(e)=>this.handleUpdateManagerForm(e, currManagerObject._id, managerEvaluationData)}>Update</Button>
                        }
                        { !currManagerObject._id &&
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
