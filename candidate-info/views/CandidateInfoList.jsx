import React, { Component } from 'react';
import './candidateInfoList.scss';
import Evaluation from './Evaluation';

export default class CandidateInfoList extends Component {
    constructor(props) {
        super(props);
        this.modalStatus = false;
    }

    handleDelete(e, candidateID) {
        if (confirm("Are you sure you want to delete this Candidate?")) {
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

    handleEvalution(e, candidateID, candidate) {
        window.location.href = "/CandidateAcessment";
    }


    render() {
        const {data, searchKey, url, IAData} = this.props;

        let candidateNodes = data;
        let dataFromIA = IAData;

        if(searchKey) {
            candidateNodes = data.filter((candidate, index) => {
                const fullName = candidate.firstname  + " " +  candidate.lastname;
                return candidate.firstname.toLowerCase().indexOf(searchKey.toLowerCase()) > -1 || candidate.lastname.toLowerCase().indexOf(searchKey.toLowerCase()) > -1 || candidate.skills.toLowerCase().indexOf(searchKey.toLowerCase()) > -1 || fullName.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
            })
        }


        candidateNodes = candidateNodes && candidateNodes.map((candidate, index) => {

            const candidateID = candidate._id;
            return (
                <div  key={index}>
                        <div className="candidate-colum panel">
                        <div className="form-group evaluation-status">
                           <label>{candidate.candStatus}</label>
                           <div className="date-status">
                             <label>{dataFromIA[index] ? dataFromIA[index].interviewDate : 'IA Date'}</label>
                           </div>
                        </div>
                            <div>
                                <h5>Name: {candidate.firstname} {candidate.lastname}</h5>
                                <h5>Skills: {candidate.skills}</h5>
                            </div>
                            <div className="evaluation-wrapper" >
                                <Evaluation candidate={candidate} url={url} index={index}/>
                                <div className="file"><a href= {candidate.selectedFile_name} download> {candidate.selectedFile_name} </a></div>
                            </div>
                              <div>
                                <button className="btn margin-tiny" onClick={(e)=>this.handleView(e, candidate)}>View</button>
                                <button className="btn btn-danger" onClick={(e)=>this.handleDelete(e, candidateID,candidate)}>Delete</button>
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
