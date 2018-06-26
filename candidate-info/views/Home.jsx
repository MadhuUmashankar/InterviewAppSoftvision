import React, { Component } from 'react';
import Login from './Login';
import Register from './Register';
import App from './App';
import CandidateAcessment from './CandidateAcessment';
import {
    BrowserRouter as Router,
    Link,
    Route,
    Switch,
    HashRouter
  } from 'react-router-dom';

 const Home = () => (
    <HashRouter>
      <div>
        <div className="nav">
          <div className="title">
            <h1>Interview Management System</h1>
          </div>
          <div className="log-in">
            <Link to="/" className="btn btn-primary">Log In</Link>
          </div>
        </div>

        <Switch>
            <Route path="/" exact component={Login} />
              <Route path="/register" component={() => <Register url="http://localhost:3000/candidateInfo"/>}/>
              <Route path="/app" component={() => <App url='http://localhost:3000/candidateInfo' IAurl= "http://localhost:3000/candidateInfo/newIAForm"/>}/>
              <Route path="/candidateAcessment" component = {CandidateAcessment} url='http://localhost:3000/candidateInfo' IAurl= "http://localhost:3000/candidateInfo/newIAForm" />
              <Route path="/logout" component={Login}/>
        </Switch>
      </div>
    </HashRouter>
  );

  export default Home;
