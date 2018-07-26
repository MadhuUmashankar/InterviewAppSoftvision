import React, { Component } from 'react';
import CandidateForm from './CandidateForm';
import CandidateInfoList from './CandidateInfoList';
import './App.scss';
import { Modal, Button } from 'react-bootstrap';
import InputBox from './InputBox';
import Header from './Header';
import Footer from './Footer';
import {hashHistory} from 'react-router';
import ReactPaginate from 'react-paginate';
import $http from '../routes/http';
import {
    BrowserRouter as Router,
    Link,
    Route,
    Switch,
    HashRouter
  } from 'react-router-dom';
  import ActiveRoleBreadScrumb from './ActiveRoleBreadScrumb';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
          data: [],
          show: false,
          searchKey:"",
          modalLabelView: false,
          candidate:{},
          IAData:[],
          users:[],
          pageCount: '',
          offset: 0,
          numberOfItemsPerPage: 50,
          partialData:[]
        };
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.loadDetailsFromServer = this.loadDetailsFromServer.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleView = this.handleView.bind(this);
        this.logout = this.logout.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    loadDetailsFromServer() {
        $http.defaults.headers.common['Authorization'] = sessionStorage.getItem('jwtToken');
        $http.get(this.props.url)
            .then(res => {
                this.setState({ data: res.data });
            }).catch((error) => {
                if(error.response.status === 401) {
                  hashHistory.push({
                    pathname: '#/'
                  })
                }
            });

            $http.get(this.props.userListurl)
            .then(res => {
                  this.setState({ users: res.data });
            })

    }

    loadDetailsFromServerForIASheet() {
        $http.defaults.headers.common['Authorization'] = sessionStorage.getItem('jwtToken');
        $http.get(this.props.IAurl)
            .then(res => {
                this.setState({ IAData: res.data });
            }).catch((error) => {
                if(error.response.status === 401) {
                  hashHistory.push({
                    pathname: '#/'
                  })
                }
            });
    }

    handleSubmit(record) {
        if(record) {
            let records = this.state.data;
            records["no_of_rounds"] = 0;
            records["offered"] = false;
            this.setState({ show: false });
            let newCandidate = records.concat([record]);
            this.setState({ data: newCandidate });
             let formData = new FormData();
            formData.append('selectedFile', record.selectedFile);

           $http.all([
            $http.post(this.props.url+'/upload', formData),
            $http.post(this.props.url+'/newCandidate', record),
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

        $http.all([
            `${deleteIAFormID} ? ${$http.delete(`${this.props.IAurl}/${deleteIAFormID}`)} : ""`,
            $http.delete(`${this.props.url}/${id}`)
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
        $http.all([
                        $http.post(this.props.url+'/upload', formData),
                        $http.put(`${this.props.url}/${id}`, record),
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

    logout() {
        sessionStorage.removeItem('jwtToken');
        sessionStorage.removeItem('activeRole');
        window.location.reload();
        // hashHistory.push({
        //     pathname: '#/'
        //   })
    }

    handlePageClick(arg) {

    let {data, partialData, offset, numberOfItemsPerPage} = this.state;
    let selected = arg.selected;
    offset = Math.ceil(selected * numberOfItemsPerPage);
    let countIndex = offset * numberOfItemsPerPage;
    countIndex = countIndex ? countIndex : numberOfItemsPerPage;
    partialData.length = 0;
    for(let i=offset; i<countIndex; i++) {
      if(data[i])
      partialData[i]= data[i];
      }

      this.setState({
        partialData: partialData, offset: offset
      })

  };

   render() {
    let {data, searchKey, candidate, modalLabelView, IAData, users, pageCount, partialData, offset, numberOfItemsPerPage} = this.state;
    let url = this.props.url, addCandidateButton= "primary";
    const username = sessionStorage.getItem('username');
    const currentUser = users.length > 0 && users.filter((user)=> (user.username == username));
    const firstname = currentUser.length > 0 && currentUser[0].firstname,
    lastname = currentUser.length > 0 && currentUser[0].lastname,
    role = sessionStorage.getItem('activeRole')

    addCandidateButton = (role ==='HR' || role==='TECH INTERVIEWER') ? "primary addCandidateButtonClassDisabled" : "primary addCandidateButtonClassEnabled";

    let countIndex = numberOfItemsPerPage;
    if(data.length >0 && offset==0) {
      partialData.length = 0;
      for(let i=offset; i<countIndex; i++) {
        if(data[i])
        partialData[i]= data[i];
      }
    }
    pageCount = Math.ceil(data.length/numberOfItemsPerPage);

    return (
      <div className>
        <Header />
        <div className="container-fluid candidate-info-list-container-fluid">
        <div className="container candidate-info-list-container">
        <div className="App-header">
            {sessionStorage.getItem('jwtToken') &&
              <div className="log-in"><span className="username">{ firstname + " " + lastname +  "  " + "(" + role +")"}</span><button className="btn btn-primary" onClick={this.logout}> Logout</button></div>
            }

            <ActiveRoleBreadScrumb currentUser={currentUser} />

            <div>
                <Button id="addCandidateButton" bsStyle={addCandidateButton} bsSize="large" onClick={this.handleShow} >
                    Add Candidate
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
                <Modal.Title><h3>Candidate details</h3></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <CandidateForm  onHandleSubmit={ this.handleSubmit } candidate={candidate} modalLabelView={modalLabelView} handleUpdate={ this.handleUpdate }  data = {data}/>
            </Modal.Body>
        </Modal>
        <CandidateInfoList
            onDelete={ this.handleDelete }
            onModalView={this.handleView }
            onModalEdit={this.handleSubmit}
            data={ data }
            partialData = {partialData}
            IAData={IAData}
            searchKey= { searchKey }
            url = {url}
            role={role} />
      </div>
      </div>
      <Footer />
    </div>
    );
  }
}

export default App;
