import React from 'react';

class Impression extends React.Component {
  constructor(props) {
    super(props)
      this.state = {
        candidateImpression: '',
        candidate: props.candidate
      };
      this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(e) {
    const {onImpressionSave} = this.props;
    this.setState({candidateImpression: e.target.value},() => {
          onImpressionSave(this.state.candidateImpression);
    });
  }

  componentDidMount() {
    const { data, onImpressionSave } = this.props;
    if (data != undefined) {
      if (Object.keys(data).length > 0) {
        const impression = data.impression ? data.impression : "";
        this.setState({candidateImpression: impression},() => {
          onImpressionSave(this.state.candidateImpression);
      });
      }
    }
  }

  render() {
    const {candidate, data, candidateImpression} = this.state

    return(
      <div className="container-fluid border">
        <div className="clearfix header-margin">
          <div className="col-sm-4"><label className="experience-label">Evaluator impression: 10%</label><span className="mandatory">*</span></div>
          <div className="col-sm-2 move-right">
              <div className="form-group">
                 <select required className="form-control" id="impression" onChange={this.handleOnChange}
                 value={candidateImpression}>
                   <option value="">Select</option>
                     <option>0</option>
                     <option>2</option>
                     <option>4</option>
                     <option>6</option>
                     <option>8</option>
                     <option>10</option>
                 </select>
              </div>
          </div>
        </div>
        <div className="row color">
            <div className="col-sm-12"><label>How to note: </label></div>
        </div>

        <div className="row">
          <div className="col-sm-2">0</div>
          <div className="col-sm-10"><p>He is not able to communicate, he lacks basic social skils</p></div>
        </div>
        <div className="row">
          <div className="col-sm-2">2</div>
          <div className="col-sm-10"><p>He is able to comunicate if he is helped by the interviewer. Very shy</p></div>
        </div>
        <div className="row">
          <div className="col-sm-2">4</div>
          <div className="col-sm-10"><p>He communicates well, but he is very slow in expressing an idea or giving an answer</p></div>
        </div>
        <div className="row">
          <div className="col-sm-2">6</div>
          <div className="col-sm-10"><p>He communicates well and he can handle himself</p></div>
        </div>
        <div className="row">
          <div className="col-sm-2">8</div>
          <div className="col-sm-10"><p>He has a very open atitude and is a very pleasant person to talk to</p></div>
        </div>
        <div className="row">
          <div className="col-sm-2">10</div>
          <div className="col-sm-10"><p>He has a very open atitude, is a very pleasant person to talk to, he asks very good questions and he has a very good logical mind</p></div>
        </div>
      </div>
    )
  }
}

export default Impression;
