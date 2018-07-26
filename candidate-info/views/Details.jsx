import React from 'react';
import InputBox from './InputBox';
import $http from '../routes/http';
// import DatePicker from 'react-date-picker';
// import DatePicker from 'react-datepicker';
// import moment from 'moment';
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
        date: new Date(),
        createdUser : {}
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    // this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleOnChange(event) {
      switch (event.target.name) {
          case "candidateName":
              this.setState({candidateName : event.target.value}, () => {
                this.onDetailsSave();
              })
              break;
          case "interviewerDate":
              this.setState({interviewerDate : event.target.value}, () => {
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

   //  handleDateChange(date) {
   //    // date = date.format("YYYY-MM-DD");
   //    // date = moment().toDate().toUTCString();
   //    // console.log('date', date)
   //   this.setState({date: date}, () => {
   //     this.onDetailsSave();
   //   });
   // }

  onDetailsSave() {
    const {interviewerName, interviewerDate} = this.state;
    const {onDetailsSave} = this.props;
    // let startDate = startDate.toDateString("yyyy-MM-dd");
    if (!interviewerDate && !interviewerName) {
        return;
    }
    onDetailsSave({interviewerDate, interviewerName});
  }

  componentWillMount() {
    const { data, onDetailsSave,url } = this.props;
      if (data != undefined) {
        if(Object.keys(data).length > 0) {
        // data.startDate = moment("2014-02-27T10:00:00").format('YYYY/MM/DD');
        this.setState({interviewerDate:data.interviewerDate, interviewerName : data.interviewerName},() => {
          onDetailsSave({interviewerDate:data.interviewerDate, interviewerName : data.interviewerName})
        });
      }

      let id = data.createdBy;
      let userUrl = url + '/get';
      $http.get(`${userUrl}/${id}`)
          .then(res => {
               this.setState({createdUser: res.data})
      }).catch(err => {
          console.error(err);
      });
    }
  }

  render() {

    let {candidate, data, startDate, interviewerDate, interviewerName, createdUser} = this.state;
    let {currentUser} = this.props;
    let candidateName = candidate.firstname +" "+ candidate.lastname;
    interviewerName = createdUser.firstname + ' ' + createdUser.lastname;

    if (!createdUser.firstname) {
      createdUser = currentUser[0];
      interviewerName = createdUser.firstname + ' ' + createdUser.lastname;
    }

          //const currTechnicalObject = data || {};
    return(
          <div>

            <table
                className="table table-responsive technical-details" id="manager_evaluation_detais_id">
                <tbody>
                  <tr>
                    <td><strong>Candidate Name:</strong></td><td>{candidateName}</td>
                  </tr>
                  <tr>
                    <td><strong>Interviewer:</strong></td><td className="interview-round">{interviewerName}</td>
                  </tr>
                  <tr>
                    <td><strong>Interview Date:</strong></td><td><InputBox
                        type="date"
                        placeholder="Enter the date"
                        classname="form-control ia-date"
                        name="interviewerDate"
                        id="interviewerDateId"
                        value = {interviewerDate}
                        autoComplete="off"
                        required
                        onChange = {this.handleOnChange}
                    /></td>
                  </tr>


              </tbody>
          </table>


          </div>
    )
  }
}

export default Details;
