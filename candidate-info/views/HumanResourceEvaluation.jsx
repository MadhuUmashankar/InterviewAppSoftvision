import React, { Component } from 'react';
import EvaluationStatus from './EvaluationStatus';
import { Modal,Button } from 'react-bootstrap';
import axios from 'axios';

class HumanResourceEvaluation extends Component {
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

    this.handleSubmitHrForm = this.handleSubmitHrForm.bind(this);
    this.loadDetailsFromServerForIASheet = this.loadDetailsFromServerForIASheet.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
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


  handleSubmitHrForm(e) {
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
                    </div>

                    <div>

                      <div className="margin-small">
                        <p><u>Intelligence</u></p>
                        In terms of academic achievement, verbal expression, perception, analytic, conceptual ability, and judgement, how would you rate the candidates ability?
                            <span className=""><textarea required rows="4" cols="100" placeholder="Comments" onChange = {this.handleOnChange} name="intelligence"
                          id="intelligenceId"></textarea></span>
                      </div>

                      <div className="margin-small">
                        <p><u>Intensity</u></p>
                        In terms of academic achievement, verbal expression, perception, analytic, conceptual ability, and judgement, how would you rate the candidates ability?
                          <span className=""><textarea required rows="4" cols="100" placeholder="Comments" onChange = {this.handleOnChange} name="intensity"
                          id="intensityId"></textarea></span>
                      </div>

                      <div className="margin-small">
                        <p><u>Commitment</u></p>
                        In terms of academic achievement, verbal expression, perception, analytic, conceptual ability, and judgement, how would you rate the candidates ability?
                            <span className=""><textarea required rows="4" cols="100" placeholder="Comments" onChange = {this.handleOnChange} name="commitment"
                          id="commitmentId"></textarea></span>
                      </div>

                      <div className="margin-small">
                        <p><u>TeamWork</u></p>
                        In terms of academic achievement, verbal expression, perception, analytic, conceptual ability, and judgement, how would you rate the candidates ability?
                            <span className=""><textarea required rows="4" cols="100" placeholder="Comments" onChange = {this.handleOnChange} name="teamWork"
                          id="teamWorkId"></textarea></span>
                      </div>

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

export default HumanResourceEvaluation;
