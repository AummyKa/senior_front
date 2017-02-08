import React from 'react'
import LoginPage from "./LoginPage";
import DashboardPage from "./DashboardPage";
import { connect } from 'react-redux'
import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router'

const App = React.createClass({
  getDefaultProps () {
    return {
      loggedIn: false
    }
  },

  changePage () {
    if (!this.props.loggedIn) {
      return (
        <LoginPage />
      )
    } else {
      return (
        <DashboardPage />
      )
    }
  },
  render () {
    return (
      <div>
        {this.changePage()}
        
      </div>
    )
  }
})

const mapStateToProps = (state) => ({
  loggedIn: state.login.loggedIn
})

export default connect(mapStateToProps)(App)
