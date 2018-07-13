import React, { Component } from 'react';
import Register from './Register'

export default class RegisterPage extends Component {
  render(){
    return(
      <div className="container-fluid screen-width nospace">
          <div className="row">
              <div className="col-md-6 nospace">
                    <div className="header">
                            <h3><span>Soft</span><span><b>vision</b></span></h3>
                    </div>
                    <div className="body">
                         <div className="row">
                             <div className="col-md-12 nospace" >
                                    <img id="landing-page-id" src="images/interview.jpg" className="img-responsive" alt="Responsive image" />
                             </div>
                         </div>
                    </div>
                    <div className="footer">
                            © 2018 Softvision. All rights reserved. Privacy Policy
                    </div>
              </div>
              <div className="col-md-6 login-page">

                   <Register url="http://localhost:3000/candidateInfo"/>

              </div>
          </div>
        </div>
    )
  }
}