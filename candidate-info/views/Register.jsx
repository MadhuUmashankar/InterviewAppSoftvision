//https://www.djamware.com/post/5a90c37980aca7059c14297a/securing-mern-stack-web-application-using-passport

import React, { Component } from 'react';
import InputBox from './InputBox'
import axios from 'axios';
import {hashHistory} from 'react-router';
import {
    Link
  } from 'react-router-dom';
import './App.scss';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = { firstname:'', lastname:'', username:'', email: '', role: '', password:'', confirmpassword:'' };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleOnChange(event) {
        const { value } = event.target;

        switch (event.target.name) {
            case "firstname":
                this.setState({firstname : value})
                break;
            case "lastname":
                this.setState({lastname : value})
                break;
            case "username":
                this.setState({username : value})
                break;
            case "email":
                this.setState({email : value})
                break;
            case "role":
                this.setState({role : value})
                break;
            case "password":
                this.setState({password : value})
                break;
            case "confirmpassword":
                const element = event.target;
                (() => {
                    this.setState({confirmpassword : value}, () => {
                        this.validatePassword(element);
                    })
                })(element)

                break;

            default:
                break;
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const { firstname, lastname, username, email, role, password, confirmpassword} = this.state;

        const user = {
            firstname,
            lastname,
            username,
            email,
            role,
            password,
            confirmpassword
        }

        axios.post(this.props.url+'/register', user)
        .then((result) => {
            hashHistory.push({
                pathname: '#/'
              })
        })
        .catch(err => {
            console.error(err);
        });
    }

    validatePassword(element){
        const { password, confirmpassword} = this.state;
        if(password != confirmpassword) {
            element.setCustomValidity("Passwords Don't Match");
        } else {
            element.setCustomValidity("");
        }
    }

    render() {
      const tooltip = (
        <Tooltip id="tooltip" >
          <strong>Password must be 6 characters long, including lowercase, uppercase and number.</strong>
        </Tooltip>
      );
        return (
            <div className="signin-form">
              <div className="row center-block">
                <div className="login-title">
                      <h3>Interview Management System</h3>
                </div>
                <div className="profile-img-block">
                    <img className="profile-img" src="https://picsum.photos/200/300/?random" alt="" />

                </div>

              </div>

                <form className="form-horizontal" onSubmit={ this.handleSubmit }>
                    <fieldset className = "background">
                        <div className="form-group">
                            <label className="col-md-4 control-label">First Name</label>
                            <div className="col-md-6 inputGroupContainer">
                                <div className="input-group">
                                        <InputBox
                                            type="text"
                                            placeholder="Firstname"
                                            classname="form-control"
                                            name="firstname"
                                            autoFocus="true"
                                            pattern="\w+"
                                            required
                                            onChange = {this.handleOnChange}
                                        />

                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-4 control-label">Last Name</label>
                            <div className="col-md-6 inputGroupContainer">
                                <div className="input-group">
                                        <InputBox
                                            type="text"
                                            placeholder="Lastname"
                                            classname="form-control"
                                            name="lastname"
                                            pattern="\w+"
                                            required
                                            onChange = {this.handleOnChange}
                                        />

                                </div>
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
                                            pattern="\w+"
                                            required
                                            onChange = {this.handleOnChange}
                                        />

                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-4 control-label">Email</label>
                            <div className="col-md-6 inputGroupContainer">
                                <div className="input-group">
                                        <InputBox
                                            type="email"
                                            placeholder="E-mail"
                                            classname="form-control"
                                            name="email"
                                            required
                                            onChange = {this.handleOnChange}
                                        />

                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-4 control-label">Role</label>
                            <div className="col-md-6 inputGroupContainer">
                                <div className="input-group login-btn position">
                                <select className="form-control" id="role" name="role" onChange={this.handleOnChange}>
                                    <option>Select</option>
                                    <option>TA</option>
                                    <option>Interviewer</option>
                                    <option>Manager</option>
                                    <option>HR</option>
                                </select>

                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-4 control-label">Password</label>
                            <div className="col-md-6 inputGroupContainer pwd-message">
                                <div className="input-group login-btn position">
                                        <InputBox
                                            type="password"
                                            placeholder="Password"
                                            classname="form-control"
                                            name="password"
                                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                                            required
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
                            <label className="col-md-4 control-label">Confirm Password</label>
                            <div className="col-md-6 inputGroupContainer">
                                <div className="input-group">
                                        <InputBox
                                            type="password"
                                            placeholder="Password"
                                            classname="form-control"
                                            name="confirmpassword"
                                            required
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
                                <div className="col-md-6">
                                  
                                    <button className="btn btn-lg btn-primary btn-block sign-up">Register<span className="glyphicon glyphicon-submit"></span></button>

                                    <p>
                                        Already Have Account? <Link to="/" className="register-btn">Sign in</Link>
                                    </p>
                                </div>
                        </div>
                    </fieldset>
                </form>
			</div>
        )
    }
}
