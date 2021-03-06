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

    componentWillMount() {
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
    <div className="container-fluid">
      <div className="col-sm-4"><label>Interview Status</label><span className="mandatory">*</span></div>
      <div className="col-sm-6"><div className="form-group experience-width">
         <select required className="form-control" onChange = {this.handleOnChange} name="interviewStatus"
         id="interviewStatusId" value ={interviewStatus}>
           <option value="">Select</option>
            <option>Selected</option>
           <option>On Hold</option>
          <option>Rejected</option>
         </select>
      </div></div>
  </div>
  )}
}

export default EvaluationStatus;
