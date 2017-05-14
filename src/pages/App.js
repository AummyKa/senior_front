import React, { Component } from 'react';
import PropTypes from 'prop-types'
import LoginPage from "./LoginPage";
import DashboardPage from "./DashboardPage";
import { connect } from 'react-redux'
import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router'
import Cookies from 'js-cookie'

import enUS from 'antd/lib/locale-provider/en_US';
import { LocaleProvider } from 'antd'


class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      loggedIn: false
    }
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  componentDidMount(){
    this.changePage()
  }


  changePage () {
    // Call API check token

    if (!Cookies.get('token')) {
      this.context.router.replace('/')
    }else {
      this.context.router.replace('/home')
    }
  }

  render () {
    return (
      <div>
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
