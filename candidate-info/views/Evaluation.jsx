import React, { Component } from 'react';
import './Evaluation.scss';
import Details from './Details';
import Note from './Note';
import Expertise from './Expertise';
import Impression from './Impression';
import Summary from './Summary';
import EvaluationStatus from './EvaluationStatus';
import { Modal,Button } from 'react-bootstrap';
import axios from 'axios';

class Evaluation extends Component {
  constructor(props, context) {
     super(props, context);

     this.state = {
       show: false,
       IAdata: [],
       detailsData: {},
       experience:{},
       expertiseData: {},
       impression:{},
       summaryData:{},
       interviewStatus:{},
       // candidate:props.candidateData,
       url: props.url
     };

    this.handleSubmitIAForm = this.handleSubmitIAForm.bind(this);
    this.loadDetailsFromServerForIASheet = this.loadDetailsFromServerForIASheet.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleDetailsData = this.handleDetailsData.bind(this);
    this.handleNoteData = this.handleNoteData.bind(this);
    this.handleImpressionSave = this.handleImpressionSave.bind(this);
    this.handleExpertiseData = this.handleExpertiseData.bind(this);
    this.handleSummaryData = this.handleSummaryData.bind(this);
    this.handleEvaluationStatusSave = this.handleEvaluationStatusSave.bind(this);
   }

