import React, { Component } from 'react';
import './candidateInfoList.scss';
import {hashHistory} from 'react-router';
import { Modal, Button } from 'react-bootstrap';
import Switch from "react-switch";
import $http from '../routes/http';

class CandidateInfoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
          show: false,
          checked: false
        }
        this.modalStatus = false;
        this.handleEvalution = this.handleEvalution.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(candidateID, partialData, checked, index) {
      partialData[index].checked = checked;
      console.log('checked value', )

      this.setState({partialData : partialData});
      let url = "/candidateInfo";
      $http.put(`${url}/${partialData[index]._id}`, partialData[index]).then(response => {
        console.log('response on ------------------offered save', response)
      })
    }

  handleDelete(e, candidateID) {
        if (confirm("You are about to delete this Candidate?")) {
          const {onDelete} = this.props;
          onDelete(candidateID);
        } else {
          false;
        }
    }

    handleUpdate(e, candidateID, candidate) {
        const {handleUpdate} = this.props;
        handleUpdate(candidateID, candidate);
        this.setState({ show: false });
    }

    handleSubmit(e,candidate) {
      const {onModalEdit} = this.props;
      // this.modalStatus = false;
      onModalEdit(candidate);
    }

    handleView(e, candidate) {
        const {onModalView} = this.props;
        this.modalStatus = true;
        onModalView(this.modalStatus, candidate);
    }

    handleEvalution(event,candidateID, scheduledInterview) {
        event.preventDefault();
        const {candidate} = this.state;
        if(scheduledInterview ==='Yes'){
          hashHistory.push({
              pathname: '#/CandidateAssessment',
              query: {
              id: candidateID
              }
          })
        }else {
            this.setState({ show: true });
        }


    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    render() {
        const {data, searchKey, url, IAData, role, partialData} = this.props;
        let candidateNodes = partialData;
        let dataFromIA = IAData;
        const {checked} = this.state;

        if(searchKey) {
            candidateNodes = candidateNodes.filter((candidate, index) => {
                const fullName = candidate.firstname  + " " +  candidate.lastname;
                return candidate.firstname.toLowerCase().indexOf(searchKey.toLowerCase()) > -1 || candidate.lastname.toLowerCase().indexOf(searchKey.toLowerCase()) > -1 || candidate.skills.toLowerCase().indexOf(searchKey.toLowerCase()) > -1 || fullName.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
            })
        }

        candidateNodes = candidateNodes && candidateNodes.map((candidate, index) => {
            const candidateID = candidate._id;
            const scheduledInterview = candidate.scheduleInterview;
            let status = false, classStatus="label label-default", scheduled, checkedclass="event-card active";
            if(scheduledInterview =='Yes') {
              scheduled = "Yes"
            }

            if(!candidate.checked) {
               checkedclass = "event-card candidate-active-inactive-toggle not-active";
            } else{
              checkedclass = "event-card active";
            }

            if(candidate.no_of_rounds > 0) {
              if(candidate.candidateSelected) {
                status = "Selected";
                classStatus = "label label-info";
                if(candidate.candidateOffered) {
                  status = "Offered";
                  classStatus = "label label-primary";
                  if(candidate.candidateAccepted){
                    status = "Accepted";
                    classStatus = "label label-primary";
                  if(candidate.candidateHired){
                    status = "Hired";
                    classStatus = "label label-success";
                  }

                  if(candidate.candidateOfferOnHold){
                    status = "Offer on-hold";
                    classStatus = "label label-danger";
                  }
                }
                  if(candidate.candidateRejectedByEmployer || candidate.candidateRejectedByHimself){
                    status = "Rejected";
                    classStatus = "label label-danger";
                  }
                }
              }
                else if((candidate.candidateRejectedByEmployer || candidate.candidateRejectedByHimself)) {
                  status = "Rejected";
                  classStatus = "label label-danger";
                } else if(candidate.candidateOnHold) {
                  status = "On-hold";
                  classStatus = "label label-danger";
                }
                else {
                  status = "In Progress";
                  classStatus = "label label-warning";
                }
            } else {
              status = "New";
              classStatus = "label label-success";
            }

            let switchId = "normal-switch" + candidateID;
            return (

                            <div  key={index} className="col-md-4 col-sm-6 card-wrapper">
                              <div className= {checkedclass} >
                                <div className="event-card-title-block">


                                  <div>
                                       <div>
                                         <label>
                                           <a href="" onClick={(e)=>this.handleEvalution(e, candidateID, scheduledInterview)}>{candidate.firstname} {candidate.lastname}</a>
                                         </label>

                                       </div>

                                       <Modal show={this.state.show} onHide={this.handleClose}>
                                           <Modal.Header closeButton>
                                               <Modal.Title><h3>Interview schedule</h3></Modal.Title>
                                           </Modal.Header>
                                           <Modal.Body>
                                             No interview has been scheduled. Please schedule an interview for the same by clicking on view button in home screen.
                                           </Modal.Body>
                                           {/*<Button bsStyle="primary" bsSize="small" onClick={(e)=>this.handleSubmit(e, candidate)} >
                                               Schedule Interview
                                           </Button>*/}
                                       </Modal>
                                     </div>


                                <div className="home-page-resume">
                                   <a target="_blank" href= {candidate.selectedFile_name} download>
                                      <span title="Download Resume" className="glyphicon glyphicon-download-alt" />
                                    </a>
                                    {scheduled ?<span className="scheduled-flag glyphicon glyphicon-flag" title="Interview Scheduled" /> : ''}
                                  </div>
                                </div>


                                <p className="event-card-blurb">
                                <div><span className="margin-tiny glyphicon glyphicon-wrench"></span>Skills: {candidate.skills}</div>
                                <div><span className="margin-tiny glyphicon glyphicon-map-marker"></span>Location: {candidate.city}</div>
                                <div><span className="margin-tiny glyphicon glyphicon-phone"></span>Phone No.: {candidate.phone}</div>
                                <div className="margin-tiny">
                                   <span className={classStatus}>{status}</span>
                                  </div>
                                </p>
                                <div className="event-card-btn-group">
                                  <button title="Click here to view the candidate" className="btn btn-success margin-tiny" disabled={!candidate.checked} onClick={(e)=>this.handleView(e, candidate)}><i className="fa fa-address-card-o" aria-hidden="true"></i></button>
                                  </div>

                                  { (role.includes("TA") || role.includes("ADMIN") || role.includes('COMMUNITY MANAGER')) ?
                                  <div className="event-card-btn-group right" title="Active/InAcive">
                                      <Switch
                                        onChange={(value)=>{this.handleChange(candidate._id, partialData, value, index)}}
                                        checked={candidate.checked}
                                        className="react-switch"
                                        id={switchId}
                                      />
                                  </div> :''}

                              </div>
                            </div>



            )
        })

        return (

            <div className="row">

                {
                    candidateNodes.length > 0
                    && candidateNodes
                }
                { candidateNodes.length === 0 && <p className="no-record">No records available</p>}

            </div>




        )
    }
}


export default CandidateInfoList;
