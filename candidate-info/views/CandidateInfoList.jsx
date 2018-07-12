import React, { Component } from 'react';
import './candidateInfoList.scss';
import {hashHistory} from 'react-router';

class CandidateInfoList extends Component {
    constructor(props) {
        super(props);
        this.modalStatus = false;
        this.handleEvalution = this.handleEvalution.bind(this);
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
    }

    handleView(e, candidate) {
        const {onModalView} = this.props;
        this.modalStatus = true;
        onModalView(this.modalStatus, candidate);
    }

    handleEvalution(event,candidateID) {
        event.preventDefault();
        hashHistory.push({
            pathname: '#/CandidateAssessment',
            query: {
            id: candidateID
            }
        })
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

            return (

                            <div  key={index} className="col-md-4 col-sm-6 card-wrapper">
                              <div className="event-card">
                                <div className="event-card-title-block"><label><a href="" onClick={(e)=>this.handleEvalution(e,candidateID)}>{candidate.firstname} {candidate.lastname}</a></label></div>


                                <p className="event-card-blurb">
                                <div><span className="margin-tiny glyphicon glyphicon-wrench"></span>Skills: {candidate.skills}</div>
                                <div><span className="margin-tiny glyphicon glyphicon-map-marker"></span>Location: {candidate.city}</div>
                                <div><span className="margin-tiny glyphicon glyphicon-phone"></span>Phone No.: {candidate.phone}</div>
                                </p>
                                <div className="event-card-btn-group">
                                  <button className="btn margin-tiny" onClick={(e)=>this.handleView(e, candidate)}>View</button>
                                  </div>
                                  <div className="event-card-btn-group right">
                                  <button className="btn btn-danger" onClick={(e)=>this.handleDelete(e, candidateID, candidate)}>Delete</button>
                                  </div>
                              </div>
                            </div>



            )
        })

        return (

            <div className="candidate-list">

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