   loadDetailsFromServerForIASheet() {
     let iaUrl = this.state.url + '/newIAForm';
       axios.get(iaUrl)
           .then(res => {
             console.log('response from server IA data', res.data);
               this.setState({ IAdata: res.data });
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

  handleDetailsData(details) {
    this.setState({detailsData: details});
  }

  handleNoteData(experience) {
    this.setState({experience});
  }

  handleExpertiseData(expertise) {
    this.setState({expertiseData: expertise});
  }

  handleImpressionSave(impression) {
      this.setState({impression});
  }

  handleSummaryData(summary) {
    this.setState({summaryData: summary});
  }
  handleEvaluationStatusSave(estatus) {
    const {sendInterviewStatus,idx} = this.props;
    this.setState({interviewStatus: estatus});
    sendInterviewStatus(estatus.interviewStatus, "technical",idx);
  }

  handleUpdate(e, id, record) {
    e.preventDefault();

    const {candidateData, candidateInterviewRecords,idx} = this.props;
    const candidate = candidateData;
    const {detailsData, experience, expertiseData, impression, summaryData, interviewStatus} = this.state;
    console.log('detailsData---update', detailsData);
    const fullname = candidate.firstname + " " + candidate.lastname;
    const candidateID = candidate.candidateID;

    // const updatedrecord = Object.assign({}, { candidateID, candidateName: fullname, interviewRounds : [{interviewDate:detailsData.interviewDate, interviewerName:detailsData.interviewerName, experience, rows: expertiseData, impression, summaryData, interviewStatus}]});
    const updatedrecord = Object.assign({},{candidateID: candidate.candidateID}, detailsData, {candidateName: fullname}, {experience},{rows: expertiseData}, {impression}, {summaryData}, interviewStatus)
    let iaUrl = this.props.url + '/newIAForm';
      let url = "http://localhost:3000/candidateInfo";
      let roundUrl = url + '/CandidateRounds';
    this.setState({ show: false });

    //sends the new candidate id and new candidate to our api
    axios.put(`${iaUrl}/${id}`, updatedrecord)
    .then(res => {
        candidateInterviewRecords[idx].sts = updatedrecord.interviewStatus;
        axios.put(`${roundUrl}/${candidateInterviewRecords[idx]._id}`, candidateInterviewRecords[idx])
        .then(response => {
          this.loadDetailsFromServerForIASheet();
          location.reload();
        })
            .catch(err => {
                console.log('error message in update-----------=========', err);
            })
    })
        .catch(err => {
            console.log(err);
        })
  }


  handleSubmitIAForm(e) {
    e.preventDefault();

    const {candidateData, candidateInterviewRecords, idx} = this.props;
    const candidate = candidateData;
    const {detailsData, experience, expertiseData, impression, summaryData, interviewStatus} = this.state;
    console.log('detailsData---', detailsData);
    // Candidate IA Form data
    const fullname = candidate.firstname + " " + candidate.lastname;
    const candidateID = candidate.candidateID;
    const record = Object.assign({},{candidateID: candidate.candidateID}, detailsData, {candidateName: fullname}, {experience},{rows:  expertiseData}, {impression}, {summaryData}, interviewStatus)
    // const record = Object.assign({}, { candidateID, candidateName: fullname, interviewRounds : [{interviewDate:detailsData.interviewDate, interviewerName:detailsData.interviewerName, experience, rows: expertiseData, impression, summaryData, interviewStatus}]});

// , {experience}, {rows: expertiseData}, {impression}, {summaryData}, interviewStatus

    this.setState({ show: false });
         if(record) {
          let records = this.state.IAdata;
          let newIAForm = records.concat(record);
          this.setState({ IAdata: newIAForm });
          let url = "http://localhost:3000/candidateInfo";
          let roundUrl = url + '/CandidateRounds';
          axios.post(this.props.url + '/newIAForm', record)
          .then(res => {
              candidateInterviewRecords[idx].IA_id = res.data._id;
              candidateInterviewRecords[idx].sts = record.interviewStatus;
              axios.put(`${roundUrl}/${candidateInterviewRecords[idx]._id}`, candidateInterviewRecords[idx])
              .then(response => {
                this.loadDetailsFromServerForIASheet();
                location.reload();
              })
                  .catch(err => {
                      console.log('error message=========', err);
                  })
          })
              .catch(err => {
                  console.error(err);
                  this.setState({ IAdata: records });
              });
      }

    }

  render() {
    let {url, IAdata, index, experience, expertiseData, impression, overallAvgScore} = this.state;
    const {candidateData, sendInterviewStatus,idx,candidateInterviewRecords} = this.props;
    const candidate = candidateData;
    let rows = expertiseData;
    if(rows.length) {
      overallAvgScore= (rows.filter(item => item.avgScore)).map(item => item.avgScore).reduce((prev, next, iv) => { return +prev + +next}, 0);
      overallAvgScore = parseFloat(Number((overallAvgScore) / (rows.length || 1)).toFixed(2));
    }
    let total = ((0.1*experience) + (0.8*overallAvgScore) + (0.1*impression)) || 0;
    let totalValue = parseFloat(Number(total).toFixed(2));

    let currentIARecord = IAdata.length > 0 && IAdata.filter((record) => {
      return  candidateInterviewRecords[idx].IA_id === record._id
    });

    currentIARecord = currentIARecord[0];
    // if(currentIARecord !== undefined) {
    //   const {candidateID, _id, candidateName } = currentIARecord;
    //
    //   currentIARecord = Object.assign({}, {candidateID}, {_id}, {candidateName}, currentIARecord.interviewRounds[this.props.idx]);
    // }


    return (
      <div>
        <Button bsStyle="primary" onClick={()=>{this.handleShow()}}>
          <span className="glyphicon glyphicon-list-alt" title="Technical Form"/>
        </Button>

        <Modal bsSize="large" show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
          <h2 className="ia-form-title">Candidate Evaluation Form</h2>
          </Modal.Header>
          <Modal.Body>
            <div className="form-container">
              <form className="form-horizontal" onSubmit= {this.handleSubmitIAForm}>
                <fieldset className = "background">
                    <div className="margin-small">
                      <Details onDetailsSave= {this.handleDetailsData} candidate={candidate} data={currentIARecord} />
                    </div>
                    <div className="margin-small">
                     <Note onNoteSave= {this.handleNoteData} candidate={candidate} data={currentIARecord} />
                    </div>
                    <div className="margin-small">
                     <Expertise onExpertiseSave= {this.handleExpertiseData} candidate={candidate} data={currentIARecord} overallAvgScore={overallAvgScore} />
                    </div>
                    <div className="margin-small">
                      <Impression onImpressionSave= {this.handleImpressionSave} candidate={candidate} data={currentIARecord} />
                    </div>

                    <div className="margin-small">
                      <div className="col-sm-4 header-margin">
                        <label className="evaluator-label">Evaluator Final Score</label>
                        <label className="overallScore">{totalValue}</label>
                      </div>

                      <Summary onSummarySave= {this.handleSummaryData} candidate={candidate} data={currentIARecord} />
                    </div>
                    <div className="margin-small">
                      <EvaluationStatus onEvaluationStatusSave= {this.handleEvaluationStatusSave} candidate={candidate} data={currentIARecord} />
                    </div>
                      <div className="margin-small">
                      {
                        currentIARecord &&
                        <Button className="move-right" onClick={(e)=>{this.handleUpdate(e, currentIARecord._id, IAdata)}}>Update</Button>
                      }
                      {
                        !currentIARecord && <Button className="move-right" type="submit">Save</Button>
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

export default Evaluation;
