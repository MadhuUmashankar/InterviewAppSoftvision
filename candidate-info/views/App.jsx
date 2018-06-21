import React, { Component } from 'react';
import CandidateForm from './CandidateForm';
import CandidateInfoList from './CandidateInfoList';
import './App.scss';
import { Modal,Button } from 'react-bootstrap';
import InputBox from './InputBox'


import axios from 'axios';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = { data: [], show: false, searchKey:"", modalLabelView: false, candidate:{}, IAData:[]};
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.loadDetailsFromServer = this.loadDetailsFromServer.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleView = this.handleView.bind(this);
    }

    loadDetailsFromServer() {
        axios.get(this.props.url)
            .then(res => {
                this.setState({ data: res.data });
            })
    }

    loadDetailsFromServerForIASheet() {
        axios.get(this.props.IAurl)
            .then(res => {
            console.log('response from server', res.data);
                this.setState({ IAData: res.data });
            })
    }

    handleSubmit(record) {
        if(record) {
            let records = this.state.data;
            this.setState({ show: false });
            let newCandidate = records.concat([record]);
            this.setState({ data: newCandidate });
             let formData = new FormData();
            formData.append('selectedFile', record.selectedFile);

           axios.all([
            axios.post(this.props.url+'/upload', formData),
            axios.post(this.props.url+'/newCandidate', record),
           ])
           .catch(err => {
                console.error(err);
                this.setState({ data: records });
            })
        }
        this.loadDetailsFromServer();
    }


    handleDelete(id) {
        this.loadDetailsFromServerForIASheet();
        const {data, IAData} = this.state;

        let deleteIAFormID = "";
        data.map((candidate, index) => {
            if(id === candidate._id) {
                data.splice(index,1);
                this.setState({ data });
                deleteIAFormID = IAData.filter((record) => {
                    return candidate._id === record.candidateID
                });
            }
        })
      
        deleteIAFormID = deleteIAFormID.length > 0 ? deleteIAFormID[0]._id : '';

        axios.all([
            `${deleteIAFormID} ? ${axios.delete(`${this.props.IAurl}/${deleteIAFormID}`)} : ""`,
            axios.delete(`${this.props.url}/${id}`)            
        ]).then(res => {
            console.log('Record deleted');
        })
        .catch(err => {
            console.error(err);
        })
        this.loadDetailsFromServer();
    }

    handleView(status, candidate) {
        var { modalLabelView } = this.state;
        this.setState({ show: status, modalLabelView: true, candidate });
    }

    handleUpdate(id, record) {
        this.setState({ show: false });
        let formData = new FormData();
        formData.append('selectedFile', record.selectedFile);

          //sends the new candidate id and new candidate to our api
        axios.all([
                        axios.post(this.props.url+'/upload', formData),
                        axios.put(`${this.props.url}/${id}`, record),
                ])
        .catch(err => {
            console.log(err);
        })

        this.loadDetailsFromServer();
    }

    componentDidMount() {
        this.loadDetailsFromServer();
        this.loadDetailsFromServerForIASheet();
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true, modalLabelView:false });
    }

    handleSearch(e) {
        this.setState({searchKey:e.target.value})
    }

   render() {
    const {data, searchKey, candidate, modalLabelView, IAData } = this.state;
    let url = this.props.url;

    return (
      <div className="App">
        <div className="App-header">
            <div className="">
                <h3> Candidate List </h3>
            </div>
            <div>
                <Button bsStyle="primary" bsSize="large" onClick={this.handleShow}>
                    Add New Candidate
                </Button>
            </div>
        </div>
        <div className="search-container">
            <label className="control-label">Candidate Search:</label>
            <InputBox
                type="text"
                placeholder="Search by Name/Skills"
                classname="form-control"
                onChange={this.handleSearch}
            />
        </div>


        <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title><h3>Candidate Form</h3></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <CandidateForm  onHandleSubmit={ this.handleSubmit } candidate={candidate} modalLabelView={modalLabelView} handleUpdate={ this.handleUpdate }  data = {data}/>
            </Modal.Body>
        </Modal>


        <CandidateInfoList
            onDelete={ this.handleDelete }
            onModalView={this.handleView }
            data={ data }
            IAData={IAData}
            searchKey= { searchKey }
            url = {url}/>
      </div>
    );
  }
}

export default App;
