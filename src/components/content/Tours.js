import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Row,Col,Button } from 'antd';

import AddTourModal from './AddTourModal'

import Box from '../Box'


const renderTour = (data) =>  {
  if(data.length > 0){
    return data.map((item,index) => (
        <TourBox key = {index} item = {item}  />
    ));
  }else {
    return [];
  }
}

const TourBox = ({item}) => {
  return (
    <Col className="gutter-row" span={8}>
      <Box data = {item} />
    </Col>

  )
}

const addTour = () => {

}


class Tours extends Component {

  // const numbers = this.props.getTours;
  // const listItems = numbers.map((number) =>
  //   <li key={number.toString()}>
  //     {number}
  //   </li>
  // );
  constructor(props){
    super(props)
    this.state = {
      data : this.props.getTours
    }
  }

  render() {

    const tourBox = renderTour(this.state.data)

    return (

      <div>
        <div className = "topic">
          <h2>Tours</h2>
        </div>

        <div className = "tour-table">
            <div className="gutter-example">
              <Row gutter={16}>
                {tourBox}
              </Row>
            </div>
        </div>
        <Row>

   </Row>

  <AddTourModal />


    </div>

    );
  }
}

function mapStateToProps(state) {

    return {
        getTours: state.getTours,
    };
}

export default connect(mapStateToProps)(Tours)
