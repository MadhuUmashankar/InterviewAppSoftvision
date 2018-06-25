import React, { Component } from 'react';
import Summary from './Summary';
import EvaluationStatus from './EvaluationStatus';
import { Modal,Button } from 'react-bootstrap';
import axios from 'axios';
import InputBox from './InputBox';

class ManagerEvaluation extends Component {
  constructor(props, context) {
     super(props, context);

     this.state = {
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
       candidateData: props.candidateData
     };

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmitManagerForm = this.handleSubmitManagerForm.bind(this);
   }


  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleOnChange(event) {
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


        default:
            break;
    }
  }


  handleSubmitManagerForm(e) {
    e.preventDefault();
    const {customerNeeds, clientProcess, clientRelationship, clientOrientationRatings, clientOrientationComments, planningControl, peopleManagement, projectManagementRatings, projectManagementComments, leadership, leadershipRatings, leadershipComments, communication, communicationRatings, communicationComments, domain, domainRatings, domainComments, requirementGathering, architecht, coding, testing, technicalSolutionsRatings, technicalSolutionsComments} = this.state;
    // Candidate Manager


     const managerRecord = Object.assign({}, customerNeeds, clientProcess, clientRelationship, clientOrientationRatings, clientOrientationComments, planningControl, peopleManagement, projectManagementRatings, projectManagementComments, leadership, leadershipRatings, leadershipComments, communication, communicationRatings, communicationComments, domain, domainRatings, domainComments, requirementGathering, architecht, coding, testing, technicalSolutionsRatings, technicalSolutionsComments);
    this.setState({ show: false });
    console.log('inside save managerRecord', managerRecord);
    //   if(managerRecord) {
    //       let records = this.state.IAdata;
    //       let newIAForm = records.concat(managerRecord);
    //       this.setState({ IAdata: newIAForm });
    //
    //       axios.post(this.props.url + '/newManagerForm', managerRecord)
    //           .catch(err => {
    //               console.error(err);
    //               this.setState({ IAdata: records });
    //           });
    //   }

  }

  render() {
    let {candidateData, customerNeeds, clientProcess, clientRelationship, clientOrientationRatings, clientOrientationComments, planningControl, peopleManagement, projectManagementRatings, projectManagementComments, leadership, leadershipRatings, leadershipComments, communication, communicationRatings, communicationComments, domain, domainRatings, domainComments, requirementGathering, architecht, coding, testing, technicalSolutionsRatings, technicalSolutionsComments} = this.state;

console.log('wat is candidateData in Manager', candidateData)

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
                              <td>Candidate Name</td><td></td>
                              <td>Candidate Id</td><td></td>
                              <td>Interview Type</td><td></td>
                            </tr>
                            <tr>
                              <td>Interviewer</td><td></td>
                              <td>Job Title</td><td></td>
                              <td>Interview Round</td><td></td>
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
                                      value= {customerNeeds}
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
                                      value={clientProcess}
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
                                      value={clientRelationship}
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
                              <textarea required rows="2" cols="25" onChange = {this.handleOnChange} name="clientOrientationComments"
                              id="clientOrientationCommentsId" value={clientOrientationComments}></textarea>
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
                                      value={planningControl}
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
                                      value={peopleManagement}
                                      required
                                      onChange = {this.handleOnChange}
                                  />
                                </td>
                              </tr>
                            </td>
                            <td>
                              <select className="form-control" id="ratings_id2" name="projectManagementRatings" onChange={this.handleOnChange} value={projectManagementRatings}>
                                  <option>Select</option>
                                  <option>0 - Not Applicaple</option>
                                  <option>1 - Below Expectation</option>
                                  <option>2 - Needs Improvement</option>
                                  <option>3 - Meets Expectation</option>
                                  <option>4 - Exceeds Expectation</option>
                              </select>
                            </td>
                            <td>
                              <textarea required rows="2" cols="25" onChange = {this.handleOnChange} name="projectManagementComments"
                              id="projectManagementCommentsId" value={projectManagementComments}></textarea>
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
                                      value={leadership}
                                      required
                                      onChange = {this.handleOnChange}
                                  />
                                </td>
                              </tr>
                            </td>
                            <td>
                              <select className="form-control" id="ratings_id3" name="leadershipRatings" onChange={this.handleOnChange} value={leadershipRatings}>
                                  <option>Select</option>
                                  <option>0 - Not Applicaple</option>
                                  <option>1 - Below Expectation</option>
                                  <option>2 - Needs Improvement</option>
                                  <option>3 - Meets Expectation</option>
                                  <option>4 - Exceeds Expectation</option>
                              </select>
                            </td>
                            <td>
                              <textarea required rows="2" cols="25" onChange = {this.handleOnChange} name="leadershipComments"
                              id="leadershipCommentsId" value={leadershipComments}></textarea>
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
                                    value={communication}
                                    required
                                    onChange = {this.handleOnChange}
                                />

                                </td>
                              </tr>
                            </td>
                            <td>
                              <select className="form-control" id="ratings_id3" onChange={this.handleOnChange} name="communicationRatings" value={communicationRatings}>
                                  <option>Select</option>
                                  <option>0 - Not Applicaple</option>
                                  <option>1 - Below Expectation</option>
                                  <option>2 - Needs Improvement</option>
                                  <option>3 - Meets Expectation</option>
                                  <option>4 - Exceeds Expectation</option>
                              </select>
                            </td>
                            <td>
                              <textarea required rows="2" cols="25" onChange = {this.handleOnChange} name="communicationComments"
                              id="communicationCommentsId" value={communicationComments} ></textarea>
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
                                      value={domain}
                                      required
                                      onChange = {this.handleOnChange}
                                  />
                                </td>
                              </tr>
                            </td>
                            <td>
                              <select className="form-control" id="ratings_id3" name = "domainRatings" onChange={this.handleOnChange} value={domainRatings}>
                                  <option>Select</option>
                                  <option>0 - Not Applicaple</option>
                                  <option>1 - Below Expectation</option>
                                  <option>2 - Needs Improvement</option>
                                  <option>3 - Meets Expectation</option>
                                  <option>4 - Exceeds Expectation</option>
                              </select>
                            </td>
                            <td>
                              <textarea required rows="2" cols="25" onChange = {this.handleOnChange} name="domainComments"
                              id="domainCommentsId" value={domainComments}></textarea>
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
                                      value={requirementGathering}
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
                                      value={architecht}
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
                                      value={coding}
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
                                      value={testing}
                                      onChange = {this.handleOnChange}
                                  />
                                </td>
                              </tr>
                            </td>
                            <td>
                              <select className="form-control" id="ratings_id1" onChange={this.handleOnChange} name="technicalSolutionsRatings" value={technicalSolutionsRatings}>
                                  <option>Select</option>
                                  <option>0 - Not Applicaple</option>
                                  <option>1 - Below Expectation</option>
                                  <option>2 - Needs Improvement</option>
                                  <option>3 - Meets Expectation</option>
                                  <option>4 - Exceeds Expectation</option>
                              </select>
                            </td>
                            <td>
                              <textarea required rows="2" cols="25" onChange = {this.handleOnChange} name="technicalSolutionsComments"
                              id="technicalSolutionsCommentsId" value={technicalSolutionsComments}></textarea>
                            </td>
                          </tr>

                        </tbody>
                      </table>


                    </div>
                    <div className="margin-small">
                                          <EvaluationStatus onEvaluationStatusSave= {this.handleEvaluationStatusSave} candidateData={candidateData}  />
                                        </div>
                                          <div className="margin-small">
                                          {

                                            <Button className="move-right" >Update</Button>
                                          }
                                          {
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
