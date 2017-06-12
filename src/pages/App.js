import React, { Component } from 'react';
import PropTypes from 'prop-types'
import LoginPage from "./LoginPage";
import DashboardPage from "./DashboardPage";
import { connect } from 'react-redux'
import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router'
import Cookies from 'js-cookie'

import enUS from 'antd/lib/locale-provider/en_US';
import { LocaleProvider } from 'antd'

const apiConfig = (url) =>{
  if(process.env.NODE_ENV == "development"){
    let server_url = "http://localhost:3000/"
    let result = "http://localhost:3000/"+url
    return result
  }else if(process.env.NODE_ENV == "production"){
    let server_url = "http://128.199.234.89/"
    let result = "http://128.199.234.89/"+url
    return result
  }
}


class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      loggedIn: false,
      token: Cookies.get('token'),
      role: Cookies.get('userRole'),
      user_id:Cookies.get('userID')
    }
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  componentWillMount(){
    console.log(process.env.NODE_ENV)
  }

  componentWillReceiveProps(nextProps){
    if(this.props.loggedIn !== nextProps.loggedIn){
      if(nextProps.loggedIn){
        window.location.replace(apiConfig(""));
      }
    }
  }


  render () {
    return (
      <div style={{cursor: "pointer"}}>
        <LocaleProvider locale={enUS}>
          {this.props.children}
        </LocaleProvider>
      </div>
    )
  }

}

const mapStateToProps = (state) => ({
  loggedIn: state.login.loggedIn,
  token: state.login.token
})

export default connect(mapStateToProps)(App)
