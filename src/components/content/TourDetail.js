import { Button, Col, Row } from 'antd';
import React, { Component } from 'react';

import AddNewTourModal from '../AddNewTourModal';

import { Modal } from 'react-bootstrap';
import apiAccess from '../../Helpers/apiAccess'
import {connect} from 'react-redux';

class TourDetail extends Component {

  constructor(props){
    super(props)
    this.state = {
      tour_id: this.props.tour_cur_id,
      tour_data: []
    }
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
        <Row>
          <Col span={8}>

            <div className = "tour-picture">

            </div>

            <div className = "tour-title">
              <div className = "tour-title-name">
                <h4>{this.state.tour_data.tour_name}</h4>
              </div>
            </div>

            <div className = "tour-description">
                <h5>{this.state.tour_data.description}</h5>
            </div>

            <div className = "tour-type">
                <h5>{this.state.tour_data.type}</h5>
            </div>

            <div className = "tour-guide-expert">

            </div>

          </Col>
          <Col span={16}>

            <div className = "tour-summary">

            </div>

            <div className = "tour-anecdote">
              <Row>
                <Col span={12}>
                  <div className = "tour-top-nation">

                  </div>
                </Col>
                <Col span={12}>
                  <div className = "tour-others">

                  </div>
                </Col>
              </Row>
            </div>

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
