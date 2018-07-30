import React, { Component } from 'react';
import Register from './Register';
import $http from '../routes/http';

export default class RegisterPage extends Component {
  render(){
    return(
      <div className="container-fluid screen-width nospace">
          <div className="landing-row">
              <div className="col-md-6 nospace">
                    <div className="header">
                      <img id="logo-page-id" src="images/SV_Facebook_Logo.jpg" className="img-responsive" alt="Responsive image" />

                    </div>
                    <div className="body">
                         <div className="row">
                             <div className="col-md-12 nospace" >
                                    <img id="landing-page-id" src="images/interviewImg.jpg" className="img-responsive" alt="Responsive image" />
                             </div>
                         </div>
                    </div>
                    <div className="footer">
                            © 2018 Softvision. All rights reserved. Privacy Policy
                    </div>
              </div>
              <div className="col-md-6 login-page">

                   <Register url="/candidateInfo"/>

              </div>
          </div>
        </div>
    )
  }
}
