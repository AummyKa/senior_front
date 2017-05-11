import React, { Component } from 'react';
import PropTypes from 'prop-types'

import AddNewTourModal from '../AddNewTourModal';

import { Button, Col, Row, Icon} from 'antd';
import { Modal } from 'react-bootstrap';
import apiAccess from '../../Helpers/apiAccess'

import EachTourRevChart from '../EachTourRevChart'
import EachTourExpertGuide from '../EachTourExpertGuide'
import EachTourSchedule from '../EachTourSchedule'
import EachTourCostModel from '../EachTourCostModel'
import CostModelModal from '../CostModelModal'

import {connect} from 'react-redux';
import Cookies from 'js-cookie'

class TourDetail extends Component {

  constructor(props){
    super(props)
    this.state = {
      tour_data: [],
      showCostModelModal: false
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

  showCostModelModal(){
    this.setState({showCostModelModal: true})
  }



  render() {

    let closeCostModelModal = () => { this.setState({showCostModelModal: false}) }

    return (

      <div>

      <div className="modal-container">
          <Modal
            show={this.state.showCostModelModal}
            onHide={closeCostModelModal}
            container={this}
            aria-labelledby="contained-modal-title"
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title">Cost Modal</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <CostModelModal dispatch = {this.props.dispatch}/>
            </Modal.Body>

          </Modal>
      </div>

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
              <div className = "cost-model-title">
                  <b>Cost Model
                    <span><Icon type="edit"
                    onClick = {()=>this.showCostModelModal()}
                    className = "btn-edit-in-tour-detail" />
                  </span></b>
              </div>
              <EachTourCostModel />
            </div>

            <div className = "edit-tour-data">
              <div className = "edit-tour-title"><b>Edit Tour</b></div>
            </div>

            <div className = "expert-list">
              <div className = "expert-guide-list-title"><b>Expert Guide</b></div>
              <div className = "expert-list-table">
                <EachTourExpertGuide/>
              </div>
            </div>

          </Col>
          <Col span ={16} offset = {1}>
            <div className = "tour-graph">
              <div className = "tour-graph-title"><b>Tour Revenue</b></div>

              <div className = "tour-rev-chart">
                <EachTourRevChart />
              </div>

            </div>
            {/*
            <div className = "tour-schedule">
              <div className = "each-tour-schedule-title"><b>Tour Schedule</b></div>
              <div className = "tour-schedule-wrapper">

              </div>
            </div>
            */}
            <Row>
              <Col span = {14}>
                <div className = "each-tour-popular-nation">
                  <div className = "each-tour-popular-nation-title"><b>Popular Nation</b></div>
                </div>
              </Col>
              <Col span = {9} offset = {1}>
                <div className = "each-tour-unassigned-guide">
                  <div className = "each-tour-unassigned-guide-title"><b>Unassigned Guide</b></div>
                </div>
              </Col>
            </Row>

          </Col>
        </Row>
      </div>
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
