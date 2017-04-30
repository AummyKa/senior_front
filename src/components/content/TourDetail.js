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
      tour_id: Cookies.get('tour_id'),
      tour_data: []
    }
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }


  getTourData(){
    let id = this.state.tour_id
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
