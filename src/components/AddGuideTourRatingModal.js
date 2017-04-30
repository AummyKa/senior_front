import React, { Component } from 'react';
import {connect} from 'react-redux';

import { InputNumber, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, TimePicker} from 'antd';
import moment from 'moment';

import apiAccess from '../Helpers/apiAccess'
import Cookies from 'js-cookie'

import { Modal } from 'react-bootstrap';

const FormItem = Form.Item;
const Option = Select.Option;



String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}



function throwOptionTourNameObject(data){
  if(data){
    let temp = []
    for (let i = 0; i < data.length; i++) {
      temp.push(<Option key= {i}>{data[i].name}</Option>);
    }
    return temp
  }
}

let uuid = 0

const AddGuideTourRatingModal = Form.create()(React.createClass({

  getInitialState() {
    return{
      listAllTourName: [],
      uuid: 0
    }
  },

  getAllTour(){
    apiAccess({
      url: 'http://localhost:8000/tours/name',
      method: 'GET',
      payload: null,
      attemptAction: () => this.props.dispatch({ type: 'GET_ALL_TOURS_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'GET_ALL_TOURS_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'GET_ALL_TOURS_FAILED' })
    })
  },

  componentWillReceiveProps(nextProps){

    if(this.props.tours_data !== nextProps.tours_data){
      this.setState({listAllTourName: nextProps.tours_data})
      console.log(nextProps.tours_data)
    }

    if(this.props.addGuideExpertStatus !== nextProps.addGuideExpertStatus){
      if(nextProps.addGuideExpertStatus){
        this.getAllTour()
      }
    }

  },

  componentWillMount(){
    this.getAllTour()

  },

  handleSubmit(e){
      e.preventDefault();

      this.props.form.validateFieldsAndScroll((err, values) => {
        console.log(values)
        if (!err) {
          const count = this.props.form.getFieldValue('keys').length
          console.log(count)
          let payload = []
          for(var i = 1; i <= count; i++){
            console.log(this.props.form.getFieldValue(`tourname-${i}`))
            let val = this.props.form.getFieldValue(`tourname-${i}`)
            console.log(val)
            let tourname = this.handleTourNameSelect(val)
            var expert = {
                tour: tourname,
                rate: this.props.form.getFieldValue(`rating-${i}`)
              }

            payload[i-1] = expert
          }
          this.addExpertField(payload)
        }
      });
    },

  handleTourNameSelect(value){
    if(this.state.listAllTourName){
      console.log(value)
      console.log(this.state.listAllTourName)
      let name = this.state.listAllTourName[value].name
      return name
    }
  },

  addExpertField(payload){
    let id = Cookies.get('guide_id')
    apiAccess({
      url: 'http://localhost:8000/staffs/add-expert/'+id,
      method: 'POST',
      payload: payload,
      attemptAction: () => this.props.dispatch({ type: 'ADD_GUIDE_EXPERT_FIELD_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'ADD_GUIDE_EXPERT_FIELD_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'ADD_GUIDE_EXPERT_FIELD_FAILED' })
    })
  },

  remove(k){
   const { form } = this.props;
   // can use data-binding to get
   const keys = form.getFieldValue('keys');
   // We need at least one passenger
   if (keys.length === 1) {
     return;
   }
   // can use data-binding to set
   form.setFieldsValue({
     keys: keys.filter(key => key !== keys.slice(-1).pop()),
   });

 },

 add(){
   let num = this.state.uuid
   num++
   this.setState({uuid:num})
   console.log(num)

   const { form } = this.props;
   // can use data-binding to get
   const keys = form.getFieldValue('keys');
   const nextKeys = keys.concat(num);
   // can use data-binding to set
   // important! notify form to detect changes
   form.setFieldsValue({
     keys: nextKeys,
   });
 },


  render(){
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };
    //customer input form
  const formItemLayoutWithOutLabel = {
     wrapperCol: { span: 12, offset: 10 },
   };
   getFieldDecorator('keys', { initialValue: [] });
   const keys = getFieldValue('keys');
   console.log(keys)

   this.state.formItems = keys.map((k, index) => {
     console.log(k)
     return (

         <div className = "add-rating" key={k}>
           <Row>
             <Col span={1} offset = {22}>
               <Icon style = {{ right: '4%' }}
                 className="dynamic-delete-button"
                 type="minus-circle-o"
                 disabled={keys.length === 1}
                 onClick={() => this.remove()}
               />
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={16}>
              <FormItem
                {...formItemLayout}
                label="Tour"
              >
                {getFieldDecorator(`tourname-${k}`, {
                })(
                    <Select
                       showSearch
                       placeholder="Select a tour"
                       optionFilterProp="children"
                       filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                     >
                      {throwOptionTourNameObject(this.state.listAllTourName)}
                     </Select>

                )}
              </FormItem>
            </Col>
            <Col span={8}>
                <FormItem
                  {...formItemLayout}
                  label=""
                >
                  {getFieldDecorator(`rating-${k}`, {
                  })(
                    <InputNumber placeholder = "rate here!" />
                  )}
                </FormItem>
            </Col>
          </Row>
       </div>

     );

   });


   return (

     <div>

     <Button onClick={this.add} >Add</Button>
     <Form className = "add-tour-form" horizontal onSubmit={this.handleSubmit}>
         {this.state.formItems}
        <FormItem {...formItemLayoutWithOutLabel}>
          <Button type="primary" htmlType="submit" size="large">Submit</Button>
        </FormItem>
     </Form>
   </div>

   );
 },
}));

function mapStateToProps(state) {

    return {
        addGuideExpertStatus: state.addGuideExpertField.addGuideExpertStatus,
        tours_data: state.getTours.tours_data

    };
}

export default connect(mapStateToProps)(AddGuideTourRatingModal);
