import { Menu, Icon } from 'antd';
import React, { Component } from 'react';
import {changePage} from '../actions/action-changePage'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const NavBar = React.createClass({
  getInitialState() {
    return {
      current: 'mail',
    };
  },
  handleClick(e) {
    console.log('click ', e.key);
      this.props.dispatch(changePage(e.key))
    this.setState({
      current: e.key,
    });
  },

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
            <Icon type="loggedIn" />Log out
          </Menu.Item>

      </Menu>
      </div>
    );
  },
});

export default NavBar
