import React, {
  Component
}
from 'react';



export default class ActiveRoleBreadScrumb extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.handleActiveRole = this.handleActiveRole.bind(this);
  }

  handleActiveRole(role, event) {
    sessionStorage.setItem('activeRole', role);
    location.reload();
  }

  render() {
    const {
      currentUser
    } = this.props;
    return ( < div className = "row" >
      < div className = "col-md-12" >
      < ul className = "breadcrumb pull-right" > {
        currentUser.length && currentUser[0].role.map((object, i) =>
          < li className = "bread-scrumb-role" > < span > {
            object
          } < /span></li >
        )
      } < /ul> < /div > < /div>
    )
  }
}
