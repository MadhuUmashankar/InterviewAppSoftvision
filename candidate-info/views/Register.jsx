import React, { Component } from 'react';
import InputBox from './InputBox'
import axios from 'axios';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = { username:'', email: '', password:'', confirmpassword:'' };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleOnChange(event) {
        const { value } = event.target;

        switch (event.target.name) {
            case "username":
                this.setState({username : value})
                break;
            case "email":
                this.setState({email : value})
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
        const { username, email, password, confirmpassword} = this.state;

        const user = {
            username,
            email,
            password,
            confirmpassword
        }

        axios.post(this.props.url+'/newUser', user)
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
        return (
            <div className="signin-form">
				<h3 className="sub-title">Sign Up Form</h3>
                <form className="form-horizontal" onSubmit={ this.handleSubmit }>
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
                            <label className="col-md-4 control-label">Email</label>  
                            <div className="col-md-8 inputGroupContainer">
                                <div className="input-group">
                                        <InputBox
                                            type="email"
                                            placeholder="email"
                                            classname="form-control"
                                            name="email"
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
                            <label className="col-md-4 control-label">Confirm Password</label>  
                            <div className="col-md-8 inputGroupContainer">
                                <div className="input-group">
                                        <InputBox
                                            type="password"
                                            placeholder="password"
                                            classname="form-control"
                                            name="confirmpassword"
                                            required
                                            onChange = {this.handleOnChange}                                    
                                        />
                                    
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-4 control-label"></label>
                                <div className="col-md-8">
                                    <button className="btn btn-primary">Sign Up<span className="glyphicon glyphicon-submit"></span></button>
                                </div>
                        </div>
                    </fieldset>
                </form>
			</div>
        )
    }
}