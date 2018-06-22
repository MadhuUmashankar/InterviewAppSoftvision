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
       clientOrientationComment:'',
       planningControl:'',
       peopleManagement:'',
       projectManagementRatings:'',
       projectManagementComment:'',
       leadership:'',
       leadershipRatings: '',
       leadershipComments: '',
       communication: '',
       communicationRatings: '',
       communicationComments: '',
       domain: '',
       domainRatings: '',
       domainComments: '',
       candidateData: props.candidateData
     };

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmitManagerForm = this.handleSubmitManagerForm.bind(this);
    this.handleEvaluationStatusSave = this.handleEvaluationStatusSave.bind(this);
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
        case "clientOrientationComment":
            this.setState({clientOrientationComment : event.target.value})
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
        case "projectManagementComment":
            this.setState({projectManagementComment : event.target.value})
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

        default:
            break;
    }
  }


  handleSubmitManagerForm(e) {
    e.preventDefault();

  }

  render() {
    let {candidateData} = this.state;


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
                                      value
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
                                      value
                                      autoFocus="true"
                                      maxLength="15"
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
                                      value
                                      autoFocus="true"
                                      maxLength="15"
                                      required
                                      onChange = {this.handleOnChange}
                                  />
                                </td>
                              </tr>
                            </td>
                            <td>
                              <select className="form-control" id="ratings_id1" name="clientOrientationRatings" onChange={this.handleOnChange}
                                value>
                                  <option>Select</option>
                                  <option>0 - Not Applicaple</option>
                                  <option>1 - Below Expectation</option>
                                  <option>2 - Needs Improvement</option>
                                  <option>3 - Meets Expectation</option>
                                  <option>4 - Exceeds Expectation</option>
                              </select>
                            </td>
                            <td>
                              <textarea required rows="2" cols="25" onChange = {this.handleOnChange} name="clientOrientationComment"
                              id="clientOrientationId" ></textarea>
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
                                      value
                                      autoFocus="true"
                                      maxLength="15"
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
                                      value
                                      autoFocus="true"
                                      maxLength="15"
                                      required
                                      onChange = {this.handleOnChange}
                                  />
                                </td>
                              </tr>
                            </td>
                            <td>
                              <select className="form-control" id="ratings_id2" name="projectManagementRatings" onChange={this.handleOnChange}>
                                  <option>Select</option>
                                  <option>0 - Not Applicaple</option>
                                  <option>1 - Below Expectation</option>
                                  <option>2 - Needs Improvement</option>
                                  <option>3 - Meets Expectation</option>
                                  <option>4 - Exceeds Expectation</option>
                              </select>
                            </td>
                            <td>
                              <textarea required rows="2" cols="25" onChange = {this.handleOnChange} name="projectManagementComment"
                              id="projectManagementId" ></textarea>
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
                                      value
                                      autoFocus="true"
                                      maxLength="15"
                                      required
                                      onChange = {this.handleOnChange}
                                  />
                                </td>
                              </tr>
                            </td>
                            <td>
                              <select className="form-control" id="ratings_id3" name="leadershipRatings" onChange={this.handleOnChange}>
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
                              id="leadershipCommentsId" ></textarea>
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
                                    value
                                    autoFocus="true"
                                    maxLength="15"
                                    required
                                    onChange = {this.handleOnChange}
                                />

                                </td>
                              </tr>
                            </td>
                            <td>
                              <select className="form-control" id="ratings_id3" onChange={this.handleOnChange} name="communicationRatings">
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
                              id="communicationCommentsId" ></textarea>
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
                                      value
                                      autoFocus="true"
                                      maxLength="15"
                                      required
                                      onChange = {this.handleOnChange}
                                  />
                                </td>
                              </tr>
                            </td>
                            <td>
                              <select className="form-control" id="ratings_id3" name = "domainRatings" onChange={this.handleOnChange}>
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
                              id="domainCommentsId" ></textarea>
                            </td>
                          </tr>
                          <tr>
                            <td>Technical Solutions</td>
                            <td className="col-sm-2">
                              <tr>
                                <td>Requirement gathering
                                  <input type="text"/>
                                </td>
                              </tr>
                              <tr>
                                <td>Architect/ Design
                                  <input type="text"/>
                                </td>
                              </tr>
                              <tr>
                                <td>Coding
                                  <input type="text"/>
                                </td>
                              </tr>
                              <tr>
                                <td>Testing
                                  <input type="text"/>
                                </td>
                              </tr>
                            </td>
                            <td>
                              <select className="form-control" id="ratings_id1" onChange={this.handleOnChange}>
                                  <option>Select</option>
                                  <option>0 - Not Applicaple</option>
                                  <option>1 - Below Expectation</option>
                                  <option>2 - Needs Improvement</option>
                                  <option>3 - Meets Expectation</option>
                                  <option>4 - Exceeds Expectation</option>
                              </select>
                            </td>
                            <td>
                              <textarea required rows="2" cols="25" onChange = {this.handleOnChange} name="technicalSolutions"
                              id="technicalSolutionsId" ></textarea>
                            </td>
                          </tr>

                        </tbody>
                      </table>


                    </div>
                    <div className="margin-small">
                      <EvaluationStatus onEvaluationStatusSave= {this.handleEvaluationStatusSave} candidate={candidate} data={data[index]} />
                    </div>
                      <div className="margin-small">
                      {
                        data[index] &&
                        <Button className="move-right" onClick={(e)=>{this.handleUpdate(e, data[index]._id, data)}}>Update</Button>
                      }
                      {
                        !data[index] && <Button className="move-right" type="submit">Save</Button>
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
