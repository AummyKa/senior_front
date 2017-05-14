import { Menu, Icon } from 'antd';
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {changePage} from '../actions/action-changePage'
import apiAccess from '../Helpers/apiAccess'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Cookies from 'js-cookie'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;



class NavBar extends Component {


  constructor(props){
    super(props)
    this.state = {
      current: 'mail'
    }
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  componentWillReceiveProps(nextProps){
    if(this.props.isLogout !== nextProps.isLogout){
      if(nextProps.isLogout){

      }
    }
  }

  handleClick = (e) => {

    if(e.key=="Logout"){
      let token = Cookies.get('token')
      apiAccess({
        url: 'http://localhost:8000/logout',
        method: 'POST',
        payload: {
          token: token
        },
        attemptAction: () => this.props.dispatch({ type: 'LOGOUT_ATTEMPT' }),
        successAction: (json) => this.props.dispatch({ type: 'LOGOUT_SUCCESS', json }),
        failureAction: () => this.props.dispatch({ type: 'LOGOUT_FAILED' })
      })
    }else{

    }
  }

  componentWillReceiveProps = (nextProps) => {
    console.log(nextProps.isLogout)
    if(this.props.isLogout !== nextProps.isLogout){
      Cookies.remove('token')
      this.context.router.replace('/')
    }
  }

  render() {
    return (
      <div className = "nav-bar">
        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="horizontal">

          <Menu.Item key="PendingList">
            <Link to ={`/pending`}>Pending List</Link>
          </Menu.Item>
          <Menu.Item key="Logout">
            <Icon type="loggedIn" /> Log out
          </Menu.Item>


      </Menu>
      </div>
    );
  }
}

function mapStateToProps(state) {

    return {
        isLogout: state.logout.isLogout
    };
}

export default connect(mapStateToProps)(NavBar)
