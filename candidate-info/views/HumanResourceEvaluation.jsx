import React, { Component } from 'react';
import EvaluationStatus from './EvaluationStatus';
import { Modal,Button } from 'react-bootstrap';
import TextArea from './TextArea';
import axios from 'axios';
import InputBox from './InputBox'

class HumanResourceEvaluation extends Component {
  constructor(props, context) {
     super(props, context);

     this.state = {
       hrEvaluationData:[],
       show: false,
       url: props.url,
       hrInterviewStatus:'',
       interviewerName1: '',
       jobTitle: '',
       interviewerRound:''
     };

    this.handleSubmitHrForm = this.handleSubmitHrForm.bind(this);
    this.handleUpdateHRForm = this.handleUpdateHRForm.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
   }

   componentDidMount() {
       this.loadHRDetails();
     //   const {hrEvaluationData} = this.state;
     //   const {candidateData, sendInterviewStatus} = this.props;
     //   let currentHRRecord = hrEvaluationData.filter((record) => {
     //     return candidateData.candidateID === record.candidateID
     //   });
     //
     //   currentHRRecord = currentHRRecord[0];
     //
     //   if(currentHRRecord != undefined) {
     //     if(Object.keys(currentHRRecord).length > 0) {
     //       const hrInterviewStatus = currentHRRecord.hrInterviewStatus ? currentHRRecord.hrInterviewStatus : "";
     //       this.setState({hrInterviewStatus},()=>{
     //         sendInterviewStatus(hrInterviewStatus, "hr");
     //       });
     //
     //     }
     // }
   }


