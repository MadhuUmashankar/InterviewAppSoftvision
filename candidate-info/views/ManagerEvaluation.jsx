import React, { Component } from 'react';
import Summary from './Summary';
import EvaluationStatus from './EvaluationStatus';
import { Modal,Button } from 'react-bootstrap';
import axios from 'axios';

class ManagerEvaluation extends Component {
  constructor(props, context) {
     super(props, context);

     this.state = {
       show: false,
       data: [],
       interviewStatus:{},
       candidate:props.candidate,
       url: props.url,
       index:props.index
     };

    this.handleSubmitManagerForm = this.handleSubmitManagerForm.bind(this);
    this.loadDetailsFromServerForIASheet = this.loadDetailsFromServerForIASheet.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSummaryData = this.handleSummaryData.bind(this);
    this.handleEvaluationStatusSave = this.handleEvaluationStatusSave.bind(this);
   }

   loadDetailsFromServerForIASheet() {
     let iaUrl = this.state.url + '/newIAForm';
       axios.get(iaUrl)
           .then(res => {
             console.log('response from server IA data', res.data);
               this.setState({ data: res.data });
           })
   }


  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  componentDidMount() {
      this.loadDetailsFromServerForIASheet();
  }

  handleSummaryData(summary) {
    this.setState({summaryData: summary});
  }
  handleEvaluationStatusSave(estatus) {
    this.setState({interviewStatus: estatus})
  }

  handleUpdate(e, id, record) {
    e.preventDefault();

    const {detailsData, candidate, experience, expertiseData, impression, summaryData, data, interviewStatus} = this.state;
    const fullname = candidate.firstname + " " + candidate.lastname;
    const updatedrecord = Object.assign({}, detailsData, {candidateName: fullname}, {experience},{rows: expertiseData}, {impression}, {summaryData}, interviewStatus)
    let iaUrl = this.props.url + '/newIAForm';
    this.setState({ show: false });

      //sends the new candidate id and new candidate to our api
      axios.put(`${iaUrl}/${id}`, updatedrecord)
          .catch(err => {
              console.log(err);
          })
    this.loadDetailsFromServerForIASheet();
    location.reload(true);
  }


  handleSubmitManagerForm(e) {
    e.preventDefault();
    const {detailsData, candidate, experience, expertiseData, impression, summaryData, interviewStatus} = this.state;
    // Candidate IA Form data
    const fullname = candidate.firstname + " " + candidate.lastname;

    const record = Object.assign({}, detailsData, {candidateName: fullname}, {experience},{rows: expertiseData}, {impression}, {summaryData}, interviewStatus)
    this.setState({ show: false });
      if(record) {
          let records = this.state.data;
          let newIAForm = records.concat(record);
          this.setState({ data: newIAForm });

          axios.post(this.props.url + '/newIAForm', record)
              .catch(err => {
                  console.error(err);
                  this.setState({ data: records });
              });
      }
    this.loadDetailsFromServerForIASheet();
    location.reload(true);
  }

  render() {
    let {candidate, url, data, index} = this.state;


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
                                  <input type="text"/>
                                </td>
                              </tr>
                              <tr>
                                <td>Follow client process
                                  <input type="text"/>
                                </td>
                              </tr>
                              <tr>
                                <td>Developing relationsships with client
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
                              <textarea required rows="2" cols="25" onChange = {this.handleOnChange} name="clientOrientation"
                              id="clientOrientationId" ></textarea>
                            </td>
                          </tr>

                          <tr>
                            <td>Project Management</td>
                            <td className="col-sm-2">
                              <tr>
                                <td>Planning Control
                                  <input type="text"/>
                                </td>
                              </tr>
                              <tr>
                                <td>People Management
                                  <input type="text"/>
                                </td>
                              </tr>
                            </td>
                            <td>
                              <select className="form-control" id="ratings_id2" onChange={this.handleOnChange}>
                                  <option>Select</option>
                                  <option>0 - Not Applicaple</option>
                                  <option>1 - Below Expectation</option>
                                  <option>2 - Needs Improvement</option>
                                  <option>3 - Meets Expectation</option>
                                  <option>4 - Exceeds Expectation</option>
                              </select>
                            </td>
                            <td>
                              <textarea required rows="2" cols="25" onChange = {this.handleOnChange} name="projectManagement"
                              id="projectManagementId" ></textarea>
                            </td>
                          </tr>

                          <tr>
                            <td>Leadership</td>
                            <td className="col-sm-2">
                              <tr>
                                <td>
                                  <input type="text"/>
                                </td>
                              </tr>
                            </td>
                            <td>
                              <select className="form-control" id="ratings_id3" onChange={this.handleOnChange}>
                                  <option>Select</option>
                                  <option>0 - Not Applicaple</option>
                                  <option>1 - Below Expectation</option>
                                  <option>2 - Needs Improvement</option>
                                  <option>3 - Meets Expectation</option>
                                  <option>4 - Exceeds Expectation</option>
                              </select>
                            </td>
                            <td>
                              <textarea required rows="2" cols="25" onChange = {this.handleOnChange} name="leadership"
                              id="leadershipId" ></textarea>
                            </td>
                          </tr>

                          <tr>
                            <td>Communication</td>
                            <td className="col-sm-2">
                              <tr>
                                <td>
                                  <input type="text"/>
                                </td>
                              </tr>
                            </td>
                            <td>
                              <select className="form-control" id="ratings_id3" onChange={this.handleOnChange}>
                                  <option>Select</option>
                                  <option>0 - Not Applicaple</option>
                                  <option>1 - Below Expectation</option>
                                  <option>2 - Needs Improvement</option>
                                  <option>3 - Meets Expectation</option>
                                  <option>4 - Exceeds Expectation</option>
                              </select>
                            </td>
                            <td>
                              <textarea required rows="2" cols="25" onChange = {this.handleOnChange} name="communication"
                              id="communicationId" ></textarea>
                            </td>
                          </tr>

                          <tr>
                            <td>Domain (Business/Technology)</td>
                            <td className="col-sm-2">
                              <tr>
                                <td>
                                  <input type="text"/>
                                </td>
                              </tr>
                            </td>
                            <td>
                              <select className="form-control" id="ratings_id3" onChange={this.handleOnChange}>
                                  <option>Select</option>
                                  <option>0 - Not Applicaple</option>
                                  <option>1 - Below Expectation</option>
                                  <option>2 - Needs Improvement</option>
                                  <option>3 - Meets Expectation</option>
                                  <option>4 - Exceeds Expectation</option>
                              </select>
                            </td>
                            <td>
                              <textarea required rows="2" cols="25" onChange = {this.handleOnChange} name="domain"
                              id="domainId" ></textarea>
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
