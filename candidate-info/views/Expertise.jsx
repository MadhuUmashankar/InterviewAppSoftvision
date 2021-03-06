import React from 'react';
import InputBox from './InputBox';
import { Tooltip, OverlayTrigger, Popover } from 'react-bootstrap';
import HelpIconTable from './HelpIconTable';

class Expertise extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        value: '',
        candidate: props.candidate,
        IAdata: props.data || {}
  };
  this.handleInputChange = this.handleInputChange.bind(this) ;
  this.handleAddRow = this.handleAddRow.bind(this);
  this.handleRemoveRow = this.handleRemoveRow.bind(this);
  this.onExpertiseSave = this.onExpertiseSave.bind(this);
}

 handleInputChange(event, idx, overallAvgScore) {
    const {IAdata} = this.state;
    const { name, value } = event.target;

    let rows = Object.keys(IAdata).length > 0 ? [...IAdata.rows] : [{}];
    rows[idx] = Object.assign({}, rows[idx], {[name]:value}) ;
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
    if (!rows) {return;}
    onExpertiseSave(rows);
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
    let {candidate, IAdata} = this.state;
    // const currTechnicalObject = data || {};
    const popoverHoverFocus = (
  <Popover id="popover-trigger-hover-focus" title="Score Distribution" className="popupover-hover">
    <HelpIconTable />
    <div><i>***Note: If not listed please contact HR</i></div>
  </Popover>
);
    let rows = Object.keys(IAdata).length > 0 ? IAdata.rows : [{}];

    return (
      <div>
        <div className="container-fluid border">
          <div className="clearfix header-margin">
          <div className="col-sm-5">
            <label className="experience-label">Technical Interview: 80%</label>
              <OverlayTrigger
                  trigger={['hover', 'focus']}
                  placement="right"
                  overlay={popoverHoverFocus}>
                  <span className="glyphicon glyphicon-question-sign help-icon"></span>
              </OverlayTrigger>
          </div>
                  <div className="col-sm-4 move-right">
                      <label className="experience-label">Calculated Score</label>
                      <label className="overallScore">{this.props.overallAvgScore}</label>
                  </div>
            </div>
            <div>

              <table
                  className="table table-bordered table-hover expertised-area"
                  id="tab_logic">
                  <thead className="color">
                    <tr>
                        <th className="col-sm-3 text-center">
                          <span className="control-label">Area of Expertise</span>
                            </th>
                        <th className="col-sm-3 text-center"><span className="control-label">Score</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(rows).length > 0 && rows.map((item, idx) => (
                      <tr id="addr0" key={idx}>
                        <td>
                        <InputBox
                            type="text"
                            classname="form-control "
                            name="expertisedArea"
                            id="candidateExpertiseId"
                            value={item.expertisedArea}
                            autoComplete="off"
                            autoFocus="true"
                            maxLength="10"
                            required
                            onChange = {(e)=>this.handleInputChange(e, idx)}
                        />
                        </td>

                            <td>
                              <InputBox
                                  type="number"
                                  classname="form-control"
                                  name="avgScore"
                                  id="avgScoreId"
                                  value={item.avgScore}
                                  onChange = {(e)=>this.handleInputChange(e, idx)}
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
