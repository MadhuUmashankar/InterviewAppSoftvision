import React from 'react';

class Summary extends React.Component {
  constructor(props) {
    super(props)
      this.state = {
        interviewComments:'',
        observations:'',
        technicalLevel:'',
        projectLevelComments:'',
        candidate: props.candidate,
        IAdata:props.data || {}
      };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.onSummarySave = this.onSummarySave.bind(this);
  }

  handleOnChange(event) {
      switch (event.target.name) {
          case "interviewComments":
              this.setState({interviewComments : event.target.value}, () => {
                this.onSummarySave();
              })
              break;
          case "observations":
              this.setState({observations : event.target.value}, () => {
                this.onSummarySave();
              })
              break;
          case "technicalLevel":
              this.setState({technicalLevel : event.target.value}, () => {
                this.onSummarySave();
              })
              break;
          case "projectLevelComments":
              this.setState({projectLevelComments : event.target.value}, () => {
                this.onSummarySave();
              })
              break;
          default:
              break;
      }
    }

    onSummarySave() {
      const {interviewComments, observations, technicalLevel, projectLevelComments} = this.state;
      const {onSummarySave} = this.props;

      onSummarySave({interviewComments, observations, technicalLevel, projectLevelComments});
    }

    componentDidMount() {
      const { data } = this.props;
      if (data != undefined) {
        if (Object.keys(data).length > 0) {
          if(Object.keys(data.summaryData).length > 0) {
            const comments = data.summaryData.interviewComments ? data.summaryData.interviewComments : "";
            const observations =  data.summaryData.observations ? data.summaryData.observations : "";
            const level = data.summaryData.technicalLevel ? data.summaryData.technicalLevel : "";
            const projectComments = data.summaryData.projectLevelComments ? data.summaryData.projectLevelComments : "";
            this.setState({interviewComments: comments, technicalLevel: level, projectLevelComments:projectComments, observations},() => {
              this.onSummarySave();
            });
          }
        }
      }
    }

  render() {
    const {candidate, IAdata, interviewComments, observations, technicalLevel, projectLevelComments } = this.state

    return (
      <div className="container-fluid border">
        <div className="row header-margin">
          <div className="col-sm-12"><label className="evaluator-label">General impression - to be filled up by the interviewer</label><span className="mandatory">*</span></div>
        </div>

        <div className="row interview-comments">
          <div className="col-sm-4">Interviewers comments regarding the candidate, strong points, weak points</div>
            <div className="col-sm-8">
              <textarea required rows="4" cols="50" onChange = {this.handleOnChange} name="interviewComments"
              id="interviewCommentsId" value ={interviewComments} ></textarea>
            </div>
        </div>
        <div className="row">
          <div className="col-sm-4">Other observations (additional comments regarding candidates attitude, potential)</div>
            <div className="col-sm-8">
              <textarea required rows="4" cols="50" onChange = {this.handleOnChange} name="observations"
              id="observationsId" value ={observations}></textarea>
            </div>
        </div>
        <div className="row">
          <div className="col-sm-4">Technical level</div>
          <div className="col-sm-8"><div className="form-group experience-width">
             <select required className="form-control" onChange = {this.handleOnChange} name="technicalLevel"
             id="technicalLevelId" value ={technicalLevel}>
               <option>Select</option>
                 <option>Junior 1</option>
                 <option>Junior 2</option>
                 <option>Junior 3</option>
                 <option>Mid 1</option>
                 <option>Mid 2</option>
                 <option>Mid 3</option>
                 <option>Senior 1</option>
                 <option>Senior 2</option>
                 <option>Senior 3</option>
                 <option>Team Lead 1</option>
                 <option>Team Lead 2</option>
                 <option>Team Lead 3</option>
             </select>
          </div></div>
        </div>
        <div className="row">
          <div className="col-sm-4">On what type of project(s) or role(s) do you think this candidate would fit best?</div>
          <div className="col-sm-8">
            <textarea required rows="2" cols="50" onChange = {this.handleOnChange} name="projectLevelComments"
            id="projectLevelCommentsId" value ={projectLevelComments}></textarea>
          </div>
        </div>
      </div>
      )
  }
}

export default Summary;
