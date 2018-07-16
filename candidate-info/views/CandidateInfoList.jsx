import React, { Component } from 'react';
import './candidateInfoList.scss';
import {hashHistory} from 'react-router';
import { Modal, Button } from 'react-bootstrap';

class CandidateInfoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
          show: false
        }
        this.modalStatus = false;
        this.handleEvalution = this.handleEvalution.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

        if(searchKey) {
            candidateNodes = candidateNodes.filter((candidate, index) => {
                const fullName = candidate.firstname  + " " +  candidate.lastname;
                return candidate.firstname.toLowerCase().indexOf(searchKey.toLowerCase()) > -1 || candidate.lastname.toLowerCase().indexOf(searchKey.toLowerCase()) > -1 || candidate.skills.toLowerCase().indexOf(searchKey.toLowerCase()) > -1 || fullName.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
            })
        }

        candidateNodes = candidateNodes && candidateNodes.map((candidate, index) => {
            const candidateID = candidate._id;
            const scheduledInterview = candidate.scheduleInterview;
            let status = false, classStatus="label label-default", scheduled;
            if(scheduledInterview =='Yes') {
              scheduled = "Yes"
            }
            if(candidate.no_of_rounds > 0) {
                if(candidate.offered == "offered") {
                  status = "Offered";
                  classStatus = "label label-primary";
                } else if(candidate.offered == "rejected") {
                  status = "Rejected";
                  classStatus = "label label-danger";
                } else {
                  status = "In Progress";
                  classStatus = "label label-warning";
                }
            } else {
              status = "New";
              classStatus = "label label-success";
            }

            return (

                            <div  key={index} className="col-md-4 col-sm-6 card-wrapper">
                              <div className="event-card">
                                <div className="event-card-title-block">


                                  <div>
                                       <div>
                                         <label>
                                           <a href="" onClick={(e)=>this.handleEvalution(e, candidateID, scheduledInterview)}>{candidate.firstname} {candidate.lastname}</a>
                                         </label>

                                       </div>

                                       <Modal show={this.state.show} onHide={this.handleClose}>
                                           <Modal.Header closeButton>
                                               <Modal.Title><h3>Select the round of interview</h3></Modal.Title>
                                           </Modal.Header>
                                           <Modal.Body>
                                             No interview has been scheduled. Please schedule an interview for the same by clicking on view button in Home Screen.
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
                                  <button title="Click here to view the candidate" className="btn btn-success margin-tiny" onClick={(e)=>this.handleView(e, candidate)}><i className="fa fa-address-card-o" aria-hidden="true"></i></button>
                                  </div>
                                  <div className="event-card-btn-group right">
                                  <button title="Click here to delete the candidate" className="btn btn-danger" onClick={(e)=>this.handleDelete(e, candidateID, candidate)}>
                                    <span className="glyphicon glyphicon-trash" title="Delete"/></button>
                                  </div>

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
