import React, { PropTypes, Component } from 'react';
import {connect} from 'react-redux';

import { InputNumber, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button } from 'antd';
import apiAccess from '../Helpers/apiAccess'

import { error } from './Modal'

import CustomerInput from './CustomerInput'

const FormItem = Form.Item;
const Option = Select.Option;


const tournames = ['Burns Bay Road', 'Downing Street', 'Wall Street'];
const agencies = ['N/A','Happy','Hula hula']


// const tournames = [{
//   value: 'zhejiang',
//   label: 'Zhejiang',
// }, {
//   value: 'jiangsu',
//   label: 'Jiangsu',
// }];

const tourtypes = [{
  value: 'public',
  label: 'public',
}, {
  value: 'private',
  label: 'private',
}]




String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}


function throwOption(data){
  let temp = []
  for (let i = 0; i < data.length; i++) {
    temp.push(<Option key= {i}>{data[i]}</Option>);
  }
  return temp
}

function getGuideName(gList,resultJSON){
  for(var i = 0; i < gList.length; i++) {
    var objectJSON = {
      name: gList[i].name
    }
    resultJSON[i] = objectJSON
  }

}

function throwOptionObject(data){
  let temp = []
  for (let i = 0; i < data.length; i++) {
    temp.push(<Option key= {i}>{data[i].name}</Option>);
  }
  return temp
}



const AddTourForm = Form.create()(React.createClass({

  getInitialState() {
    this.getGuideList()
    return{
      showCusInput: false,
      cusLen: 0,
      guide_name: []
    }
  },

  handleSubmit(e){
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    },

  handleChange(value){
    console.log(`selected ${value.capitalize()}`)
  },

  handleCustomerChange(val){
    console.log(val)
    if(val !== 0){
        this.setState({cusLen: parseInt(val)})
        this.setState({showCusInput:true})
      }
  },

  getGuideList(){
    apiAccess({
      url: 'http://localhost:8000/staffs/tour-guides',
      method: 'GET',
      payload: null,
      attemptAction: () => this.props.dispatch({ type: 'GET_GUIDE_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'GET_GUIDE_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'GET_GUIDE_FAILED' })
    })
  },

  componentWillReceiveProps(nextProps){
    if(this.props.guideLists!=nextProps.guideLists){
      getGuideName(nextProps.guideLists,this.state.guide_name)
    }
  },

  showCustomerInput(){
      var count = this.state.cusLen
      while(count>=0){
        console.log(count)
        return(
          <CustomerInput />
        )
        count = count - 1
      }
  },

  render(){
  const { getFieldDecorator } = this.props.form;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
   return (
     <Form horizontal onSubmit={this.handleSubmit}>
       <FormItem
         {...formItemLayout}
         label="Tour name"
       >
         {getFieldDecorator('tourname', {

         })(
           <Select
              showSearch
              style={{ width: 300 }}
              placeholder="Select a person"
              optionFilterProp="children"
              onChange={this.handleChange}
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
             {throwOption(tournames)}
            </Select>
         )}
       </FormItem>

       <FormItem
         {...formItemLayout}
         label="Tour Type"
       >
         {getFieldDecorator('tourtype', {
           initialValue: ['public'],

         })(
           <Cascader options={tourtypes} style={{ width: 200 }} />
         )}
       </FormItem>

       <FormItem
         {...formItemLayout}
         label="Agency"
       >
         {getFieldDecorator('Agency', {
           initialValue: ['N/A'],

         })(
           <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Select a person"
              optionFilterProp="children"
              onChange={this.handleChange}
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
             {throwOption(agencies)}
            </Select>
         )}
       </FormItem>

       <FormItem
         {...formItemLayout}
         label="Tour Guide"
       >
         {getFieldDecorator('TourGuide', {

         })(
           <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Select a person"
              optionFilterProp="children"
              onChange={this.handleChange}
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
             {throwOptionObject(this.state.guide_name)}
            </Select>
         )}
       </FormItem>

       <FormItem
         {...formItemLayout}
         label="Amount of Customer"
       >
        {getFieldDecorator('customer', {
          onChange: this.handleCustomerChange,
          initialValue: 0 } )(
          <InputNumber min={1} max={20}/>
        )}
       </FormItem>

       { this.state.showCusInput ? this.showCustomerInput() : null }

     </Form>
   );
 },
}));

function mapStateToProps(state) {

    return {
        guideLists: state.guideDetail.guideLists
    };
}

export default connect(mapStateToProps)(AddTourForm);
