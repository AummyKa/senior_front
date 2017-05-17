import React, { Component } from 'react';

import PropTypes from 'prop-types'


import Cookies from 'js-cookie'

class InvalidPage extends Component {

  constructor(props){
    super(props)
    this.state ={
      invalid_announcement: "Sorry, You are not allowed to access this page"
    }
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }


  render() {

    return (

      <div style={{margin:'10%'}}>
        <h1>{this.state.invalid_announcement}</h1>
      </div>

    );
  }
}


export default InvalidPage
