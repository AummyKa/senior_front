import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import {changePage} from '../actions/action-changePage'


const SubMenu = Menu.SubMenu;

class SideBar extends Component {

  clickPage = (page) => {

    this.props.dispatch(changePage(page))
  }

  render() {
    return (

      <div className="layout-aside">
          <aside className="layout-sider">
          <div className="layout-logo"></div>
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

export default SideBar
