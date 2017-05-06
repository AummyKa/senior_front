import { Button, Col, Row } from 'antd';
import React, { Component } from 'react';
import PropTypes from 'prop-types'

import AddNewTourModal from '../AddNewTourModal';

import { Modal } from 'react-bootstrap';
import apiAccess from '../../Helpers/apiAccess'
import {connect} from 'react-redux';
import Cookies from 'js-cookie'

class TourDetail extends Component {

  constructor(props){
    super(props)
    this.state = {
      tour_data: []
    }
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }


  getTourData(){
    let id = Cookies.get('tour_id')
    apiAccess({
      url: 'http://localhost:8000/tours/'+id,
      method: 'GET',
      payload: null,
      attemptAction: () => this.props.dispatch({ type: 'GET_TOUR_DATA_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'GET_TOUR_DATA_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'GET_TOUR_DATA_FAILED' })
    })
  }

  componentWillMount(){
    this.getTourData()
  }

  componentWillReceiveProps(nextProps){
    if(this.props.tour_data !== nextProps.tour_data){
      this.setState({tour_data:nextProps.tour_data})
      console.log(nextProps.tour_data)
    }
  }


  render() {

    return (

      <div className = "tour_content">
        <Row>
          <Col span ={7}>

            <div className = "tour-picture">
            </div>

            <div className = "tour-title" style = {{  fontSize: 20 }}>
              {this.state.tour_data.tour_name}
            </div>

            <div className = "tour-description">
              {this.state.tour_data.description}
            </div>

            <div className = "cost-model">
              <div className = "cost-model-title"></div>
            </div>

            <div className = "edit-tour-data">
            </div>

            <div className = "expert-list">
            </div>

          </Col>
          <Col span ={16} offset = {1}>
            <div className = "tour-graph">
            </div>

            <div className = "tour-schedule">
            </div>

            <Row>
              <Col span = {14}>
                <div className = "each-tour-popular-nation">
                </div>
              </Col>
              <Col span = {9} offset = {1}>
                <div className = "each-tour-unassigned-guide">
                </div>
              </Col>
            </Row>

          </Col>
        </Row>
      </div>

    );
  }
}



function mapStateToProps(state){
  return{
    tour_cur_id: state.tourAction.tour_cur_id,
    tour_data: state.getTourData.tour_data
  }
}

export default connect(mapStateToProps)(TourDetail)
