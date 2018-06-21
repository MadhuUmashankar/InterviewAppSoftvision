import React, { Component } from 'react';
import InputBox from './InputBox'

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [], show: false, searchKey:"", modalLabelView: false, candidate:{} };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        window.location.href="#/app"
    }

    handleOnRegister(e) {
        e.preventDefault();
        window.location.href="#/register"
    }

    handleOnChange(e) {
        e.preventDefault();
    }


    render() {
        return (
            <div className="signin-form">
				<h3 className="sub-title">Login Form</h3>
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
                                    <button className="btn btn-primary login-btn" type="submit">Sign In<span className="glyphicon glyphicon-submit"></span></button>
                                    <button className="btn btn-primary" onClick={this.handleOnRegister}>Sign Up<span className="glyphicon glyphicon-submit"></span></button>
                                </div>
                        </div>
                    </fieldset>
                </form>
			</div>
        )
    }
}