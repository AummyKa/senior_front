import React, { Component } from 'react';
import {connect} from 'react-redux';

import { InputNumber, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, TimePicker} from 'antd';
import moment from 'moment';

import apiAccess from '../Helpers/apiAccess'
import changeDateFormat from '../Helpers/changeDateFormat'
import { addTour } from '../actions/action-addTour'
import { sendSuggestedGuideName } from '../actions/action-sendSuggestedGuideName'

var countries = require('country-list')();


// import { getAllTour } from '../actions/GET/action-getAllTour'

import { error } from './Modal'
import Geosuggest from 'react-geosuggest';
import { Modal } from 'react-bootstrap';

import CustomerInput from './CustomerInput'

const FormItem = Form.Item;
const Option = Select.Option;
const format = 'HH:mm';
const countryList = countries.getData()





const tourtypes = [{
  value: 'Public',
  label: 'Public',
}, {
  value: 'Private',
  label: 'Private',
}]

const tour_period = [{
  value: 'Full-Day',
  label: 'Full-Day',
}, {
  value: 'Morning',
  label: 'Morning',
}, {
  value: 'Afternoon',
  label: 'Afternoon',
}, {
  value: 'Evening',
  label: 'Evening',
}]



String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}


function getGuideName(gList,resultJSON){
  if ("undefined" !== typeof gList) {
    for(var i = 0; i < gList.length; i++) {
      var objectJSON = {
        name: gList[i].name
      }
      resultJSON[i] = objectJSON
    }
  }
}


