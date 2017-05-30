import React, { Component } from 'react';
import { Row,Col,Radio, Button, Calendar, Icon, Upload, message } from 'antd';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import EachCustomerInAssignedTour from './EachCustomerInAssignedTour';

import Cookies from 'js-cookie'

class EachAssignedTour extends Component {

  constructor(props){
    super(props)
    this.state = {

    }
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }




  componentDidMount(){

  }

  componentWillReceiveProps(nextProps){

  }



  render() {


    return (

      <div className="assigned-tour-wrapper">
        <Row style={{marginBottom:'2%'}}>
          <Col span={4}>
            <b>Start time</b>
          </Col>
          <Col span={4}>
            {this.props.eachTourInfo.start_date}
          </Col>
          <Col span={4}>
            <b>Tour type</b>
          </Col>
          <Col span={4}>
            {this.props.eachTourInfo.tour_type}
          </Col>
          <Col span={4}>
            <b>Total Participants</b>
          </Col>
          <Col span={4}>
            {this.props.eachTourInfo.participants}
          </Col>
        </Row>


        <div>
          <EachCustomerInAssignedTour dispatch={this.props.dispatch} bookedTourID={this.props.bookedTourID} />
        </div>

      </div>

    );
  }
}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps)(EachAssignedTour)
