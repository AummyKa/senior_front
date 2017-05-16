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


  componentWillReceiveProps(nextProps){
    if(this.props.loggedIn !== nextProps.loggedIn){
      if(nextProps.loggedIn){
          this.changePage()
      }
    }
  }


  changePage () {
    // Call API check token

    if (typeof Cookies.get('token')==='undefined' && Cookies.get('token') === null) {
      this.context.router.replace('/')
    }else {
      let role = Cookies.get('userRole')
      let id = Cookies.get('userID')
      console.log(id)
      switch (role) {

        case 'Manager':
        this.context.router.replace('/home')
        break;

        case 'Operation':
        this.context.router.replace('/schedule')
        break;

        case 'Customer Service':
        this.context.router.replace('/schedule')
        break;

        case 'Finance':
        this.context.router.replace('/schedule')
        break;

        case 'Tour Guide':
        console.log("hi tour")
        Cookies.set('guide_id',id)
        this.context.router.replace('/guide/'+id)
        break;


        default:
          return ''
        }


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
