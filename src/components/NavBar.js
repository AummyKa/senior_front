import { Menu, Icon } from 'antd';
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {changePage} from '../actions/action-changePage'
import apiAccess from '../Helpers/apiAccess'
import { connect } from 'react-redux'

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

  handleClick = (e) => {

    if(e.key=="Logout"){
      apiAccess({
        url: 'http://localhost:8000/logout',
        method: 'GET',
        payload: {},
        attemptAction: () => this.props.dispatch({ type: 'LOGOUT_ATTEMPT' }),
        successAction: (json) => this.props.dispatch({ type: 'LOGOUT_SUCCESS', json }),
        failureAction: () => this.props.dispatch({ type: 'LOGOUT_FAILED' })
      })
    }else{
      console.log('click ', e.key);
        this.props.dispatch(changePage(e.key))
      this.setState({
        current: e.key,
      });
    }
  }

  componentWillReceiveProps = (nextProps) => {
    console.log(nextProps.isLogout)
    if(this.props.isLogout !== nextProps.isLogout){
      this.context.router.replace('/')
      window.location.replace("/home")
      // this.setState({data: GuideUserData(nextProps.guideDetail,)})
    }
  }

  render() {
    return (
      <div className = "nav-bar">
        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="horizontal">

          <Menu.Item key="Mail">
            <Icon type="mail" />Mail
          </Menu.Item>
          <Menu.Item key="PendingList">
            <Icon type="user" />Pending List
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
