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

import Cookies from 'js-cookie'

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
      guideLay: false,
      userRole: Cookies.get('userRole'),
      token: Cookies.get('token')

    }
  }
  static contextTypes = {
    router: PropTypes.object.isRequired
  }


  render(){
          return(
          <div>
            {this.state.userRole !== 'Tour Guide' && this.state.token ?
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
              :
              <Row>
                  <NavBar dispatch={this.props.dispatch}
                    style = {{width:'70%', margin:'0 auto 4% auto'}} />
                    <div style = {{width:'70%', margin:'0 auto',marginTop:'3%',marginButtom:'3%'}}>
                      {this.props.children}

                    </div>
              </Row>
          }
        </div>
      );
  }

}


export default (DashboardPage);
