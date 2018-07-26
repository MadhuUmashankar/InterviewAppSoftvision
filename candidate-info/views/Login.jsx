import React, { Component } from 'react';
import InputBox from './InputBox';
import $http from '../routes/http';
import {hashHistory} from 'react-router';
import './App.scss';
import {
    BrowserRouter as Router,
    Link,
    Route,
    Switch,
    HashRouter
  } from 'react-router-dom';
  import { Tooltip, OverlayTrigger } from 'react-bootstrap';


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [], show: false, searchKey:"", modalLabelView: false, candidate:{}, username: '', password: '', message:'', activeRole: '' };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const { username, password } = this.state;

        $http.post(this.props.url+'/login', { username, password })
          .then((result) => {
            sessionStorage.setItem('username', result.data.username);
            sessionStorage.setItem('jwtToken', result.data.token);
            sessionStorage.setItem('activeRole', result.data.role[0])
            this.setState({ message: '' });
            hashHistory.push({
                pathname: '#/app'
              })
          })
          .catch((error) => {
            if(error.response.status === 401) {
              this.setState({ message: 'Login failed. Username or password not match' });
            }
          });

    }

    handleOnChange(event) {
        const { value } = event.target;

        switch (event.target.name) {
            case "username":
                  this.setState({username : value})
                break;
            case "password":
                this.setState({password : value})
                break;
            default:
                break;
        }
    }


    render() {
      const tooltip = (
        <Tooltip id="tooltip">
          <strong>Password must be 6 characters long, including lowercase, uppercase and number.</strong>
        </Tooltip>
      );
        const { message } = this.state;
        return (
            <div className="signin-form">

                <form className="form-horizontal" onSubmit={ this.handleSubmit }>
                {message !== '' &&
                    <div className="alert alert-warning alert-dismissible" role="alert">
                    { message }
                    </div>
                }
                    <fieldset className = "background">
                      <div className="row center-block">
                        <div className="login-title">
                              <h3>Interview Management System</h3>
                        </div>
                        <div className="profile-img-block">
                            <img className="profile-img" src="https://picsum.photos/200/300/?random" alt="" />

                        </div>

                      </div>
                        <div className="form-group">
                            <label className="col-md-4 control-label">User Name</label>
                            <div className="col-md-6 inputGroupContainer">
                                <div className="input-group">
                                        <InputBox
                                            type="text"
                                            placeholder="Username"
                                            classname="form-control"
                                            name="username"
                                            autoFocus="true"
                                            autoComplete="off"
                                            required
                                            onChange = {this.handleOnChange}
                                        />

                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-4 control-label">Password</label>
                            <div className="col-md-6 inputGroupContainer pwd-message">
                                <div className="input-group login-btn">
                                        <InputBox
                                            type="password"
                                            placeholder="Password"
                                            classname="form-control"
                                            name="password"
                                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                                            required
                                            autoComplete="off"
                                            onChange = {this.handleOnChange}
                                        />
                                      <OverlayTrigger placement="right" overlay={tooltip}>
                                          <a href="#" className="pwd-icon">
                                            <span className="glyphicon glyphicon-exclamation-sign"></span>
                                          </a>
                                        </OverlayTrigger>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-4"></label>
                                <div className="col-md-6 btn-wrapper">
                                    <button className="btn btn-lg btn-primary btn-block sign-in" type="submit">Sign In</button>
                                    <p>
                                        Not a member? <Link to="/register" className="register-btn">Register here</Link>
                                    </p>
                                </div>
                        </div>
                    </fieldset>
                </form>
			</div>
        )
    }
}
