import React, { Component } from 'react';
import { connect } from 'react-redux'
import LoginForm from './LoginForm.js';
import RegistForm from './RegistForm.js';


import style from '../../public/css/login.css';

import { Modal,Button } from 'react-bootstrap';




const RegistModal = React.createClass({

  getInitialState() {
    return { show: false };
  },

  componentWillReceiveProps (nextProps) {
    console.log(nextProps)
    if(nextProps.registed){
      this.setState({show: false})
    }
  },


  render() {
    let close = () => this.setState({ show: false});


    return (

      <div>
      <a onClick={() => this.setState({ show: true})}><h4> Create an account </h4></a>

      <div className="modal-container" >

        <Modal
          show={this.state.show}
          onHide={close}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">Registration</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <RegistForm dispatch={this.props.dispatch} />
          </Modal.Body>

        </Modal>
      </div>
    </div>
    );
  },
});

const mapStateToProps = (state) => ({
  registed: state.regist.registed
})



export default connect(mapStateToProps)(RegistModal);
