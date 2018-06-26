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
       customerNeeds: '',
       clientProcess:'',
       clientRelationship:'',
       clientOrientationRatings:'',
       clientOrientationComments:'',
       planningControl:'',
       peopleManagement:'',
       projectManagementRatings:'',
       projectManagementComments:'',
       leadership:'',
       leadershipRatings: '',
       leadershipComments: '',
       communication: '',
       communicationRatings: '',
       communicationComments: '',
       domain: '',
       domainRatings: '',
       domainComments: '',
       requirementGathering: '',
       architecht: '',
       coding: '',
       testing: '',
       technicalSolutionsRatings: '',
       technicalSolutionsComments: '',
       managerInterviewStatus: '',
       url: props.url,
       interviewerName2: '',
       jobTitle: '',
       interviewerRound:''
     };

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmitManagerForm = this.handleSubmitManagerForm.bind(this);
    this.handleUpdateManagerForm = this.handleUpdateManagerForm.bind(this);
   }

   componentDidMount() {
       this.loadManagerDetails();

       const {managerEvaluationData} = this.state;
       const {candidateData, sendInterviewStatus} = this.props;
       let currentManagerRecord = managerEvaluationData.filter((record) => {
         return candidateData.candidateID === record.candidateID
       });

       currentManagerRecord = currentManagerRecord[0];

       if(currentManagerRecord != undefined) {
         if(Object.keys(currentManagerRecord).length > 0) {
           const clientOrientationRatings = currentManagerRecord.clientOrientationRatings ? currentManagerRecord.clientOrientationRatings : "";
           const managerInterviewStatus = currentManagerRecord.managerInterviewStatus ? currentManagerRecord.managerInterviewStatus : "";
           const projectManagementRatings = currentManagerRecord.projectManagementRatings ? currentManagerRecord.projectManagementRatings : "";
           const leadershipRatings = currentManagerRecord.leadershipRatings ? currentManagerRecord.leadershipRatings : "";
           const communicationRatings= currentManagerRecord.communicationRatings ? currentManagerRecord.communicationRatings : "";
           const domainRatings= currentManagerRecord.domainRatings ? currentManagerRecord.domainRatings : "";
           const technicalSolutionsRatings= currentManagerRecord.technicalSolutionsRatings ? currentManagerRecord.technicalSolutionsRatings : "";
           this.setState({managerInterviewStatus, clientOrientationRatings, projectManagementRatings, leadershipRatings, communicationRatings, domainRatings, technicalSolutionsRatings }, ()=>{
             sendInterviewStatus(hrInterviewStatus, "manager")});
         }
     }
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
        case "customerNeeds":
            this.setState({customerNeeds : event.target.value})
            break;
        case "clientProcess":
            this.setState({clientProcess : event.target.value})
            break;
        case "clientRelationship":
            this.setState({clientRelationship : event.target.value})
            break;
        case "clientOrientationRatings":
            this.setState({clientOrientationRatings : event.target.value})
            break;
        case "clientOrientationComments":
            this.setState({clientOrientationComments : event.target.value})
            break;
        case "planningControl":
            this.setState({planningControl : event.target.value})
            break;
        case "peopleManagement":
            this.setState({peopleManagement : event.target.value})
            break;
        case "projectManagementRatings":
            this.setState({projectManagementRatings : event.target.value})
            break;
        case "projectManagementComments":
            this.setState({projectManagementComments : event.target.value})
            break;
        case "leadership":
            this.setState({leadership : event.target.value})
            break;
        case "leadershipRatings":
            this.setState({leadershipRatings : event.target.value})
            break;
        case "leadershipComments":
            this.setState({leadershipComments : event.target.value})
            break;
        case "communication":
            this.setState({communication : event.target.value})
            break;
        case "communicationRatings":
            this.setState({communicationRatings : event.target.value})
            break;
        case "communicationComments":
            this.setState({communicationComments : event.target.value})
            break;
        case "domain":
            this.setState({domain : event.target.value})
            break;
        case "domainRatings":
            this.setState({domainRatings : event.target.value})
            break;
        case "domainComments":
            this.setState({domainComments : event.target.value})
            break;
        case "requirementGathering":
            this.setState({requirementGathering : event.target.value})
            break;
        case "architecht":
            this.setState({architecht : event.target.value})
            break;
        case "coding":
            this.setState({coding : event.target.value})
            break;
        case "testing":
            this.setState({testing : event.target.value})
            break;
        case "technicalSolutionsRatings":
            this.setState({technicalSolutionsRatings : event.target.value})
            break;
        case "technicalSolutionsComments":
            this.setState({technicalSolutionsComments : event.target.value})
            break;
        case "managerInterviewStatus":
            this.setState({managerInterviewStatus : event.target.value})
            sendInterviewStatus(event.target.value, "manager");
            break;
        case "interviewerName2":
            this.setState({interviewerName2 : event.target.value})
            break;
        case "jobTitle":
            this.setState({jobTitle : event.target.value})
            break;
        case "interviewerRound":
            this.setState({interviewerRound : event.target.value})
            break;

        default:
            break;
    }
  }


  handleSubmitManagerForm(e) {
    e.preventDefault();
    const {candidateData} = this.props;
    const {customerNeeds, clientProcess, clientRelationship, clientOrientationRatings, clientOrientationComments, planningControl, peopleManagement, projectManagementRatings, projectManagementComments, leadership, leadershipRatings, leadershipComments, communication, communicationRatings, communicationComments, domain, domainRatings, domainComments, requirementGathering, architecht, coding, testing, technicalSolutionsRatings, technicalSolutionsComments, managerInterviewStatus, interviewerName2, jobTitle, interviewerRound} = this.state;
    // Candidate Manager
     const managerRecord = Object.assign({}, {candidateID: candidateData.candidateID}, {customerNeeds}, {clientProcess}, {clientRelationship}, {clientOrientationRatings}, {clientOrientationComments}, {planningControl}, {peopleManagement}, {projectManagementRatings},{ projectManagementComments}, {leadership}, {leadershipRatings}, {leadershipComments}, {communication}, {communicationRatings}, {communicationComments}, {domain}, {domainRatings}, {domainComments}, {requirementGathering}, {architecht},{coding}, {testing}, {technicalSolutionsRatings}, {technicalSolutionsComments}, {managerInterviewStatus}, {interviewerName2}, {jobTitle}, {interviewerRound});

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
    const {customerNeeds, clientProcess, clientRelationship, clientOrientationRatings, clientOrientationComments, planningControl, peopleManagement, projectManagementRatings, projectManagementComments, leadership, leadershipRatings, leadershipComments, communication, communicationRatings, communicationComments, domain, domainRatings, domainComments, requirementGathering, architecht, coding, testing, technicalSolutionsRatings, technicalSolutionsComments, managerInterviewStatus, interviewerName2, jobTitle, interviewerRound} = this.state;

    const updatedManagerRecord = Object.assign({},{candidateID: candidateData.candidateID}, {customerNeeds}, {clientProcess}, {clientRelationship}, {clientOrientationRatings}, {clientOrientationComments}, {planningControl}, {peopleManagement}, {projectManagementRatings},{ projectManagementComments}, {leadership}, {leadershipRatings}, {leadershipComments}, {communication}, {communicationRatings}, {communicationComments}, {domain}, {domainRatings}, {domainComments}, {requirementGathering}, {architecht},{coding}, {testing}, {technicalSolutionsRatings}, {technicalSolutionsComments}, {managerInterviewStatus}, {interviewerName2}, {jobTitle}, {interviewerRound})

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
    const {managerEvaluationData, customerNeeds, clientProcess, clientRelationship, clientOrientationRatings, clientOrientationComments, planningControl, peopleManagement, projectManagementRatings, projectManagementComments, leadership, leadershipRatings, leadershipComments, communication, communicationRatings, communicationComments, domain, domainRatings, domainComments, requirementGathering, architecht, coding, testing, technicalSolutionsRatings, technicalSolutionsComments, managerInterviewStatus, interviewerName2, jobTitle, interviewerRound}
     = this.state;

    const {candidateData, interViewToBeTaken} = this.props;

    let currentManagerRecord = managerEvaluationData.filter((record) => {
      return candidateData.candidateID === record.candidateID
    });
    currentManagerRecord = currentManagerRecord[0];
    console.log("currentManagerRecord", currentManagerRecord)

    const candidateFullname = candidateData.firstname + " " + candidateData.lastname;

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
                              <td>Candidate Name</td><td>{candidateFullname}</td>
                              <td>Candidate Id</td><td>{candidateData.candidateID}</td>
                              <td>Interview Type</td><td>{interViewToBeTaken}</td>
                            </tr>
                            <tr>
                              <td>Interviewer</td><td><InputBox
                                  type="text"
                                  placeholder="Enter Interviewer's name"
                                  classname="form-control"
                                  name="interviewerName2"
                                  id="interviewerId2"
                                  value = {currentManagerRecord ? currentManagerRecord.interviewerName2 : this.state.interviewerName2 }
                                  maxLength="20"
                                  required
                                  onChange = {this.handleOnChange}
                              /></td>
                              <td>Job Title</td><td><InputBox
                                  type="text"
                                  placeholder="Enter Interviewer's name"
                                  classname="form-control"
                                  name="jobTitle"
                                  id="jobTitleId"
                                  value = {currentManagerRecord ? currentManagerRecord.jobTitle : this.state.jobTitle }
                                  maxLength="20"
                                  required
                                  onChange = {this.handleOnChange}
                              /></td>
                              <td>Interview Round</td><td><InputBox
                                  type="text"
                                  placeholder="Enter the round"
                                  classname="form-control"
                                  name="interviewerRound"
                                  id="interviewerRoundId1"
                                  value = {currentManagerRecord ? currentManagerRecord.interviewerRound : this.state.interviewerRound }
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
                            <th colSpan="2" className="evaluation-criteria">Evaluation Criteria</th>
                            <th>Ratings</th>
                            <th>Comments</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Client Orientation</td>
                            <td className="col-sm-2">
                              <tr>
                                <td>Understanding Customer Needs
                                  <InputBox
                                      type="text"
                                      classname="form-control"
                                      name="customerNeeds"
                                      id="customerNeedsId"
                                      value= {currentManagerRecord ? currentManagerRecord.customerNeeds : customerNeeds}
                                      autoFocus="true"
                                      maxLength="15"
                                      required
                                      onChange = {this.handleOnChange}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td>Follow client process
                                  <InputBox
                                      type="text"
                                      classname="form-control"
                                      name="clientProcess"
                                      id="clientProcessId"
                                      value={currentManagerRecord ? currentManagerRecord.clientProcess : clientProcess}
                                      required
                                      onChange = {this.handleOnChange}
                                  />

                                </td>
                              </tr>
                              <tr>
                                <td>Developing relationships with client
                                  <InputBox
                                      type="text"
                                      classname="form-control"
                                      name="clientRelationship"
                                      id="clientRelationshipId"
                                      value={currentManagerRecord ? currentManagerRecord.clientRelationship : clientRelationship}
                                      required
                                      onChange = {this.handleOnChange}
                                  />
                                </td>
                              </tr>
                            </td>
                            <td>
                              <select className="form-control" id="ratings_id1" name="clientOrientationRatings" onChange={this.handleOnChange}
                                value={clientOrientationRatings}>
                                  <option>Select</option>
                                  <option>0 - Not Applicaple</option>
                                  <option>1 - Below Expectation</option>
                                  <option>2 - Needs Improvement</option>
                                  <option>3 - Meets Expectation</option>
                                  <option>4 - Exceeds Expectation</option>
                              </select>
                            </td>
                            <td>
                              <TextArea required rows="2" cols="25" onChange = {this.handleOnChange} name="clientOrientationComments"
                              id="clientOrientationCommentsId" value={currentManagerRecord ? currentManagerRecord.clientOrientationComments : clientOrientationComments}></TextArea>
                            </td>
                          </tr>

                          <tr>
                            <td>Project Management</td>
                            <td className="col-sm-2">
                              <tr>
                                <td>Planning Control
                                  <InputBox
                                      type="text"
                                      classname="form-control"
                                      name="planningControl"
                                      id="planningControlId"
                                      value={currentManagerRecord ? currentManagerRecord.planningControl : planningControl}
                                      required
                                      onChange = {this.handleOnChange}
                                  />

                                </td>
                              </tr>
                              <tr>
                                <td>People Management
                                  <InputBox
                                      type="text"
                                      classname="form-control"
                                      name="peopleManagement"
                                      id="peopleManagementId"
                                      value={currentManagerRecord ? currentManagerRecord.peopleManagement : peopleManagement}
                                      required
                                      onChange = {this.handleOnChange}
                                  />
                                </td>
                              </tr>
                            </td>
                            <td>
                              <select className="form-control" id="ratings_id2" name="projectManagementRatings" onChange={this.handleOnChange} value={ projectManagementRatings}>
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
                              id="projectManagementCommentsId" value={currentManagerRecord ? currentManagerRecord.projectManagementComments : projectManagementComments}></TextArea>
                            </td>
                          </tr>

                          <tr>
                            <td>Leadership</td>
                            <td className="col-sm-2">
                              <tr>
                                <td>
                                  <InputBox
                                      type="text"
                                      classname="form-control"
                                      name="leadership"
                                      id="leadershipId"
                                      value={currentManagerRecord ? currentManagerRecord.leadership : leadership}
                                      required
                                      onChange = {this.handleOnChange}
                                  />
                                </td>
                              </tr>
                            </td>
                            <td>
                              <select className="form-control" id="ratings_id3" name="leadershipRatings" onChange={this.handleOnChange} value={currentManagerRecord ? currentManagerRecord.leadershipRatings : leadershipRatings}>
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
                              id="leadershipCommentsId" value={currentManagerRecord ? currentManagerRecord.leadershipComments : leadershipComments}></TextArea>
                            </td>
                          </tr>

                          <tr>
                            <td>Communication</td>
                            <td className="col-sm-2">
                              <tr>
                                <td><InputBox
                                    type="text"
                                    classname="form-control"
                                    name="communication"
                                    id="communicationId"
                                    value={currentManagerRecord ? currentManagerRecord.communication : communication}
                                    required
                                    onChange = {this.handleOnChange}
                                />

                                </td>
                              </tr>
                            </td>
                            <td>
                              <select className="form-control" id="ratings_id3" onChange={this.handleOnChange} name="communicationRatings" value={currentManagerRecord ? currentManagerRecord.communicationRatings : communicationRatings}>
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
                              id="communicationCommentsId" value={currentManagerRecord ? currentManagerRecord.communicationComments : communicationComments} ></TextArea>
                            </td>
                          </tr>

                          <tr>
                            <td>Domain (Business/Technology)</td>
                            <td className="col-sm-2">
                              <tr>
                                <td>
                                  <InputBox
                                      type="text"
                                      classname="form-control"
                                      name="domain"
                                      id="domainId"
                                      value={currentManagerRecord ? currentManagerRecord.domain : domain}
                                      required
                                      onChange = {this.handleOnChange}
                                  />
                                </td>
                              </tr>
                            </td>
                            <td>
                              <select className="form-control" id="ratings_id3" name = "domainRatings" onChange={this.handleOnChange} value={currentManagerRecord ? currentManagerRecord.domainRatings : domainRatings}>
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
                              id="domainCommentsId" value={currentManagerRecord ? currentManagerRecord.domainComments : domainComments}></TextArea>
                            </td>
                          </tr>
                          <tr>
                            <td>Technical Solutions</td>
                            <td className="col-sm-2">
                              <tr>
                                <td>Requirement gathering
                                  <InputBox
                                      type="text"
                                      classname="form-control"
                                      name="requirementGathering"
                                      id="requirementGatheringId"
                                      value={currentManagerRecord ? currentManagerRecord.requirementGathering : requirementGathering}
                                      onChange = {this.handleOnChange}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td>Architect/ Design
                                  <InputBox
                                      type="text"
                                      classname="form-control"
                                      name="architecht"
                                      id="architechtId"
                                      value={currentManagerRecord ? currentManagerRecord.architecht : architecht}
                                      onChange = {this.handleOnChange}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td>Coding
                                  <InputBox
                                      type="text"
                                      classname="form-control"
                                      name="coding"
                                      id="codingId"
                                      value={currentManagerRecord ? currentManagerRecord.coding : coding}
                                      onChange = {this.handleOnChange}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td>Testing
                                  <InputBox
                                      type="text"
                                      classname="form-control"
                                      name="testing"
                                      id="testingId"
                                      value={currentManagerRecord ? currentManagerRecord.testing : testing}
                                      onChange = {this.handleOnChange}
                                  />
                                </td>
                              </tr>
                            </td>
                            <td>
                              <select className="form-control" id="ratings_id1" onChange={this.handleOnChange} name="technicalSolutionsRatings" value={currentManagerRecord ? currentManagerRecord.technicalSolutionsRatings : technicalSolutionsRatings}>
                                  <option>Select</option>
                                  <option>0 - Not Applicaple</option>
                                  <option>1 - Below Expectation</option>
                                  <option>2 - Needs Improvement</option>
                                  <option>3 - Meets Expectation</option>
                                  <option>4 - Exceeds Expectation</option>
                              </select>
                            </td>
                            <td>
                              <TextArea required rows="2" cols="25" onChange = {this.handleOnChange} name="technicalSolutionsComments"
                              id="technicalSolutionsCommentsId" value={currentManagerRecord ? currentManagerRecord.technicalSolutionsComments : technicalSolutionsComments}></TextArea>
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
                            id="managerInterviewStatusId" value ={managerInterviewStatus}>
                              <option>Yet to be interviewed</option>
                              <option>Rejected</option>
                              <option>Selected</option>
                              <option>On Hold</option>
                              <option>Withdraw</option>
                              <option>Move to Technical round 2</option>
                              <option>Move to Manager round</option>
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

                      <Button className="" onClick={this.handleClose}>Close</Button>
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
