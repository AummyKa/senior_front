import React, { Component } from 'react';
// import { connect } from 'react-redux'
// import LoginForm from './LoginForm.js';
// import RegistForm from './RegistForm.js';


// import style from '../../public/css/login.css';

import { Modal,Button } from 'react-bootstrap';


const TimeSlotModal = React.createClass({

  getInitialState() {
    return { show: true };
  },


  render() {
    let close = () => this.setState({ show: false});
    return (

      <div>

      <div className="modal-container" >

        <Modal
          show={this.state.show}
          onHide={close}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">Add Tour and Guide</Modal.Title>
          </Modal.Header>
          <Modal.Body>

          </Modal.Body>

        </Modal>
      </div>
    </div>
    );
  },
});



export default TimeSlotModal;
