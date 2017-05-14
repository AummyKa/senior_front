import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Row,Col, Content } from 'antd';

import SideBar from '../components/SideBar'
import NavBar from '../components/NavBar'
import Guide from '../components/content/Guide'
import Home from '../components/content/Home'
import PendingList from '../components/content/PendingList'
import Tours from '../components/content/Tours'
import Schedule from '../components/content/Schedule'
import Staff from '../components/content/Staff'
import GuideLayout from '../components/content/GuideLayout'

class DashboardPage extends Component {

  constructor(props){
    super(props)

    this.state = {
      home: true,
      guide: false,
      schedule: false,
      tour: false,
      finance: false,
      pendinglist: false,
      tours: false,
      guideLay: false

    }
  }
  static contextTypes = {
    router: PropTypes.object.isRequired
  }


  render(){
          return(
          <div>
              <Row style = {{height:'100%',backgroundColor:'#ffffff'}}>
                  <Col xs={0} lg={4} style = {{height:'100%' }}>
                      <SideBar dispatch={this.props.dispatch} />
                          {/*{this.state.people.map(({ _id, name, age }) => {*/}
                              {/*return <div key={_id}>#{_id} Name: {name}, Age: {age}</div>*/}
                          {/*})}*/}
                  </Col>
                  <Col xs={24} lg={20} >
                    <NavBar dispatch={this.props.dispatch} />
                      <div style={{ padding: 60 }}>
                        {this.props.children}

                      </div>
                  </Col>
              </Row>
          </div>
      );
  }

}


export default (DashboardPage);
