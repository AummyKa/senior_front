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

    }
  }

  render() {

    return (

      <div>
        <h1>Hello</h1>
      </div>

    );
  }
}

export default TourDetail
