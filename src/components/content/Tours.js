import React, { Component } from 'react';
import PropTypes from 'prop-types'

import AddNewTourModal from '../AddNewTourModal';
import { Button, Col, Row } from 'antd';

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
      showTourBox: true,
      tour_id:''
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
      this.setState({tours_data: nextProps.tours_data})
    }
    if(nextProps.add_newTour_success_status){
      this.setState({showAddNewTour:false})
    }
    if(this.props.tour_cur_id !== nextProps.tour_cur_id){
      this.setState({tour_id: nextProps.tour_cur_id})

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
        tour_cur_id: state.tourAction.tour_cur_id
    };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllTourAttempt: () => dispatch({ type: 'GET_ALL_TOURS_ATTEMPT' }),
    getAllTourSuccess: (json) => dispatch({ type: 'GET_ALL_TOURS_SUCCESS', json }),
    getAllTourFailed: () => dispatch({ type: 'GET_ALL_TOURS_FAILED' })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tours)