function throwOptionGuideObject(data){
  let temp = []
  if(data){
    for (let i = 0; i < data.length; i++) {
      temp.push(<Option key= {i}><div>{data[i].fullname}</div></Option>);
      // if(data[i].isActive){
      //   temp.push(<Option key= {i}><div>{data[i].fullname}</div></Option>);
      // }
    }
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

function throwOptionBookingMethodObject(data){
  let temp = []
  for (let i = 0; i < data.length; i++) {
    temp.push(<Option key= {i}>{data[i].name}</Option>);
  }
  return temp
}

function throwOptionTourTypeObject(data){
  let temp = []
  for (let i = 0; i < data.length; i++) {
    temp.push(<Option key= {i}>{data[i].value}</Option>);
  }
  return temp
}

function throwOptionTourPeriodObject(data){
  let temp = []
  for (let i = 0; i < data.length; i++) {
    temp.push(<Option key= {i}>{data[i].value}</Option>);
  }
  return temp
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

const AddBookedTourForm = Form.create()(React.createClass({

  getInitialState() {
    return{
      showCusInput: false,
      uuid: 0,
      cusLen: 0,
      guide_name: [],
      selectedTourName: "",
      selectedBookingMethod: "Walk-in",
      selectedTourType: "",
      selectedTourTime: "",
      tours_name: [],
      bookingMethods: [],
      selectedGuideID:'',
      suggested_guide_name:'',
      selectedCountry:''

    }
  },

  getGuideList(){
    apiAccess({
      url: 'http://localhost:8000/staffs/tour-guides/name',
      method: 'GET',
      payload: null,
      attemptAction: () => this.props.dispatch({ type: 'GET_GUIDE_NAME_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'GET_GUIDE_NAME_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'GET_GUIDE_NAME_FAILED' })
    })
  },

  getAllTourName(){
    apiAccess({
      url: 'http://localhost:8000/tours/name',
      method: 'GET',
      payload: null,
      attemptAction: () => this.props.dispatch({ type: 'GET_ALL_TOURS_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'GET_ALL_TOURS_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'GET_ALL_TOURS_FAILED' })
    })
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

  addBookerAndTour(payload){
    apiAccess({
      url: 'http://localhost:8000/bookedtours/insert',
      method: 'POST',
      payload: payload,
      attemptAction: () => this.props.dispatch({ type: 'POST_BOOKER_AND_TOUR_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'POST_BOOKER_AND_TOUR_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'POST_BOOKER_AND_TOUR_FAILED' })
    })
  },

  componentWillReceiveProps(nextProps){
    if(this.props.eachGuideName !== nextProps.eachGuideName){
      if(nextProps.eachGuideName){
        this.setState({guide_name: nextProps.eachGuideName})
      }
    }

    if(this.props.all_tours_name !== nextProps.all_tours_name){
      if(nextProps.all_tours_name){
        this.setState({tours_name: nextProps.all_tours_name})
      }
    }

    if(this.props.bookingMethodLists !== nextProps.bookingMethodLists){
      if(nextProps.bookingMethodLists){
        this.setState({bookingMethods: nextProps.bookingMethodLists})
      }
    }

    if(this.props.suggested_guide_name !== nextProps.suggested_guide_name){
      if(nextProps.suggested_guide_name){
        this.setState({selectedGuide:nextProps.suggested_guide_name})
      }
    }
    if(this.props.suggested_guide_id !== nextProps.suggested_guide_id){
      if(nextProps.suggested_guide_id){
        this.setState({selectedGuideID:nextProps.suggested_guide_id})
      }
    }
  },

  componentWillMount(){
    this.getAllTourName()
    this.getGuideList()
    this.getBookingMethods()
  },


  handleSubmit(e){
      e.preventDefault();

      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {

          const count = this.props.form.getFieldValue('keys').length

          let formResult = []
          for(var i = 1; i <= count; i++){

            let pickupTime =  this.props.form.getFieldValue(`pickup_time_hour-${i}`)+':'+
                              this.props.form.getFieldValue(`pickup_time_min-${i}`)
            // if(this.props.form.getFieldValue(`pickup_time-${i}`) !== '' &&
            // typeof this.props.form.getFieldValue(`pickup_time-${i}`) !== 'undefined'){
            //     pickupTime = this.props.form.getFieldValue(`pickup_time-${i}`).format('HH:mm')
            // }

            var customer = {
                booking_method: this.handleBookingMethodSelect(this.props.form.getFieldValue(`bookingMethods-${i}`)),
                email: this.props.form.getFieldValue(`email-${i}`),
                phone: this.props.form.getFieldValue(`phone-${i}`) || '',
                name: this.props.form.getFieldValue(`name-${i}`),
                country: this.handleCountrySelect(this.props.form.getFieldValue(`country-${i}`)),
                pickup_time: pickupTime,
                pickup_place: this.props.form.getFieldValue(`pickup_place-${i}`),
                participants: this.props.form.getFieldValue(`participants-${i}`),
                remark: this.props.form.getFieldValue(`remark-${i}`) || '',
                price: this.props.form.getFieldValue(`price-${i}`)
              }

            formResult[i-1] = customer
          }

          let start_time = this.props.form.getFieldValue('tour_start_hour')+':'+
                           this.props.form.getFieldValue('tour_start_minute')

          let dateTour = changeDateFormat(this.props.dateTour)
          console.log(this.state.selectedGuideID)
          if(typeof this.state.selectedGuideID === "undefined" || this.state.selectedGuideID == ''  ){
            let payLoad =
              {
                customers: formResult,
                bookedTour:
                {
                  start_date : dateTour,
                  tour_name: this.state.selectedTourName,
                  tour_type: this.state.selectedTourType,
                  start_time: start_time,
                  tour_period: this.state.selectedTourPeriod
                },
              }
              this.addBookerAndTour(payLoad)
          }else {
            let payLoad =
              {
                customers: formResult,
                bookedTour:
                {
                  start_date : dateTour,
                  tour_name: this.state.selectedTourName,
                  tour_type: this.state.selectedTourType,
                  tour_guide: this.state.selectedGuideID,
                  start_time: start_time,
                  tour_period: this.state.selectedTourPeriod
                },
              }
              this.addBookerAndTour(payLoad)
          }
        }
      });
    },

  handleTourPeriodSelect(value,option){
    this.setState({ selectedTourPeriod: tour_period[value].value});
  },

  handleGuideSelect(value,option){
    this.setState({ selectedGuideID: this.state.guide_name[value]._id});
    // this.setState({ selectedGuideID: this.state.guide_name[value]._id})
  },

  handleCountrySelect(value,option){
    if(typeof countryList[value] !== 'undefined'
    && typeof countryList[value].name !== 'undefined'){
      return countryList[value].name
    }else
      return 'Afghanistan'
  },

  handleBookingMethodSelect(value){
    if(typeof this.state.bookingMethods[value] !== 'undefined'
    && typeof this.state.bookingMethods[value].name !== 'undefined'){
      return this.state.bookingMethods[value].name
    }else
      return 'Walk-in'
  },

  handleTourNameSelect(value,option){
    this.setState({selectedTourName: this.state.tours_name[value].name})
    // this.setState({selectedTourID: tournames[value]._id})
  },

  handleTourTypeSelect(value,option){
    this.setState({selectedTourType: tourtypes[value].value})
  },

  handleTourTime(time,timeString){
    this.setState({selectedTourTime: timeString})
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

 add(){
   let num = this.state.uuid
   num++
   this.setState({uuid:num})
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

  showCustomerInput(){
      var count = this.state.cusLen
      while(count>=0){

        return(
          <CustomerInput />
        )
        count = count - 1
      }
  },

  showSuggestModal(){
    let factors ={
      selectedTourName: this.state.selectedTourName,
      selectedTourPeriod: this.state.selectedTourPeriod,
      selectedStartDate: changeDateFormat(this.props.dateTour),
      page:'add'
    }
    this.props.dispatch(sendSuggestedGuideName("SHOW_SUGGESTED_GUIDE_MODAL",factors))
  },


  render(){
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };
    //customer input form
  const formItemLayoutWithOutLabel = {
     wrapperCol: { span: 13, offset: 11 },
   };
   getFieldDecorator('keys', { initialValue: [] });
   const keys = getFieldValue('keys');

   this.state.formItems = keys.map((k, index) => {
     return (

         <div className = "customer-info" key={k}>
           <Row>
             <Col span={11} >
                <h3>Book {k} </h3>
              </Col>
             <Col span={1} offset = {12}>
               <Icon style = {{ right: '4%' }}
                 className="dynamic-delete-button"
                 type="minus-circle-o"
                 disabled={keys.length === 1}
                 onClick={() => this.remove(k)}
               />
            </Col>
          </Row>

        <Row>
          <Col span={10} >

            <FormItem
              {...formItemLayout}
              label="Booking Methods"
              required={true}
            >
              {getFieldDecorator(`bookingMethods-${k}`, {
                initialValue: ['Walk-in'],

              })(
                <Select
                   showSearch
                   style={{ width: '80%', marginRight: 5 }}
                   placeholder="Select a booking method"
                   optionFilterProp="children"
                   onSelect={this.handleBookingMethodSelect}
                   filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                 >
                  {throwOptionBookingMethodObject(this.state.bookingMethods)}
                 </Select>
              )}
            </FormItem>

         <FormItem
           {...formItemLayout}
           label= {'E-mail : '}
         >
           {getFieldDecorator(`email-${k}`, {
             rules: [{
               required: true,
               type: 'email', message: 'The input is not a valid e-mail!'}]
           })(
             <Input placeholder="E-mail" style={{ width: '80%', marginRight: 5 }} />
           )}

         </FormItem>

         <FormItem
           {...formItemLayout}
           label={'Name : '}
         >
           {getFieldDecorator(`name-${k}`, {
             validateTrigger: ['onChange', 'onBlur'],
             rules: [{
               required: true,
               whitespace: true,
               message: "Please input customer's name.",
             }],
           })(
             <Input placeholder="Name"  style={{ width: '80%', marginRight: 5 }} />
           )}

         </FormItem>

         <FormItem
           {...formItemLayout}
           label={'Country : '}

         >
           {getFieldDecorator(`country-${k}`,  {
             initialValue:['Afghanistan'],
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
           {getFieldDecorator(`phone-${k}`, {
             validateTrigger: ['onChange', 'onBlur']
           },{ validator: this.checkTel})(
             <Input placeholder="Phone"  style={{ width: '80%', marginRight: 5 }} />
           )}

         </FormItem>


       </Col>
         <Col span={14}>

           <FormItem
             {...formItemLayout}
             label={'Price : '}
           >
             {getFieldDecorator(`price-${k}`, {
               rules: [{
                 required: true, message: 'Please input your price!',
               }]},{
               validateTrigger: ['onChange', 'onBlur']
             })(
               <InputNumber min={0} max={100000} placeholder="Price"  style={{ width: '30%', marginRight: 11 }} />
             )}

           </FormItem>

           <FormItem
             {...formItemLayout}
             label={'Pickup Place : '}
             required={false}
           >
             {getFieldDecorator(`pickup_place-${k}`, {
               validateTrigger: ['onChange', 'onBlur'],

             })(
               <Input placeholder="Choose a location"  style={{ width: '70%', marginRight: 11 }} />
             )}

           </FormItem>

         <FormItem
            {...formItemLayout}
            label={'Pickup Time'}
            required={false}
          >
            {getFieldDecorator(`pickup_time-${k}`)(
              <Row>
               <Col span="3">
                <FormItem>
                  {getFieldDecorator(`pickup_time_hour-${k}`,{
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
                  {getFieldDecorator(`pickup_time_min-${k}`)(
                  <Input placeholder="00"/>
                  )}
                </FormItem>
              </Col>
            </Row>
            )}
          </FormItem>

         <FormItem
            {...formItemLayout}
            label={'Participant : '}
          >

          {getFieldDecorator(`participants-${k}`, {
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
           {getFieldDecorator(`remark-${k}`, {
             validateTrigger: ['onChange', 'onBlur'],
           })(
             <Input type="textarea" rows={3} style={{ width: '70%' }} />
           )}

         </FormItem>
       </Col>
         </Row>
       </div>

     );

   });


   return (

     <div>

     <Form className = "add-tour-form" onSubmit={this.handleSubmit}>

       <Row>
      <Col span={11}>
       <FormItem
         {...formItemLayout}
         label="Tour Name"
       >
         {getFieldDecorator('tourname',{
           rules: [{
             required: true,
             message: "Please select a tour.",
           }],
         })(
           <Select
              showSearch
              style={{ width: '80%', marginRight: 11, marginLeft: 8 }}
              placeholder="Select a tour"
              optionFilterProp="children"
              onSelect = {this.handleTourNameSelect}
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
             {throwOptionTourNameObject(this.state.tours_name)}
            </Select>
         )}
       </FormItem>

       <FormItem
         {...formItemLayout}
         label="Tour Type"
       >
         {getFieldDecorator('tourtype',{
           rules: [{
             required: true,
             message: "Please select a tour type.",
           }],
         })(
           <Select
              showSearch
              style={{ width: '80%', marginRight: 11, marginLeft: 8  }}
              placeholder="Select a type of tour"
              optionFilterProp="children"
              onSelect={this.handleTourTypeSelect}
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
             {throwOptionTourTypeObject(tourtypes)}
            </Select>
         )}
       </FormItem>

       <FormItem
         {...formItemLayout}
         label="Tour Period"
       >
         {getFieldDecorator('tour_period',{
           rules: [{
             required: true,
             message: "Please select a tour period.",
           }],
         })(
           <Select
              showSearch
              style={{ width: '80%', marginRight: 11, marginLeft: 8 }}
              placeholder="Select a tour period"
              optionFilterProp="children"
              onSelect = {this.handleTourPeriodSelect}
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
             {throwOptionTourPeriodObject(tour_period)}
            </Select>
         )}
       </FormItem>

       </Col>

      <Col span={11} offset = {1}>


         <FormItem
           {...formItemLayout}
           label="Tour Guide"
           require={false}
         >
         <Row gutter={10}>
            <Col span={13}>
               {getFieldDecorator('tourGuide', {
                 initialValue: this.state.selectedGuide,
                 })(
                   <Select
                      showSearch
                      style={{marginRight: 11, marginLeft: 8 }}
                      placeholder="Select a person"
                      optionFilterProp="children"
                      onSelect={this.handleGuideSelect}
                      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                     {throwOptionGuideObject(this.state.guide_name)}
                    </Select>
                 )}
               </Col>
                <Col span={9}>
                  <Button style = {{backgroundColor: '#FFD310', color: 'white'}} onClick = {()=> this.showSuggestModal()} >
                    Suggest Tour Guide!</Button>
               </Col>
         </Row>

         </FormItem>

         <FormItem
           {...formItemLayout}
           label="Start Time"
           require={true}
         >
            <Row>
             <Col span="3">
              <FormItem>
                {getFieldDecorator('tour_start_hour',{
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
                {getFieldDecorator('tour_start_minute',{
                  rules: [
                { validator: this.checkCharIntMin}]})(
                <Input placeholder="00"/>
                )}
              </FormItem>
            </Col>
          </Row>

         </FormItem>

       </Col>
     </Row>

         {this.state.formItems}


        <FormItem {...formItemLayoutWithOutLabel}>
          <Button type="primary" htmlType="submit" size="large" style = {{marginTop: 20}}>Submit</Button>
        </FormItem>
        <Button type = "dash" className = "btn-add-tour-form" onClick={this.add}>
          +
        </Button>
     </Form>
   </div>

   );
 },
}));

function mapStateToProps(state) {

    return {
        bookingMethodLists: state.getBookingMethods.bookingMethodLists,
        all_tours_name: state.getToursName.all_tours_name,
        eachGuideName: state.getEachGuideName.eachGuideName,
        dateTour: state.addTourForm.dateTour,
        eachTour: state.getSpecificBookedTour.eachTour,
        guideIncomeSummary: state.getGuideIncomeSummary.guideIncomeSummary,
        suggested_guide_name: state.receiveSuggestedGuideName.suggested_guide_name,
        suggested_guide_id: state.receiveSuggestedGuideName.suggest_guide_id
    };
}

export default connect(mapStateToProps)(AddBookedTourForm);
