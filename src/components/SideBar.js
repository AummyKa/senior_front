import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import {changePage} from '../actions/action-changePage'
import { connect } from 'react-redux'
import { Link } from 'react-router';
import apiAccess from '../Helpers/apiAccess'

import Cookies from 'js-cookie'

const SubMenu = Menu.SubMenu;

class SideBar extends Component {

  constructor(props){
    super(props)
    this.state={
      userName: Cookies.get('userName'),
      userRole: Cookies.get('userRole'),
      token: Cookies.get('token')
    }
  }

  clickPage = (page) => {
    this.props.dispatch(changePage(page))
  }



  render() {
    return (

      <div>
      { this.state.userRole !== 'Tour Guide' && this.state.token ?
      <div className="layout-aside">
          <aside className="layout-sider">
          <div className="layout-logo">
            <h5>Welcome!</h5>
            {this.state.userName}
          </div>
          <Menu mode="inline" theme="dark">

            {this.state.userRole == 'Manager' ?
              <SubMenu key="Home" title={<span><Icon type="user" /><Link to={`/home`}>Home</Link></span>}/>
            : null
            }

            <SubMenu key="GuideProfile" title={<span><Icon type="laptop" /><Link to={`/guide`}>Guide Profile</Link></span>}/>
            <SubMenu key="Schedule" title={<span><Icon type="notification" /><Link to={`/schedule`}>Schedule</Link></span>}/>
            <SubMenu key="Tours" title={<span><Icon type="notification" /><Link to={`/tours`}>Tours</Link></span>}/>
            <SubMenu key="Staff" title={<span><Icon type="notification" /><Link to={`/staff`}>Staff</Link></span>}/>
            <SubMenu key="BookingMethod" title={<span><Icon type="notification" /><Link to={`/bookingMethod`}>Booking Method</Link></span>}/>
          </Menu>

      </aside>
      <div className="layout-main">


      </div>
    </div>
    : null}
  </div>

    );
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.login.loggedIn
})

export default connect(mapStateToProps)(SideBar)
