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
      current: 'mail',
      userRole: Cookies.get('userRole')
    }
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
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
      Cookies.remove('userName')
      Cookies.remove('userRole')
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

          {this.state.userRole == 'Manager' ?
          <Menu.Item key="PendingList">
            <Link to ={`/pending`}>Pending List</Link>
          </Menu.Item>
          : null
          }
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
