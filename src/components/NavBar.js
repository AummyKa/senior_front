import { Menu, Icon } from 'antd';
import React, { Component } from 'react';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const NavBar = React.createClass({
  getInitialState() {
    return {
      current: 'mail',
    };
  },
  handleClick(e) {
    console.log('click ', e);
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

          <Menu.Item key="mail">
            <Icon type="mail" />Mail
          </Menu.Item>
          <Menu.Item key="logout">
            <Icon type="loggedIn" />Log out
          </Menu.Item>

      </Menu>
      </div>
    );
  },
});

export default NavBar
