import React from 'react';
import InputBox from './InputBox';
import './Expertise.scss';

class Expertise extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        value: '',
        candidate: props.candidate,
        IAdata: props.data || {},
        testId:props.testId,
        overallAvgScore: '0'
  };
  this.handleInputChange = this.handleInputChange.bind(this) ;
  this.handleAddRow = this.handleAddRow.bind(this);
  this.handleRemoveRow = this.handleRemoveRow.bind(this);
  this.onExpertiseSave = this.onExpertiseSave.bind(this);
}

 handleInputChange(event, idx) {
   const {IAdata} = this.state;
  const { name, value } = event.target;
  let rows = Object.keys(IAdata).length > 0 ? [...IAdata.rows] : [{}];
  rows[idx] = Object.assign({},rows[idx],{[name]:value}) ;
  this.setState({IAdata:{rows:rows}}, ()=> {
      this.onExpertiseSave(rows);
  });
  };


  handleAddRow (e) {
    e.preventDefault();
    const item = {};
    const {IAdata} = this.state;
    const rowsNew = IAdata.rows.length > 0 ? IAdata.rows : [{}];
    this.setState({IAdata:{rows: [...rowsNew, item]}});
  };


  handleRemoveRow (e) {
    e.preventDefault();
    const {IAdata} = this.state;
    this.setState({IAdata:{rows: IAdata.rows.slice(0, -1)}});
  };

  onExpertiseSave(rows) {
    const {onExpertiseSave} = this.props;
    const {overallAvgScore} = this.state;
    if (!rows) {return;}
    onExpertiseSave(rows, overallAvgScore);
  }

  componentDidMount() {
    const { data, onExpertiseSave } = this.props;
      if (data != undefined) {
        if(Object.keys(data).length > 0) {
        this.setState({IAdata:{rows: data.rows}},() => {
          onExpertiseSave(data.rows)
        });
      } 
    }
  }

  render(){
    let {candidate, testId, IAdata, overallAvgScore } = this.state;
    let rows = Object.keys(IAdata).length > 0 ? IAdata.rows : [{}];
    if(rows.length) {
      overallAvgScore=(rows.filter(item => item.avgScore)).map(item => item.avgScore).reduce((prev, next, iv) => { return +prev + +next}, 0);
      overallAvgScore = Math.round(overallAvgScore/(rows.length || 1))
    }

    return (
      <div>
        <div className="container-fluid border">
          <div className="row clearfix header">
          <div className="col-sm-5"><label className="experience-label">Technical Interview: 80%</label></div>

                  <div className="col-sm-6">
                      <label className="experience-label">Calculated Score</label>
                      <label className="overallScore">{overallAvgScore}</label>
                  </div>
            </div>
            <div>

              <table
                  className="table table-bordered table-hover expertised-area"
                  id="tab_logic">
                  <thead className="color">
                    <tr>
                        <th className="col-sm-2 text-center">Area of Expertise</th>
                        <th className="col-sm-2 text-center">Junior Minimum</th>
                        <th className="col-sm-2 text-center">Mid Minimum</th>
                        <th className="col-sm-2 text-center">Senior Minimum</th>
                        <th className="col-sm-2 text-center">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(rows).length > 0 && rows.map((item, idx) => (
                      <tr id="addr0" key={idx}>
                        <td>
                        <InputBox
                            type="text"
                            classname="form-control"
                            name="expertisedArea"
                            id="candidateExpertiseId"
                            value={item.expertisedArea}
                            autoFocus="true"
                            maxLength="10"
                            onChange = {(e)=>this.handleInputChange(e,idx)}
                        />
                        </td>

                            <td>
                            <InputBox
                                type="number"
                                classname="form-control"
                                name="juniorMinimumScore"
                                id="juniorMinimumScoreId"
                                value={item.juniorMinimumScore}
                                min="1"
                                max="10"
                                onChange = {(e)=>this.handleInputChange(e,idx)}
                            />
                        </td>
                            <td>
                            <InputBox
                                type="number"
                                classname="form-control"
                                name="midMinimumScore"
                                id="midMinimumScoreId"
                                value={item.midMinimumScore}
                                onChange = {(e)=>this.handleInputChange(e,idx)}
                            />

                        </td>
                            <td>
                            <InputBox
                                type="number"
                                classname="form-control"
                                name="seniorMinimumScore"
                                id="seniorMinimumScoreId"
                                value={item.seniorMinimumScore}
                                onChange = {(e)=>this.handleInputChange(e,idx)}
                            />

                            </td>
                            <td>
                              <InputBox
                                  type="number"
                                  classname="form-control"
                                  name="avgScore"
                                  id="avgScoreId"
                                  value={item.avgScore}
                                  onChange = {(e)=>this.handleInputChange(e,idx)}
                              />
                            </td>

                      </tr>

                    ))
                  }

                  </tbody>
                </table>

              <button onClick={(e)=>{this.handleAddRow(e)}} className="btn btn-primary margin-tiny">
                Add Row
              </button>
              <button onClick={(e)=>{this.handleRemoveRow(e)}} className="btn btn-danger float-right">
                Delete Row
              </button>

          </div>
        </div>
      </div>

    );
}

}
export default Expertise;
