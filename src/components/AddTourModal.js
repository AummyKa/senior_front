import React, { Component } from 'react';
// import { connect } from 'react-redux'
// import LoginForm from './LoginForm.js';
// import RegistForm from './RegistForm.js';


// import style from '../../public/css/login.css';

import { Modal } from 'react-bootstrap';
import { Button } from 'antd';
import AddTourForm from './AddTourForm';

const AddTourModal = React.createClass({

  getInitialState() {
    return { show: false };
  },

  addEvent(){
    this.setState({show:true})
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
            <Modal.Title id="contained-modal-title">Add Tour and Guide at {this.props.selectedDate}</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <AddTourForm selectedDate = {this.props.selectedDate}  dispatch = {this.props.dispatch} />

          </Modal.Body>

        </Modal>
      </div>
    </div>
    );
  },
});



export default AddTourModal;
