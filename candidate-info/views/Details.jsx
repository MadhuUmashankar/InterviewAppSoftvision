import React from 'react';
import InputBox from './InputBox';
import DatePicker from 'react-datepicker';
import moment from 'moment';
// import 'react-datepicker/dist/react-datepicker.css';

class Details extends React.Component {
  constructor(props) {
    super(props)
      this.state = {
        candidateName: '',
        interviewDate: '',
        interviewerName: '',
        candidate: props.candidate,
        data:props.data,
        startDate: ''
      };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleOnChange(event) {
      switch (event.target.name) {
          case "candidateName":
              this.setState({candidateName : event.target.value}, () => {
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

    handleDateChange(date) {
      // date = date.format("YYYY-MM-DD");
      console.log('date', date)
     this.setState({startDate: date}, () => {
       this.onDetailsSave();
     });
   }

  onDetailsSave() {
    const {interviewerName, startDate} = this.state;
    const {onDetailsSave} = this.props;
    // let startDate = startDate.toDateString("yyyy-MM-dd");
    if (!startDate && !interviewerName) {
        return;
    }
    onDetailsSave({startDate, interviewerName});
  }

  componentWillMount() {
    const { data, onDetailsSave } = this.props;
      if (data != undefined) {
        if(Object.keys(data).length > 0) {
        // data.startDate = moment("2014-02-27T10:00:00").format('YYYY/MM/DD');
        this.setState({startDate:data.startDate, interviewerName : data.interviewerName},() => {
          onDetailsSave({startDate:data.startDate, interviewerName : data.interviewerName})
        });
      }
    }
  }

  render(){

    const {candidate, data, startDate, interviewerName} = this.state;
          //const currTechnicalObject = data || {};
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
                      
                      </div>


                  <div className="form-group required details-width">
                    <label className="control-label" htmlFor="tInt">Interviewer Name</label>
                    <InputBox
                        type="text"
                        placeholder="Enter Interviewer's name"
                        classname="form-control details-label"
                        name="interviewerName"
                        id="interviewerId"
                        value = {interviewerName}
                        maxLength="20"
                        autoComplete="off"
                        required
                        onChange = {this.handleOnChange}
                    />

                  </div>
          </div>
    )
  }
}

export default Details;
