import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import {changePage} from '../actions/action-changePage'
import { connect } from 'react-redux'
import { Link } from 'react-router';
import apiAccess from '../Helpers/apiAccess'
import { expandSideBar } from '../actions/action-expandSideBar'

import Cookies from 'js-cookie'

const SubMenu = Menu.SubMenu;

class SideBar extends Component {

  constructor(props){
    super(props)
    this.state={
      userName: Cookies.get('userName'),
      userRole: Cookies.get('userRole'),
      token: Cookies.get('token'),
      z_index:this.props.z_index,
      showCancelButton:false
    }
  }

  clickPage = (page) => {
    this.props.dispatch(changePage(page))
  }

  componentWillReceiveProps(nextProps){
      if(nextProps.showSideBar){
        this.setState({showCancelButton: true})
      }else{
        this.setState({showCancelButton: false})
      }
  }

  closeSideBar(){
    this.props.dispatch(expandSideBar("TOGGLE_SIDEBAR",false))
  }



  render() {
    return (

      <div>
      { this.state.userRole !== 'Tour Guide' && this.state.token ?
      <div className="layout-aside"  style={{zIndex:this.state.z_index}}>
          <aside className="layout-sider">
          <div className="layout-logo">
            { this.state.showCancelButton ?
              <Icon type="close" onClick={()=>this.closeSideBar()} />
              : null
            }
            <h5>Welcome!</h5>
            <Link to={`/staff/`+Cookies.get('userID')} style={{ textDecoration: 'none'}}>{this.state.userName}</Link>
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
  loggedIn: state.login.loggedIn,
  showSideBar: state.clickSideBar.showSideBar
})

export default connect(mapStateToProps)(SideBar)
