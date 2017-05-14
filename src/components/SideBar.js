import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import {changePage} from '../actions/action-changePage'
import { connect } from 'react-redux'
import { Link } from 'react-router';
import apiAccess from '../Helpers/apiAccess'


const SubMenu = Menu.SubMenu;

class SideBar extends Component {

  clickPage = (page) => {
    this.props.dispatch(changePage(page))
  }

  getName = () => {

    // apiAccess({
    //   url: 'http://localhost:8000/staffs',
    //   method: 'GET',
    //   payload: null,
    //   attemptAction: () => this.props.dispatch({ type: 'GET_NAME_OF_USER_ATTEMPT' }),
    //   successAction: (json) => this.props.dispatch({ type: 'GET_NAME_OF_USER_SUCCESS', json }),
    //   failureAction: () => this.props.dispatch({ type: 'GET_NAME_OF_USER__FAILED' })
    // })

    return(
        <h5>Aummy</h5>
    )
  }

  render() {
    return (


      <div className="layout-aside">
          <aside className="layout-sider">
          <div className="layout-logo">
            <h5>Welcome!</h5>
            {this.getName()}
          </div>
          <Menu mode="inline" theme="dark">
            <SubMenu key="Home" title={<span><Icon type="user" /><Link to={`/home`}>Home</Link></span>}/>
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

    );
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.login.loggedIn,
})

export default connect(mapStateToProps)(SideBar)
