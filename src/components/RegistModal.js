import React, { Component } from 'react';
import LoginForm from './LoginForm.js';
import RegistForm from './RegistForm.js';

import style from '../../public/css/login.css';

import { Modal, Button } from 'antd';

const RegistModal = React.createClass({

  getInitialState() {
    return { visible: false };
  },
  showModal() {
    this.setState({
      visible: true,
    });
  },
  handleOk() {
    console.log('Clicked OK');
    this.setState({
      visible: false,
    });
  },
  handleCancel(e) {
    console.log(e);
    this.setState({
      visible: false,
    });
  },
  render() {
    return (
      <div>
        <a onClick={this.showModal}>Create a new account</a>
        <Modal title="Registration" visible={this.state.visible}
          onCancel={this.handleCancel} style = {style}>
         <RegistForm />
        </Modal>
      </div>
    );
  },
});

export default RegistModal;
