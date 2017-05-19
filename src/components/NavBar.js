import { Menu, Icon, Row, Col } from 'antd';
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {changePage} from '../actions/action-changePage'
import apiAccess from '../Helpers/apiAccess'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Cookies from 'js-cookie'

import { expandSideBar } from '../actions/action-expandSideBar'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;



class NavBar extends Component {


  constructor(props){
    super(props)
    this.state = {
      current: 'mail',
      userRole: Cookies.get('userRole'),
      token: Cookies.get('token'),
      showSideBar: true
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

  expandMenu(){
    this.props.dispatch(expandSideBar("TOGGLE_SIDEBAR",this.state.showSideBar))
  }

  componentWillReceiveProps = (nextProps) => {
    console.log(nextProps.isLogout)
    if(this.props.isLogout !== nextProps.isLogout){
      if(nextProps.isLogout){
        Cookies.remove('token')
        Cookies.remove('userName')
        Cookies.remove('userRole')
        Cookies.remove('tour_id')
        Cookies.remove('userID')
        Cookies.remove('guide_id')
        window.location.replace('http://localhost:3000/');
      }
    }
      this.setState({showSideBar:!nextProps.showSideBar})
  }

  render() {
    return (
      <div className = "nav-bar">

        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="horizontal">

          <Menu.Item key="expand">
            <Row>
              <Col xs={{ span: 2}} lg={{ span: 0 }}>
                <Icon type="menu-unfold" onClick={()=>this.expandMenu()} />
              </Col>
            </Row>
          </Menu.Item>

          {this.state.userRole == 'Manager' ?
          <Menu.Item key="PendingList">
            <Link to ={`/pending`}>Pending List</Link>
          </Menu.Item>
          : null
          }

          {this.state.token ?
          <Menu.Item key="Logout">
            <Icon type="loggedIn" /> Log out
          </Menu.Item>
          :
          null
          }

      </Menu>
      </div>
    );
  }
}

function mapStateToProps(state) {

    return {
        isLogout: state.logout.isLogout,
        showSideBar: state.clickSideBar.showSideBar
    };
}

export default connect(mapStateToProps)(NavBar)
