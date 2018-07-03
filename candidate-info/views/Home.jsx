import React, { Component } from 'react';
import Login from './Login';
import Register from './Register';
import App from './App';
import CandidateAssessment from './CandidateAssessment';

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
                <img className="logo" src="images/logo.png" alt="logo"/>
                <h1>Interview Management System</h1>
              </div>
            </div>

            <Switch>
              {
                sessionStorage.getItem("jwtToken") && 
                <Route path="/" exact component={() => <App url='http://localhost:3000/candidateInfo' IAurl= "http://localhost:3000/candidateInfo/newIAForm" userListurl="http://localhost:3000/candidateInfo/users"/> } />
              }
              {
                !sessionStorage.getItem("jwtToken") && 
                <Route path="/" exact component={() => <Login url="http://localhost:3000/candidateInfo"/>} />
              }
                <Route path="/" exact component={() => <Login url="http://localhost:3000/candidateInfo"/>} />
              {
                sessionStorage.getItem("jwtToken") && 
                <Route path="/register" component={() => <App url='http://localhost:3000/candidateInfo' IAurl= "http://localhost:3000/candidateInfo/newIAForm" userListurl="http://localhost:3000/candidateInfo/users"/>} />
              }
              {
                !sessionStorage.getItem("jwtToken") && 
                <Route path="/register" component={() => <Register url="http://localhost:3000/candidateInfo"/>}/>
              }
                
                <Route path="/app" component={() => <App url='http://localhost:3000/candidateInfo' IAurl= "http://localhost:3000/candidateInfo/newIAForm" userListurl="http://localhost:3000/candidateInfo/users"/>}/>
                <Route path="/candidateAssessment" component = {CandidateAssessment}/>
            </Switch>
          </div>
        </HashRouter>
      );
    }

  export default Home;
