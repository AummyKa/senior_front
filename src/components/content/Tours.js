import React, { Component } from 'react';
import PropTypes from 'prop-types'

import AddNewTourModal from '../AddNewTourModal';
import { Button, Col, Row } from 'antd';

import Box from '../Box'

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

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  componentWillMount(){
    this.getTours()

  }

  componentWillReceiveProps(nextProps){
    if(this.props.tours_data !== nextProps.tours_data){
      if(nextProps.tours_data){
        this.setState({tours_data: nextProps.tours_data})
      }
    }
    if(nextProps.add_newTour_success_status){
      this.setState({showAddNewTour:false})
      this.getTours()
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
              dispatch = {this.props.dispatch}
              key = {index}
              item = {item}  />
        ));
    }else {
      return []
    }

  }

  TourBox({item, show, handleClickBox,dispatch}){
    return (
      <Col xs={24} sm={12} lg={{span:6,offset:1}} className="gutter-row">
        <Box
          dispatch = {dispatch}
          data = {item}
        />
      </Col>
    )
  }


  render() {

    let title = "Add new tour"
    let closeAddNewTour = () => this.setState({ showAddNewTour: false});

    return (

      <div className="tour-list-show-case">
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

        <div className = "tour-topic">
          <h2>Tours</h2>
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
        tours_data: state.getTourData.tours_data,
        add_newTour_success_status: state.addNewTour.add_newTour_success_status
    };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllTourAttempt: () => dispatch({ type: 'GET_ALL_TOUR_DATA_ATTEMPT' }),
    getAllTourSuccess: (json) => dispatch({ type: 'GET_ALL_TOUR_DATA_SUCCESS', json }),
    getAllTourFailed: () => dispatch({ type: 'GET_ALL_TOUR_DATA_FAILED' })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tours)
