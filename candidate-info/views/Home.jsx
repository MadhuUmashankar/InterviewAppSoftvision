import React, { Component } from 'react';
import Login from './Login';
import Register from './Register';
import App from './App';
import CandidateAssessment from './CandidateAssessment';
import registerServiceWorker from './registerServiceWorker';
import {
    BrowserRouter as Router,
    Link,
    Route,
    Switch,
    HashRouter
  } from 'react-router-dom';

 const Home = () => {
    return (
        <HashRouter>
          <div>
            <div className="nav">
              <div className="title">
                <h1>Interview Management System</h1>
              </div>
            </div>

            <Switch>
                <Route path="/" exact component={() => <Login url="http://localhost:3000/candidateInfo"/>} />
                  <Route path="/register" component={() => <Register url="http://localhost:3000/candidateInfo"/>}/>
                  <Route path="/app" component={() => <App url='http://localhost:3000/candidateInfo' IAurl= "http://localhost:3000/candidateInfo/newIAForm"/>}/>
                  <Route path="/CandidateAssessment" component = {CandidateAssessment}/>
              </Switch>
          </div>
        </HashRouter>
      );
    }
  registerServiceWorker();
  export default Home;