   loadHRDetails() {
     let hrUrl = this.props.url + '/newHREvaluationForm';
       axios.get(hrUrl)
           .then(res => {
             console.log('response from server HR data', res.data);
               this.setState({ hrEvaluationData: res.data });
           })
   }
  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleOnChange(event) {
     const {sendInterviewStatus,idx} = this.props;
      switch (event.target.name) {
          case "intelligence":
              this.setState({intelligence : event.target.value})
              break;
          case "intensity":
              this.setState({intensity : event.target.value})
              break;
          case "commitment":
              this.setState({commitment : event.target.value})
              break;
          case "teamWork":
              this.setState({teamWork : event.target.value})
              break;
          case "hrInterviewStatus":
              this.setState({hrInterviewStatus : event.target.value});
                sendInterviewStatus(event.target.value, "hr",idx);
              break;
          case "interviewerName1":
              this.setState({interviewerName1 : event.target.value})
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

  handleSubmitHrForm(e) {
    e.preventDefault();

    const {intelligence, intensity, commitment, teamWork, hrInterviewStatus, interviewerName1, jobTitle, interviewerRound} = this.state;
    const {candidateData} = this.props;
    // Candidate HR Form data

    const hrRecord = Object.assign({}, {candidateID: candidateData.candidateID}, {intelligence}, {intensity}, {commitment}, {teamWork}, {hrInterviewStatus}, {interviewerName1}, {jobTitle}, {interviewerRound})
    this.setState({ show: false });
      if(hrRecord) {
          let records = this.state.hrEvaluationData;
          let newHREvaluationForm = records.concat(hrRecord);
          this.setState({ hrEvaluationData: newHREvaluationForm });

          axios.post(this.props.url + '/newHREvaluationForm', hrRecord)
              .catch(err => {
                  console.error(err);
                  this.setState({ hrEvaluationData: records });
              });
      }
      this.loadHRDetails();
  }

  handleUpdateHRForm(e, id, record) {
    e.preventDefault();
    const {candidateData} = this.props;
    const {intelligence, intensity, commitment, teamWork, hrInterviewStatus, interviewerName1, jobTitle, interviewerRound} = this.state;
    let intelligence1 =  intelligence ? intelligence : record[0].intelligence;
    let intensity1 =  intensity ? intensity : record[0].intensity;
    let commitment1 =  commitment ? commitment : record[0].commitment;
    let teamWork1 =  teamWork ? teamWork : record[0].teamWork;
    let hrInterviewStatus1 =  hrInterviewStatus ? hrInterviewStatus : record[0].hrInterviewStatus;
    let interviewerName2 =  interviewerName1 ? interviewerName1 : record[0].interviewerName1;
    let jobTitle1 =  jobTitle ? jobTitle : record[0].jobTitle;
    let interviewerRound1 =  interviewerRound ? interviewerRound : record[0].interviewerRound;
    const updatedHRrecord = Object.assign({}, {candidateID: candidateData.candidateID}, {intelligence:intelligence1}, {intensity:intensity1}, {commitment:commitment1}, {teamWork:teamWork1}, {hrInterviewStatus:hrInterviewStatus1}, {interviewerName1:interviewerName2}, {jobTitle:jobTitle1}, {interviewerRound:interviewerRound1})
    let iaUrl = this.props.url + '/newHREvaluationForm';
    this.setState({ show: false });

    //sends the new candidate id and new candidate to our api
    axios.put(`${iaUrl}/${id}`, updatedHRrecord)
        .catch(err => {
            console.log(err);
        })
    this.loadHRDetails();
  }

  render() {
    const {hrEvaluationData, intelligence, intensity, commitment, teamWork, hrInterviewStatus, interviewerName1, jobTitle, interviewerRound} = this.state;


    const {candidateData, interViewToBeTaken} = this.props;

    let currentHRRecord = hrEvaluationData.filter((record) => {
      return candidateData.candidateID === record.candidateID
    });

    currentHRRecord = currentHRRecord[0];
    const currHRObject = currentHRRecord || {};
    const candidateFullname = candidateData.firstname + " " + candidateData.lastname;

    return (
      <div>
        <Button bsStyle="primary" onClick={()=>{this.handleShow()}}>
          HR Form
        </Button>

        <Modal bsSize="large" show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
          <h2 className="ia-form-title">Human Resource Evaluation Form</h2>
          </Modal.Header>
          <Modal.Body>
            <div className="form-container">
              <form className="form-horizontal" onSubmit= {this.handleSubmitHrForm}>
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
                                  name="interviewerName1"
                                  id="interviewerId1"
                                  value = {currHRObject.interviewerName1 || this.state.interviewerName1 }
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
                                  value = {currHRObject.jobTitle || this.state.jobTitle }
                                  maxLength="20"
                                  required
                                  onChange = {this.handleOnChange}
                              /></td>
                            <td><strong>Interview Round</strong><span className="mandatory">*</span></td><td><InputBox
                                  type="text"
                                  placeholder="Enter the round"
                                  classname="form-control"
                                  name="interviewerRound"
                                  id="interviewerRoundId"
                                  value = {currHRObject.interviewerRound || this.state.interviewerRound }
                                  maxLength="20"
                                  required
                                  onChange = {this.handleOnChange}
                              /></td>
                            </tr>
                          </tbody>
                        </table>
                    </div>

                    <div>

                      <div className="margin-small">
                        <p><u>Intelligence</u><span className="mandatory">*</span></p>
                        In terms of academic achievement, verbal expression, perception, analytic, conceptual ability, and judgement, how would you rate the candidates ability?
                            <span className=""><TextArea required rows="4" cols="100" placeholder="Comments" onChange = {this.handleOnChange} name="intelligence" id="intelligenceId" value={currHRObject.intelligence}></TextArea></span>
                      </div>

                      <div className="margin-small">
                        <p><u>Intensity</u><span className="mandatory">*</span></p>
                        In terms of academic achievement, verbal expression, perception, analytic, conceptual ability, and judgement, how would you rate the candidates ability?
                          <span className=""><TextArea required rows="4" cols="100" placeholder="Comments" onChange = {this.handleOnChange} name="intensity" id="intensityId" value={currHRObject.intensity}></TextArea></span>
                      </div>

                      <div className="margin-small">
                        <p><u>Commitment</u><span className="mandatory">*</span></p>
                        In terms of academic achievement, verbal expression, perception, analytic, conceptual ability, and judgement, how would you rate the candidates ability?
                            <span className=""><TextArea required rows="4" cols="100" placeholder="Comments" onChange = {this.handleOnChange} name="commitment" id="commitmentId" value={currHRObject.commitment}></TextArea></span>
                      </div>

                      <div className="margin-small">
                        <p><u>TeamWork</u><span className="mandatory">*</span></p>
                        In terms of academic achievement, verbal expression, perception, analytic, conceptual ability, and judgement, how would you rate the candidates ability?
                            <span className=""><TextArea required rows="4" cols="100" placeholder="Comments" onChange = {this.handleOnChange} name="teamWork" id="teamWorkId" value={currHRObject.teamWork} ></TextArea></span>
                      </div>

                    </div>

                    <div className="margin-small pd-small">

                      <div className="col-sm-4"><label>Interview Status</label><span className="mandatory">*</span></div>
                      <div className="col-sm-6">
                        <div className="form-group experience-width">
                          <select required className="form-control" onChange = {this.handleOnChange} name="hrInterviewStatus"
                          id="hrInterviewStatusId" value ={currHRObject.hrInterviewStatus}>
                            <option>Yet to be interviewed</option>
                            <option>Rejected</option>
                            <option>Selected</option>
                            <option>On Hold</option>
                            <option>Withdraw</option>
                            <option>Took other offer</option>
                          </select>
                        </div>
                    </div>
                    </div>
                      <div className="margin-small">
                      {
                        currentHRRecord &&
                        <Button className="move-right"
                          onClick={(e)=>this.handleUpdateHRForm(e, currentHRRecord._id, hrEvaluationData)}>Update</Button>
                      }
                      { !currentHRRecord &&
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

export default HumanResourceEvaluation;
