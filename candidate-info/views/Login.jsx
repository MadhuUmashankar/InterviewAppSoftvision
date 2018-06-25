import React, { Component } from 'react';
import InputBox from './InputBox';
import axios from 'axios';
import {hashHistory} from 'react-router';

import {
    BrowserRouter as Router,
    Link,
    Route,
    Switch,
    HashRouter
  } from 'react-router-dom';


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [], show: false, searchKey:"", modalLabelView: false, candidate:{}, username: '', password: '', message:'' };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const { username, password } = this.state;
        
        axios.post(this.props.url+'/login', { username, password })
          .then((result) => {
            localStorage.setItem('jwtToken', result.data.token);
            this.setState({ message: '' });
            hashHistory.push({
                pathname: '#/app'
              })
          })
          .catch((error) => {
            if(error) {
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
        const { message } = this.state;
        return (
            <div className="signin-form">
				<h3 className="sub-title">Login Form</h3>
                <form className="form-horizontal" onSubmit={ this.handleSubmit }>
                {message !== '' &&
                    <div className="alert alert-warning alert-dismissible" role="alert">
                    { message }
                    </div>
                }
                    <fieldset className = "background">
                        <div className="form-group">
                            <label className="col-md-4 control-label">User Name</label>  
                            <div className="col-md-8 inputGroupContainer">
                                <div className="input-group">
                                        <InputBox
                                            type="text"
                                            placeholder="Username"
                                            classname="form-control"
                                            name="username"
                                            autoFocus="true"
                                            required
                                            onChange = {this.handleOnChange}                                    
                                        />
                                    
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-4 control-label">Password</label>  
                            <div className="col-md-8 inputGroupContainer">
                                <div className="input-group">
                                        <InputBox
                                            type="password"
                                            placeholder="password"
                                            classname="form-control"
                                            name="password"
                                            required
                                            onChange = {this.handleOnChange}                                    
                                        />
                                    
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-4 control-label"></label>
                                <div className="col-md-8 btn-wrapper">
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