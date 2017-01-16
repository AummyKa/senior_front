import React, { PropTypes, Component } from 'react';
import { Row,Col, Form, Icon, Input, Button, Checkbox } from 'antd';

import SideBar from '../components/SideBar'

class DashboardPage extends Component {


  constructor (props) {
      super(props)

  }


  render(){
          return(
          <div>
              <Row>
                  <Col span={4}>
                      <SideBar />
                          {/*{this.state.people.map(({ _id, name, age }) => {*/}
                              {/*return <div key={_id}>#{_id} Name: {name}, Age: {age}</div>*/}
                          {/*})}*/}
                    
                  </Col>

                  <Col span={18} >

                  </Col>
          </Row>
          </div>
      );
  }

}

export default DashboardPage;
