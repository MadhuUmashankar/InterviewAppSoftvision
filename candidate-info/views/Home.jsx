import React, { Component } from 'react';
import LandingPage from './LandingPage';
import RegisterPage from './RegisterPage';
import Register from './Register';
import App from './App';
import $http from '../routes/http';
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
            <Switch>
              {
                sessionStorage.getItem("jwtToken") &&
                <Route path="/" exact component={() => <App url='/candidateInfo' IAurl= "/candidateInfo/newIAForm" userListurl="/candidateInfo/users"/> } />
              }
              {
                !sessionStorage.getItem("jwtToken") &&
                <Route path="/" exact component={() => <LandingPage /> } />
              }
                <Route path="/" exact component={() => <LandingPage />} />
              {
                sessionStorage.getItem("jwtToken") &&
                <Route path="/register" component={() => <App url='/candidateInfo' IAurl= "/candidateInfo/newIAForm" userListurl="/candidateInfo/users"/>} />
              }
              {
                !sessionStorage.getItem("jwtToken") &&
                <Route path="/register" component={() => <RegisterPage /> }/>
              }

                <Route path="/app" component={() => <App url='/candidateInfo' IAurl= "/candidateInfo/newIAForm" userListurl="/candidateInfo/users"/>}/>
                <Route path="/candidateAssessment" component = {CandidateAssessment}/>
            </Switch>
          </div>
        </HashRouter>
      );
    }

  export default Home;
