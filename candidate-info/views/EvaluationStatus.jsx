import React, { Component } from 'react';

class EvaluationStatus extends Component {
  constructor(props){
    super(props)
    this.state = {
      interviewStatus:'',
      candidate: props.candidate,
      data:props.data,
      IAdata:props.data || {}
    }

    this.handleOnChange = this.handleOnChange.bind(this);
    this.onEvaluationStatusSave = this.onEvaluationStatusSave.bind(this);
  }

  handleOnChange(event) {
      switch (event.target.name) {
          case "interviewStatus":
              this.setState({interviewStatus : event.target.value}, () => {
                this.onEvaluationStatusSave();
              })
              break;
          default:
              break;
      }
    }

    onEvaluationStatusSave() {
      const {interviewStatus} = this.state;
      const {onEvaluationStatusSave} = this.props;

      onEvaluationStatusSave({interviewStatus});
    }

    componentDidMount() {
      const { data } = this.props;
      if (data != undefined) {
        if (Object.keys(data).length > 0) {
          const interviewStatus = data.interviewStatus ? data.interviewStatus : "";
          this.setState({interviewStatus},() => {
            this.onEvaluationStatusSave({interviewStatus});
          });
        }
      }
    }

  render () {
    const {data, IAdata, interviewStatus} = this.state;
  return(
    <div className="container-fluid border">
      <div className="col-sm-4"><label>Interview Status</label><span className="mandatory">*</span></div>
      <div className="col-sm-6 margin-tiny"><div className="form-group experience-width">
         <select required className="form-control" onChange = {this.handleOnChange} name="interviewStatus"
         id="interviewStatusId" value ={interviewStatus}>
           <option>Yet to be interviewed</option>
           <option>Rejected</option>
           <option>Selected</option>
           <option>On Hold</option>
           <option>Withdraw</option>
           <option>Move to Technical round 2</option>
           <option>Move to Manager round</option>
           <option>Move to HR round</option>
           <option>Took other offer</option>
         </select>
      </div></div>
  </div>
  )}
}

export default EvaluationStatus;
