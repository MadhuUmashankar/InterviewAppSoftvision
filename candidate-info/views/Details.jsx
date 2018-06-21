import React from 'react';
import InputBox from './InputBox';

class Details extends React.Component {
  constructor(props) {
    super(props)
      this.state = {
        candidateName: '',
        interviewDate: '',
        interviewerName: '',
        candidate: props.candidate,
        data:props.data
      };
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(event) {
      switch (event.target.name) {
          case "candidateName":
              this.setState({candidateName : event.target.value}, () => {
                this.onDetailsSave();
              })
              break;
          case "interviewDate":
              this.setState({interviewDate : event.target.value}, () => {
                this.onDetailsSave();
              })
              break;
          case "interviewerName":
              this.setState({interviewerName : event.target.value}, () => {
                this.onDetailsSave();
              })
              break;
          default:
              break;
      }
    }

  onDetailsSave() {
    const {interviewDate, interviewerName} = this.state;
    const {onDetailsSave} = this.props;

    if (!interviewDate && !interviewerName) {
        return;
    }
    onDetailsSave({interviewDate, interviewerName});
  }

  componentDidMount() {
    const { data, onDetailsSave } = this.props;
      if (data != undefined) {
        if(Object.keys(data).length > 0) {
        this.setState({interviewDate:data.interviewDate, interviewerName : data.interviewerName},() => {
          onDetailsSave({interviewDate:data.interviewDate, interviewerName : data.interviewerName})
        });
      }
    }
  }

  render(){

    const {candidate, data} = this.state;

    return(
          <div>
                  <div className="form-group required details-width padding">
                    <label className="control-label" htmlFor="cName">Candidate Name:</label>
                    <InputBox
                        type="text"
                        placeholder="Enter Candidate name"
                        classname="form-control details-label"
                        name="candidateName"
                        id="candidateId"
                        value = {candidate.firstname +" "+ candidate.lastname }
                        autoFocus="true"
                        maxLength="15"
                        required
                        onChange = {this.handleOnChange}
                        readOnly = "true"
                    />
                  </div>
                  <div className="form-group  required details-width padding">
                    <label className="control-label" htmlFor="iDate">Interview Date:</label>
                    <InputBox
                        type="date"
                        classname="form-control details-label"
                        name="interviewDate"
                        id="interviewDateId"
                        value = {data ? data.interviewDate : this.state.interviewDate}
                        required
                        onChange = {this.handleOnChange}
                    />


              </div>
                  <div className="form-group required details-width">
                    <label className="control-label" htmlFor="tInt">Interviewer Name</label>
                    <InputBox
                        type="text"
                        placeholder="Enter Interviewer's name"
                        classname="form-control details-label"
                        name="interviewerName"
                        id="interviewerId"
                        value = {data ? data.interviewerName : this.state.interviewerName }
                        maxLength="20"
                        required
                        onChange = {this.handleOnChange}
                    />

                  </div>
          </div>
    )
  }
}

export default Details;
