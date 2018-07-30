import React, { Component } from 'react';

export default class Header extends Component {
  render() {
    return(
      <div className="container-fluid screen-width nospace">
          <div className="landing-row">
                <div className="col-md-12 nospace">
                <div className="header">
                        <span className="header-alignment">
                          <img id="logo-page-id" src="images/SV_Facebook_Logo.jpg" className="img-responsive" alt="Responsive image" />
                          <h3>|IMS</h3>
                        </span>
                </div>
          </div>
      </div>
    </div>
    )
  }
}
