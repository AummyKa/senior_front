import React, { Component } from 'react';
import { connect } from 'react-redux'

import { Modal } from 'react-bootstrap';
import { Button } from 'antd'




const AddTourModal = React.createClass({

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
      <Button className = "add-event" onClick={() => this.setState({ show: true})}>+</Button>

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



export default connect(mapStateToProps)(AddTourModal);
