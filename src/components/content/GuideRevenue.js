import React, { Component } from 'react';
import { Row,Col,Radio,Button,Input, DatePicker,Form } from 'antd';
import {connect} from 'react-redux';

import { Select } from 'antd';
const Option = Select.Option;
// import moment from 'moment';
// import 'moment/locale/en_US';
//
//
// import apiAccess from '../../Helpers/apiAccess'

// const { MonthPicker, RangePicker } = DatePicker;
// const dateFormat = 'YYYY-MM-DD';
// moment.locale('en_US');

class GuideRevenue extends Component {

  constructor(props){
    super(props)
    this.state = {
      current_m_salary: "28,500",
      amount_of_working_month: "72",
      average_salary: "30,000",
      cur_m_working_tour: "7"
    }
  }

  handleChange(value) {
    console.log(`selected ${value}`);
  }

  render() {

    return (

      <div className = "guide-content" >

        <div className = "guide-rev-top-detail">
        <Row>
           <Col span={12}>
           <ul>
            <li>Current month salary</li><br/>
            <li>Amount of working month</li><br/>
            <li>Average salary</li><br/><br/>
            <li>Current month working tours</li>
          </ul>
           </Col>

           <Col span={12}>
             <ul>
              <li>{this.state.current_m_salary}     baht</li><br/>
              <li>{this.state.amount_of_working_month}     tours</li><br/>
              <li>{this.state.average_salary}     baht</li><br/><br/>
              <li>{this.state.cur_m_working_tour}     tours</li>
            </ul>
           </Col>
        </Row>
      </div>
        <div className = "guide-rev-butom-detail">
          <Col span={6}>
            <h4> Salary Summary </h4>
          </Col>
          <Col span={6} >
            <Select defaultValue="lucy" style={{ width: 120 }} onChange={this.handleChange}>
               <Option value="jack">Jack</Option>
               <Option value="lucy">Lucy</Option>
               <Option value="disabled" disabled>Disabled</Option>
               <Option value="Yiminghe">yiminghe</Option>
             </Select>

          </Col>
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {

    return {

      }
}


export default connect(mapStateToProps)(GuideRevenue)
