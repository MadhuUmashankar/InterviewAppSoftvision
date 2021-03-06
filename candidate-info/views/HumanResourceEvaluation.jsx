import React, { Component } from 'react';
import EvaluationStatus from './EvaluationStatus';
import { Modal,Button } from 'react-bootstrap';
import TextArea from './TextArea';
import InputBox from './InputBox';
import $http from '../routes/http';

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
       interviewerRound:'',
       createdBy: '',
       createdUser: {},
       isOwner : true
     };

    this.handleSubmitHrForm = this.handleSubmitHrForm.bind(this);
    this.handleUpdateHRForm = this.handleUpdateHRForm.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
   }

   componentDidMount() {
       this.loadHRDetails();
   }


   loadHRDetails() {
     let hrUrl = this.props.url + '/newHREvaluationForm';
     let {candidateInterviewRecords, idx} = this.props;
     let {hrEvaluationData, createdBy} = this.state;
       $http.get(hrUrl)
           .then(res => {
               this.setState({ hrEvaluationData: res.data });
               hrEvaluationData = res.data;
               if(hrEvaluationData.length) {
               let currentHRRecord = hrEvaluationData.length>0 && hrEvaluationData.filter((record) => {
                     return candidateInterviewRecords[idx].IA_id === record._id
              });

              const currHRObject = currentHRRecord[0] || {};
              for (var prop in currHRObject) {
                    var object = {};
                    object[prop] = currHRObject[prop];
                   this.setState(object);
               }


               if(createdBy) {
                 let id = createdBy;
                 let userUrl = this.props.url + '/get';
                 $http.get(`${userUrl}/${id}`)
                     .then(res => {
                          this.setState({"createdUser": res.data})
                 }).catch(err => {
                     console.error(err);
                 });
               }
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
     let {hrEvaluationData} = this.state;
     idx = 0;
     if(!hrEvaluationData.length)
     hrEvaluationData[idx] = {};

      switch (event.target.name) {
          case "business":
          hrEvaluationData[idx]["business"] = value;
              this.setState({business : event.target.value})
              break;
          case "project":
          hrEvaluationData[idx]["project"] = value;
              this.setState({project : event.target.value})
              break;
          case "customerFocus":
          hrEvaluationData[idx]["customerFocus"] = value;
              this.setState({customerFocus : event.target.value})
              break;
          case "senseOfUrgency":
          hrEvaluationData[idx]["senseOfUrgency"] = value;
              this.setState({senseOfUrgency : event.target.value})
              break;
          case "technologyExposure":
          hrEvaluationData[idx]["technologyExposure"] = value;
              this.setState({technologyExposure : event.target.value})
              break;
          case "orientationToDetails":
          hrEvaluationData[idx]["orientationToDetails"] = value;
              this.setState({orientationToDetails : event.target.value})
              break;
          case "attitude":
          hrEvaluationData[idx]["attitude"] = value;
              this.setState({attitude : event.target.value})
              break;
          case "culturalCompatibility":
          hrEvaluationData[idx]["culturalCompatibility"] = value;
              this.setState({culturalCompatibility : event.target.value})
              break;
          case "communicationSkills":
          hrEvaluationData[idx]["communicationSkills"] = value;
              this.setState({communicationSkills : event.target.value})
              break;
          case "interpersonalSkills":
          hrEvaluationData[idx]["interpersonalSkills"] = value;
              this.setState({interpersonalSkills : event.target.value})
              break;
          case "analyticalCritical":
          hrEvaluationData[idx]["analyticalCritical"] = value;
              this.setState({analyticalCritical : event.target.value})
              break;
          case "energyEnthusiasm":
          hrEvaluationData[idx]["energyEnthusiasm"] = value;
              this.setState({energyEnthusiasm : event.target.value})
              break;

          case "hrInterviewStatus":
          hrEvaluationData[idx]["hrInterviewStatus"] = value;
              this.setState({hrInterviewStatus : event.target.value});
                sendInterviewStatus(event.target.value, "hr",idx);
              break;
          case "interviewerName1":
          hrEvaluationData[idx]["interviewerName1"] = value;
              this.setState({interviewerName1 : event.target.value})
              break;
          case "jobTitle":
          hrEvaluationData[idx]["jobTitle"] = value;
              this.setState({jobTitle : event.target.value})
              break;
          case "interviewerRound":
          hrEvaluationData[idx]["interviewerRound"] = value;
              this.setState({interviewerRound : event.target.value})
              break;

          default:
              break;
      }
      return false;
    }

  handleSubmitHrForm(e) {
    e.preventDefault();

    const {business, project, customerFocus, senseOfUrgency, orientationToDetails, technologyExposure, attitude, culturalCompatibility, communicationSkills, interpersonalSkills, analyticalCritical, energyEnthusiasm, hrInterviewStatus, interviewerName1, jobTitle, interviewerRound} = this.state;
    const {candidateData, candidateInterviewRecords, idx, currentUser} = this.props;
    // Candidate HR Form data

    const hrRecord = Object.assign({}, {candidateID: candidateData.candidateID}, {business}, {project}, {customerFocus}, {senseOfUrgency}, {orientationToDetails}, {technologyExposure}, {attitude}, {culturalCompatibility}, {communicationSkills}, {interpersonalSkills}, {analyticalCritical}, {energyEnthusiasm}, {hrInterviewStatus}, {interviewerName1}, {jobTitle}, {interviewerRound})
    hrRecord.createdBy = currentUser[0]._id;
    this.setState({ show: false });
      if(hrRecord) {
          let records = this.state.hrEvaluationData;
          let newHREvaluationForm = records.concat(hrRecord);
          this.setState({ hrEvaluationData: newHREvaluationForm });
          let url = "/candidateInfo";
          let roundUrl = url + '/CandidateRounds';
          $http.post(this.props.url + '/newHREvaluationForm', hrRecord)
          .then(res => {
              candidateInterviewRecords[idx].IA_id = res.data._id;
              candidateInterviewRecords[idx].sts = hrRecord.hrInterviewStatus;
              $http.put(`${roundUrl}/${candidateInterviewRecords[idx]._id}`, candidateInterviewRecords[idx])
              .then(response => {
                this.setState({ hrEvaluationData: records });
                // this.loadDetailsFromServerForIASheet();
                location.reload();
              })
                  .catch(err => {
                      console.log('error message=========', err);
                  })
          })
              .catch(err => {
                  console.error(err);
                  this.setState({ hrEvaluationData: records });
              });
      }
      this.loadHRDetails();
  }

  handleUpdateHRForm(e, id, record) {
    e.preventDefault();
    const {candidateData, candidateInterviewRecords, idx} = this.props;
    const {business, project, customerFocus, senseOfUrgency, orientationToDetails, technologyExposure, attitude, culturalCompatibility, communicationSkills,
       interpersonalSkills, analyticalCritical, energyEnthusiasm, hrInterviewStatus, interviewerName1, jobTitle, interviewerRound, createdBy} = this.state;
    let business1 =  business ? business : record[0].business;
    let project1 =  project ? project : record[0].project;
    let customerFocus1 =  customerFocus ? customerFocus : record[0].customerFocus;
    let senseOfUrgency1 =  senseOfUrgency ? senseOfUrgency : record[0].senseOfUrgency;
    let orientationToDetails1 = orientationToDetails ? orientationToDetails : records[0].orientationToDetails;
    let technologyExposure1 = technologyExposure ? technologyExposure : records[0].technologyExposure;
    let attitude1 = attitude ? attitude : records[0].attitude;
    let culturalCompatibility1 = culturalCompatibility ? culturalCompatibility : records[0].culturalCompatibility;
    let communicationSkills1 = communicationSkills ? communicationSkills : records[0].communicationSkills;
    let interpersonalSkills1 = interpersonalSkills ? interpersonalSkills : records[0].interpersonalSkills;
    let analyticalCritical1 = analyticalCritical ? analyticalCritical : records[0].analyticalCritical;
    let energyEnthusiasm1 = energyEnthusiasm ? energyEnthusiasm : records[0].energyEnthusiasm;
    let hrInterviewStatus1 =  hrInterviewStatus ? hrInterviewStatus : record[0].hrInterviewStatus;
    let interviewerName2 =  interviewerName1 ? interviewerName1 : record[0].interviewerName1;
    let jobTitle1 =  jobTitle ? jobTitle : record[0].jobTitle;
    let interviewerRound1 =  interviewerRound ? interviewerRound : record[0].interviewerRound;
    const updatedHRrecord = Object.assign({}, {candidateID: candidateData.candidateID}, {business:business1}, {project:project1}, {customerFocus:customerFocus1}, {senseOfUrgency:senseOfUrgency1}, {orientationToDetails:orientationToDetails1}, {technologyExposure:technologyExposure1}, {attitude:attitude1}, {culturalCompatibility:culturalCompatibility1}, {communicationSkills:communicationSkills1}, {interpersonalSkills:interpersonalSkills1}, {analyticalCritical:analyticalCritical1}, {energyEnthusiasm:energyEnthusiasm1}, {hrInterviewStatus:hrInterviewStatus1}, {interviewerName1:interviewerName2}, {jobTitle:jobTitle1}, {interviewerRound:interviewerRound1}, {createdBy})
    let iaUrl = this.props.url + '/newHREvaluationForm';
    this.setState({ show: false });
    let url = "/candidateInfo";
    let roundUrl = url + '/CandidateRounds';

    //sends the new candidate id and new candidate to our api
    $http.put(`${iaUrl}/${id}`, updatedHRrecord)
    .then(res => {
        candidateInterviewRecords[idx].sts = updatedHRrecord.hrInterviewStatus;
        $http.put(`${roundUrl}/${candidateInterviewRecords[idx]._id}`, candidateInterviewRecords[idx])
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
    this.loadHRDetails();
  }

  render() {
    let {hrEvaluationData, business, project, customerFocus, senseOfUrgency, orientationToDetails, technologyExposure, attitude,isOwner,
       culturalCompatibility, communicationSkills, interpersonalSkills, analyticalCritical, energyEnthusiasm, hrInterviewStatus, interviewerName1, jobTitle, interviewerRound, createdUser} = this.state;
    const {candidateData, interViewToBeTaken, candidateInterviewRecords, idx, currentUser} = this.props;

    let currentHRRecord = hrEvaluationData.length> 0 && hrEvaluationData.filter((record) => {
      return candidateInterviewRecords[idx].IA_id === record._id
    });

    const currHRObject = currentHRRecord[0] || {};
    isOwner  = (currHRObject && currHRObject.createdBy === currentUser[0]._id);

    if (!createdUser.firstname) {
      createdUser = currentUser[0];
    }

    const candidateFullname = candidateData.firstname + " " + candidateData.lastname;

    return (
      <div>
        <Button bsStyle="primary" onClick={()=>{this.handleShow()}}>
        <span className="glyphicon glyphicon-list-alt"  title="HR Form"/>
        </Button>

        <Modal bsSize="large" show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
          <h2 className="ia-form-title">Human Resource Evaluation Form {!isOwner && "(Read-Only)"}</h2>
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
                              <td><strong>Interviewer</strong></td><td>{
                                  createdUser.firstname + ' ' + createdUser.lastname
                              }</td>
                            <td><strong>Job Title</strong><span className="mandatory">*</span></td><td><InputBox
                                  type="text"
                                  placeholder="Enter Job title"
                                  classname="form-control"
                                  name="jobTitle"
                                  id="jobTitleId"
                                  value = {currHRObject.jobTitle || this.state.jobTitle }
                                  maxLength="20"
                                  autoComplete="off"
                                  required
                                  onChange = {this.handleOnChange}
                              /></td>
                            <td><strong>Interview Round</strong><span className="mandatory">*</span></td><td>{idx+1}</td>
                            </tr>
                          </tbody>
                        </table>
                    </div>
                  <div className="hr-details">
                    <div>
                      <div>
                        <span><strong><u>Technical & Business skills</u><span className="mandatory">*</span></strong></span>
                        <div className="hr-details-sub-title">Business/ Domain Acumen</div>
                          <span className=""><TextArea required rows="2" cols="50" placeholder="Comments" onChange = {this.handleOnChange} name="business" id="businessId" value={currHRObject.business}></TextArea></span>
                      </div>

                      <div>
                        <div>Project & Customer knowhow</div>
                          <span className=""><TextArea required rows="2" cols="50" placeholder="Comments" onChange = {this.handleOnChange} name="project" id="projectId" value={currHRObject.project}></TextArea></span>
                      </div>

                      <div>
                        <div>Customer focus</div>
                            <span className=""><TextArea required rows="2" cols="50" placeholder="Comments" onChange = {this.handleOnChange} name="customerFocus" id="customerFocusId" value={currHRObject.customerFocus}></TextArea></span>
                      </div>

                      <div>
                          <div>Sense of urgency</div>
                            <span className=""><TextArea required rows="2" cols="50" placeholder="Comments" onChange = {this.handleOnChange} name="senseOfUrgency" id="senseOfUrgencyId" value={currHRObject.senseOfUrgency} ></TextArea></span>
                      </div>
                      <div>
                        <div>Orientation to details</div>
                            <span className=""><TextArea required rows="2" cols="50" placeholder="Comments" onChange = {this.handleOnChange} name="orientationToDetails" id="orientationToDetailsId" value={currHRObject.orientationToDetails} ></TextArea></span>
                      </div>
                      <div>
                        <span>Technology exposure</span>
                            <span className=""><TextArea required rows="2" cols="50" placeholder="Comments" onChange = {this.handleOnChange} name="technologyExposure" id="technologyExposureId" value={currHRObject.technologyExposure} ></TextArea></span>
                      </div>

                    </div>

                    <div>
                      <div>
                        <span><strong><u>Behavioural skills</u><span className="mandatory">*</span></strong></span>
                        <div className="hr-details-sub-title">Attitude</div>
                          <span className=""><TextArea required rows="2" cols="50" placeholder="Comments" onChange = {this.handleOnChange} name="attitude" id="attitudeId" value={currHRObject.attitude}></TextArea></span>
                      </div>

                      <div>
                        <div>Cultural compatibility - Adaptability & learnability</div>
                          <span className=""><TextArea required rows="2" cols="50" placeholder="Comments" onChange = {this.handleOnChange} name="culturalCompatibility" id="culturalCompatibilityId" value={currHRObject.culturalCompatibility}></TextArea></span>
                      </div>

                      <div>
                        <div>Communication skills</div>
                            <span className=""><TextArea required rows="2" cols="50" placeholder="Comments" onChange = {this.handleOnChange} name="communicationSkills" id="communicationSkillsId" value={currHRObject.communicationSkills}></TextArea></span>
                      </div>

                      <div>
                          <div>Interpersonal skills</div>
                            <span className=""><TextArea required rows="2" cols="50" placeholder="Comments" onChange = {this.handleOnChange} name="interpersonalSkills" id="interpersonalSkillsId" value={currHRObject.interpersonalSkills} ></TextArea></span>
                      </div>
                      <div>
                        <div>Analytical skills and/ or Critical thinking</div>
                            <span className=""><TextArea required rows="2" cols="50" placeholder="Comments" onChange = {this.handleOnChange} name="analyticalCritical" id="analyticalCriticalId" value={currHRObject.analyticalCritical} ></TextArea></span>
                      </div>
                      <div>
                        <div>Energy & Enthusiasm</div>
                            <span className=""><TextArea required rows="2" cols="50" placeholder="Comments" onChange = {this.handleOnChange} name="energyEnthusiasm" id="energyEnthusiasmId" value={currHRObject.energyEnthusiasm} ></TextArea></span>
                      </div>

                      </div>
                    </div>

                    <div className="pd-small interview-status-align">

                      <div className="col-sm-4"><label>Interview Status</label><span className="mandatory">*</span></div>
                      <div className="col-sm-6">
                        <div className="form-group experience-width">
                          <select required className="form-control" onChange = {this.handleOnChange} name="hrInterviewStatus"
                          id="hrInterviewStatusId" value ={currHRObject.hrInterviewStatus}>
                            <option value="">Select</option>
                            <option>Selected</option>
                            <option>On Hold</option>
                            <option>Rejected</option>
                          </select>
                        </div>
                    </div>
                    </div>


                      </fieldset>
                      <div className="margin-small">
                      {
                        currHRObject._id && isOwner &&
                        <Button className="move-right"
                          onClick={(e)=>this.handleUpdateHRForm(e, currHRObject._id, hrEvaluationData)}>Update</Button>
                      }
                      { !currHRObject._id &&
                         <Button className="move-right" type="submit">Save</Button>
                      }

                      <Button className="" onClick={this.handleClose}>Cancel</Button>
                      </div>
              </form>

            </div>
          </Modal.Body>


        </Modal>
      </div>
    );

  }
}

export default HumanResourceEvaluation;
