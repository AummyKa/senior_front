import { Button, Col, Row } from 'antd';
import React, { Component } from 'react';

import AddNewTourModal from '../AddNewTourModal';
import Box from '../Box'
import TourDetail from './TourDetail'

import { Modal } from 'react-bootstrap';
import apiAccess from '../../Helpers/apiAccess'
import {closeAllTourBox} from '../../actions/action-closeAllTourBox'
import {connect} from 'react-redux';

class Tours extends Component {

  constructor(props){
    super(props)
    this.state = {
      tours_data: [],
      showAddNewTour: false,
      showTourBox: true
    }
  }

  addNewTour(){
    this.setState({showAddNewTour: true})
  }

  componentWillMount(){
    this.props.handleAfterClickBox()
    this.getTours()

  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps.inVisible)
    if(this.props.tours_data !== nextProps.tours_data){
      this.setState({tours_data: nextProps.tours_data})
    }
    if(nextProps.add_newTour_success_status){
      this.setState({showAddNewTour:false})
    }
  }


  getTours(){
    apiAccess({
      url: 'http://localhost:8000/tours',
      method: 'GET',
      payload: null,
      attemptAction: this.props.getAllTourAttempt,
      successAction: this.props.getAllTourSuccess,
      failureAction: this.props.getAllTourFailed
    })
  }

  renderTour(data){
    console.log(this.state.showTourBox)
    if (data !== undefined) {
      const TourBox = this.TourBox
      return data.map((item,index) => (
            <TourBox
              show = {this.state.showTourBox}
              handleClickBox = {this.props.handleClickBox}
              key = {index}
              item = {item}  />
        ));
    }else {
      return []
    }

  }

  TourBox({item, show, handleClickBox}){
    return (
      <Col className="gutter-row" span={8}>
        <Box
          show = {show}
          handleClickBox = {handleClickBox}
          data = {item}
        />
      </Col>
    )
  }


  render() {

    let title = "Add new tour"
    let closeAddNewTour = () => this.setState({ showAddNewTour: false});

    return (

      <div>
        <div className="modal-container" >
          <Modal
            show={this.state.showAddNewTour}
            onHide={closeAddNewTour}
            container={this}
            aria-labelledby="contained-modal-title"
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title">{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <AddNewTourModal />
            </Modal.Body>

          </Modal>
        </div>

        <div className = "topic">
          <h2>Tours</h2>
        </div>

        <div className = "tour-detail">
          { this.props.inVisible ? <TourDetail /> : null  }
        </div>

        <div className = "tour-table">
            <div className="gutter-example">
              <Row gutter={16}>
                {this.renderTour(this.state.tours_data)}
              </Row>
            </div>
        </div>

        <Button type = "dash" className = "btn-add-tour-form" onClick = {() => this.addNewTour()}> + </Button>

    </div>

    );
  }
}

function mapStateToProps(state) {

    return{
        tours_data: state.getTours.tours_data,
        add_newTour_success_status: state.addNewTour.add_newTour_success_status,
        inVisible: state.tourAction.inVisible
    };
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleAfterClickBox: () => dispatch(closeAllTourBox('FINISH_CLOSE_ALL_TOURS')),
    handleClickBox: () => dispatch(closeAllTourBox('CLOSE_ALL_TOURS')),
    getAllTourAttempt: () => dispatch({ type: 'GET_ALL_TOURS_ATTEMPT' }),
    getAllTourSuccess: (json) => dispatch({ type: 'GET_ALL_TOURS_SUCCESS', json }),
    getAllTourFailed: () => dispatch({ type: 'GET_ALL_TOURS_FAILED' })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tours)
