import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import {changePage} from '../actions/action-changePage'
import { connect } from 'react-redux'

import apiAccess from '../Helpers/apiAccess'


const SubMenu = Menu.SubMenu;

class SideBar extends Component {

  clickPage = (page) => {
    this.props.dispatch(changePage(page))
  }

  getName = () => {

    apiAccess({
      url: 'http://localhost:8000/staffs',
      method: 'GET',
      payload: null,
      attemptAction: () => this.props.dispatch({ type: 'GET_NAME_OF_USER_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'GET_NAME_OF_USER_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'GET_NAME_OF_USER__FAILED' })
    })

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
            <SubMenu key="Home" title={<span><Icon type="user" />Home</span>}
              onTitleClick={()=> this.clickPage("Home")} />
            <SubMenu key="GuideProfile" title={<span><Icon type="laptop" />Guide Profile</span>}
              onTitleClick ={()=>this.clickPage("GuideProfile")} />
            <SubMenu key="Schedule" title={<span><Icon type="notification" />Schedule</span>}
              onTitleClick ={()=>this.clickPage("Schedule")} />
            <SubMenu key="Tours" title={<span><Icon type="notification" />Tours</span>}
              onTitleClick ={()=>this.clickPage("Tours")} />
            <SubMenu key="Staff" title={<span><Icon type="notification" />Staff</span>}
              onTitleClick ={()=>this.clickPage("Staff")} />
            <SubMenu key="Finance" title={<span><Icon type="notification" />Finance</span>}
              onTitleClick ={()=>this.clickPage("Home")} />
          </Menu>

      </aside>
      <div className="layout-main">
        <div className="layout-header"></div>
        <div className="layout-container">

          <div className="layout-content">
            <div style={{ height: 590 }}>

            </div>
          </div>
        </div>

      </div>
    </div>

    );
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.login.loggedIn,
})

export default connect(mapStateToProps)(SideBar)
