import React, { Component } from 'react';
import { connect } from 'react-redux'
import moment from 'moment';

import apiAccess from '../Helpers/apiAccess'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, TimePicker, InputNumber } from 'antd';
import { error } from './Modal'

const FormItem = Form.Item;
const Option = Select.Option;



function throwOptionBookingMethodObject(data){
  let temp = []
  for (let i = 0; i < data.length; i++) {
    temp.push(<Option key= {i}>{data[i].name}</Option>);
  }
  return temp
}

const format = 'HH:mm';

const AddMoreCustomerModal = Form.create()(React.createClass({

  getInitialState(){
    return{
      bookingMethodLists: [],
      tourID: this.props.addTourID,
      selectedBookingMethod: 'Walk-in'
    }
  },

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {

        let pickupTime = ''
        if(this.props.form.getFieldValue(`pickup_time`) !== '' &&
        typeof this.props.form.getFieldValue(`pickup_time`) !== 'undefined'){
            pickupTime = this.props.form.getFieldValue(`pickup_time`).format('HH:mm')
        }

        let payload = {
          booking_method: this.state.selectedBookingMethod,
          email: this.props.form.getFieldValue(`email`),
          name: this.props.form.getFieldValue(`name`),
          country: this.props.form.getFieldValue(`country`),
          pickup_time: pickupTime,
          pickup_place: this.props.form.getFieldValue(`pickup_place`),
          participants: this.props.form.getFieldValue(`participants`),
          phone: this.props.form.getFieldValue('phone'),
          price: this.props.form.getFieldValue('price'),
          remark: this.props.form.getFieldValue(`remark`)
        }

          apiAccess({
            url: 'http://localhost:8000/bookedtours/insert-customer/'+this.state.tourID,
            method: 'POST',
            payload: payload,
            attemptAction: () => this.props.dispatch({ type: 'ADD_MORE_CUSTOMER_IN_TOUR_ATTEMPT' }),
            successAction: (json) => this.props.dispatch({ type: 'ADD_MORE_CUSTOMER_IN_TOUR_SUCCESS', json }),
            failureAction: () => this.props.dispatch({ type: 'ADD_MORE_CUSTOMER_IN_TOUR_FAILED' })
          })
        }else
            console.log("error")
      });

  },

  componentWillMount(){
    this.getBookingMethods()
  },

  componentWillReceiveProps(nextProps){
    if(this.props.bookingMethodLists !== nextProps.bookingMethodLists){
        if(nextProps.bookingMethodLists){
            this.setState({bookingMethodLists:nextProps.bookingMethodLists})
        }
    }
  },

  getBookingMethods(){
    apiAccess({
      url: 'http://localhost:8000/bookingmethods/',
      method: 'GET',
      payload: null,
      attemptAction: () => this.props.dispatch({ type: 'GET_BOOKING_METHODS_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'GET_BOOKING_METHODS_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'GET_BOOKING_METHODS_FAILED' })
    })
  },

  handlePasswordBlur(e) {
    const value = e.target.value;
    this.setState({ passwordDirty: this.state.passwordDirty || !!value });
  },
  checkPassword(rule, value, callback) {
    const form = this.props.form;

    if(value && value !== form.getFieldValue('password')){
      callback('Two passwords that you enter is inconsistent!');
    }else {
      callback();
    }

  },
  checkConfirm(rule, value, callback) {
    const form = this.props.form;
    if(value.length < 6 || value.length > 14 ) {
     callback('Your password must have 6 to 14 characters');
   }else if (value && this.state.passwordDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  },

  //name, surname
  checkString(rule, value, callback){
    if(!value.match(/^[a-zA-Z]/)){
      console.log("nooo")
      callback('input should contains only alphabets');
    }else if(value.length > 40 ) {
     callback('number of characters should not exceed 40 characters');
   }else {
     callback()
   }
 },
 checkTel(rule, value, callback){
   if(!value.match(/^[0-9]+$/) || value.length != 9){
     callback('the input should be an appropriate phone number');
   }else {
     callback()
   }
 },

 handleBookingMethodSelect(value,option){
   this.setState({ selectedBookingMethod: this.state.bookingMethodLists[value].name });
 },

  render() {

    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };
    //customer input form
  const formItemLayoutWithOutLabel = {
     wrapperCol: { span: 12, offset: 10 },
   };

     return (

         <div className = "customer-info">
          <Form onSubmit={this.handleSubmit}>
          <Row>

            <Col span={10}>

              <FormItem
                {...formItemLayout}
                label="Booking Method"
              >
                {getFieldDecorator(`bookingmethods`, {
                  initialValue: ['Walk-in'],
                })(
                  <Select
                     showSearch
                     style={{ width: '80%', marginRight: 5 }}
                     placeholder="Select a person"
                     optionFilterProp="children"
                     onSelect={this.handleBookingMethodSelect}
                     filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                   >
                    {throwOptionBookingMethodObject(this.state.bookingMethodLists)}
                   </Select>
                )}
              </FormItem>

           <FormItem
             {...formItemLayout}
             label= {'Email : '}
           >
             {getFieldDecorator(`email`, {
               validateTrigger: ['onChange', 'onBlur'],
               rules: [{
                 required: true,
                 whitespace: true,
                 message: "Please input customer's email.",
               }],
             })(
               <Input placeholder="email" style={{ width: '80%', marginRight: 5 }} />
             )}

           </FormItem>

           <FormItem
             {...formItemLayout}
             label={'Name : '}
           >
             {getFieldDecorator(`name`, {
               validateTrigger: ['onChange', 'onBlur'],
               rules: [{
                 required: true,
                 whitespace: true,
                 message: "Please input customer's name.",
               }],
             })(
               <Input placeholder="name"  style={{ width: '80%', marginRight: 5 }} />
             )}

           </FormItem>

           <FormItem
             {...formItemLayout}
             label={'Country : '}
             required={false}
           >
             {getFieldDecorator(`country`, {
               validateTrigger: ['onChange', 'onBlur'],

             })(
               <Input placeholder="country"  style={{ width: '80%', marginRight: 5 }} />
             )}

           </FormItem>

           <FormItem
             {...formItemLayout}
             label={'Phone : '}
             required={false}
           >
             {getFieldDecorator(`phone`, {
               validateTrigger: ['onChange', 'onBlur'],
             },{ validator: this.checkTel})(
               <Input placeholder="phone"  style={{ width: '80%', marginRight: 5 }} />
             )}

           </FormItem>


         </Col>
           <Col span={14}>

             <FormItem
               {...formItemLayout}
               label={'Price : '}
               required={true}
             >
               {getFieldDecorator(`price`,{
                 rules: [{
                   required: true, message: 'Please input your price!',
                 }]},{
                 validateTrigger: ['onChange', 'onBlur'],

               })(
                 <InputNumber min={0} max={100000} placeholder="price"  style={{ width: '30%', marginRight: 11 }} />
               )}

             </FormItem>

             <FormItem
               {...formItemLayout}
               label={'Pickup Place : '}
               required={false}
             >
               {getFieldDecorator(`pickup_place`, {
                 validateTrigger: ['onChange', 'onBlur'],

               })(
                 <Input placeholder="choose a location"  style={{ width: '70%', marginRight: 11 }} />
               )}

             </FormItem>


           <FormItem
              {...formItemLayout}
              label="Pickup time"
            >
              {getFieldDecorator(`pickup_time`)(
                <TimePicker
                  style={{ width: '30%', marginRight: 11}}
                  format={format} placeholder = "pickup" />
              )}
            </FormItem>

           <FormItem
              {...formItemLayout}
              label={'Participant : '}
              required={true}
            >

            {getFieldDecorator(`participants`,{
              rules: [{ required: true, message: 'Please input amount of participants!' }],
            })(
              <InputNumber
                style={{ width: '30%', marginRight: 11}}
                min={1}
                max={60}
              />
            )}

            </FormItem>
           <FormItem
             {...formItemLayout}
             label={'Remark : '}
             required={false}
           >
             {getFieldDecorator(`remark`, {
               validateTrigger: ['onChange', 'onBlur'],
             })(
               <Input type="textarea" rows={3} style={{ width: '70%' }} />
             )}

           </FormItem>
         </Col>
         </Row>
         <Row>

           <FormItem {...formItemLayoutWithOutLabel}>
             <Button type="primary" htmlType="submit" size="large">Submit</Button>
           </FormItem>

         </Row>
       </Form>
       </div>

     );

  },
}));

const mapStateToProps = (state) => ({
    bookingMethodLists: state.getBookingMethods.bookingMethodLists

})

export default connect(mapStateToProps)(AddMoreCustomerModal);
