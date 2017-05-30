import React, { Component } from 'react';
import { connect } from 'react-redux'
import moment from 'moment';

import apiAccess from '../Helpers/apiAccess'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, TimePicker, InputNumber } from 'antd';
import { error } from './Modal'

var countries = require('country-list')();

const FormItem = Form.Item;
const Option = Select.Option;
const countryList = countries.getData()


function throwOptionBookingMethodObject(data){
  let temp = []
  for (let i = 0; i < data.length; i++) {
    temp.push(<Option key= {i}>{data[i].name}</Option>);
  }
  return temp
}

function throwOptionCountryObject(data){
  let temp = []
  if(data){
    for (let i = 0; i < data.length; i++) {
      temp.push(<Option key= {i}><div>{data[i].name}</div></Option>);
    }
  }
  return temp
}


const format = 'HH:mm';

const EditCurCustomerModal = Form.create()(React.createClass({

  getInitialState() {

    return {
      eachCustomer: this.props.eachCurCustomer,
      selectedTourName: "",
      selectedTourType: "",
      selectedTourTime: "",
      bookingMethodLists:[],
      curTourID: this.props.curTourID,
      selectedBookingMethod: this.props.eachCurCustomer.booking_method
      }
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

  handleBookingMethodSelect(value,option){
    console.log(this.state.bookingMethodLists[value].name)
    this.setState({ selectedBookingMethod: this.state.bookingMethodLists[value].name });
  },

  handleCountrySelect(value,option){
    if(typeof countryList[value] !== 'undefined'
    && typeof countryList[value].name !== 'undefined'){
      return countryList[value].name
    }else
      return 'Afghanistan'
  },


  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {

        let pickupTime =  this.props.form.getFieldValue(`pickup_time_hour`)+':'+
                          this.props.form.getFieldValue(`pickup_time_min`)

        let payload = {
            _id: this.state.eachCustomer._id,
            booking_method: this.state.selectedBookingMethod,
            email: this.props.form.getFieldValue(`email`),
            phone: this.props.form.getFieldValue(`phone`),
            name: this.props.form.getFieldValue(`name`),
            country: this.handleCountrySelect(this.props.form.getFieldValue(`country`)),
            pickup_time: pickupTime,
            pickup_place: this.props.form.getFieldValue(`pickup_place`),
            participants: this.props.form.getFieldValue(`participants`),
            price: this.props.form.getFieldValue('price'),
            remark: this.props.form.getFieldValue(`remark`)
        }

        console.log(payload)

          apiAccess({
            url: 'http://localhost:8000/bookedtours/update-customer/'+this.state.curTourID,
            method: 'POST',
            payload: payload,
            attemptAction: () => this.props.dispatch({ type: 'EDIT_CUSTOMER_IN_TOUR_ATTEMPT' }),
            successAction: (json) => this.props.dispatch({ type: 'EDIT_CUSTOMER_IN_TOUR_SUCCESS', json }),
            failureAction: () => this.props.dispatch({ type: 'EDIT_CUSTOMER_IN_TOUR_FAILED' })
          })
      }else
            console.log("error")
      });
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

 checkCharIntHour(rule, value, callback){
   if(!value.match(/^[0-9]+$/) || value.length < 2 || value > 24 || value <0){
     callback('the input should be an appropriate hour');
   }else {
     callback()
   }
 },

 checkCharIntMin(rule, value, callback){
   if(!value.match(/^[0-9]+$/) || value.length < 2 || value > 60 || value <0){
     callback('the input should be an appropriate minute');
   }else {
     callback()
   }
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
      <Form className = "add-tour-form" onSubmit={this.handleSubmit}>
        <Row>
          <Col span={10} >
              <FormItem
                {...formItemLayout}
                label="Booking Method"
              >
                {getFieldDecorator(`bookingMethods`, {
                  initialValue: this.state.eachCustomer.booking_method
                })(
                  <Select
                     showSearch
                     style={{ width: '80%', marginRight: 5 }}
                     placeholder="Select an booking method"
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
               required={false}
             >
               {getFieldDecorator(`email`, {
                 initialValue: this.state.eachCustomer.email,
                 validateTrigger: ['onChange', 'onBlur'],
                 rules: [{
                   type: 'email',
                   required: true,
                   message: "Please input a valid customer's email.",
                 }],
               })(
                 <Input placeholder="email" style={{ width: '80%', marginRight: 5 }} />
               )}

             </FormItem>

             <FormItem
               {...formItemLayout}
               label={'Name : '}
               required={false}
             >
               {getFieldDecorator(`name`, {
                 initialValue: this.state.eachCustomer.name,
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
                 initialValue: this.state.eachCustomer.country,
                 validateTrigger: ['onChange', 'onBlur'],
                 rules: [{
                   required: true, message: 'Please select a country!',
                 }]
               })(
                 <Select
                    showSearch
                    style={{ width: '80%', marginRight: 5 }}
                    placeholder="Select a country"
                    optionFilterProp="children"
                    onSelect={this.handleCountrySelect}
                    filterOption={(input, option) => option.props.children.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                   {throwOptionCountryObject(countryList)}
                  </Select>
               )}

             </FormItem>

             <FormItem
               {...formItemLayout}
               label={'Phone : '}
               required={false}
             >
               {getFieldDecorator(`phone`, {
                 validateTrigger: ['onChange', 'onBlur'],
                initialValue: this.state.eachCustomer.phone,

               })(
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
               {getFieldDecorator(`price`, {
                 validateTrigger: ['onChange', 'onBlur'],
                initialValue: this.state.eachCustomer.price,
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
                 initialValue: this.state.eachCustomer.pickup_place,
                 validateTrigger: ['onChange', 'onBlur'],

               })(
                 <Input placeholder="choose a location"  style={{ width: '70%', marginRight: 11 }} />
               )}

             </FormItem>

            { typeof this.state.eachCustomer.pickup_time !== 'undefined' &&
              this.state.eachCustomer.pickup_time !== ""  ?
              <FormItem
                 {...formItemLayout}
                 label={'Pickup Time'}
                 required={false}
               >
                   <Row>
                    <Col span="3">
                     <FormItem>
                       {getFieldDecorator(`pickup_time_hour`,
                         {initialValue: this.state.eachCustomer.pickup_time.split(':')[0]},{
                         rules: [
                       { validator: this.checkCharIntHour}]}
                       )(
                       <Input placeholder="00"/>
                       )}
                     </FormItem>
                   </Col>
                   <Col span="1">
                     <p className="ant-form-split">:</p>
                   </Col>
                   <Col span="3">
                     <FormItem>
                       {getFieldDecorator(`pickup_time_min`,
                         {initialValue: this.state.eachCustomer.pickup_time.split(':')[1]},{
                         rules: [
                       { validator: this.checkCharIntMin}]})(
                       <Input placeholder="00"/>
                       )}
                     </FormItem>
                   </Col>
                 </Row>
               </FormItem>
              :
              <FormItem
                 {...formItemLayout}
                 label={'Pickup Time'}
                 required={false}
               >
                   <Row>
                    <Col span="3">
                     <FormItem>
                       {getFieldDecorator(`pickup_time_hour`,
                         {initialValue: this.state.eachCustomer.pickup_time.split(':')[0]},{
                         rules: [{
                          required: true
                        }]},
                       { validator: this.checkCharInt}
                       )(
                       <Input placeholder="00"/>
                       )}
                     </FormItem>
                   </Col>
                   <Col span="1">
                     <p className="ant-form-split">:</p>
                   </Col>
                   <Col span="3">
                     <FormItem>
                       {getFieldDecorator(`pickup_time_min`,
                         {initialValue: this.state.eachCustomer.pickup_time.split(':')[1]})(
                       <Input placeholder="00"/>
                       )}
                     </FormItem>
                   </Col>
                 </Row>

               </FormItem>
            }

           <FormItem
              {...formItemLayout}
              label={'Participant : '}
            >

            {getFieldDecorator(`participants`, {
              initialValue: this.state.eachCustomer.participants
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
               initialValue: this.state.eachCustomer.remark,
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

function mapStateToProps(state){
  return{
    bookingMethodLists: state.getBookingMethods.bookingMethodLists
  }
}

export default connect(mapStateToProps)(EditCurCustomerModal);
