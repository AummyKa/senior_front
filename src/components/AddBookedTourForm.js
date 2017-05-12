import React, { Component } from 'react';
import {connect} from 'react-redux';

import { InputNumber, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, TimePicker} from 'antd';
import moment from 'moment';

import apiAccess from '../Helpers/apiAccess'
import changeDateFormat from '../Helpers/changeDateFormat'
import { addTour } from '../actions/action-addTour'
import GuideSuggestionModal from './GuideSuggestionModal'

// import { getAllTour } from '../actions/GET/action-getAllTour'

import { error } from './Modal'
import Geosuggest from 'react-geosuggest';
import { Modal } from 'react-bootstrap';

import CustomerInput from './CustomerInput'

const FormItem = Form.Item;
const Option = Select.Option;
const format = 'HH:mm';




const tourtypes = [{
  value: 'Public',
  label: 'Public',
}, {
  value: 'Private',
  label: 'Private',
}]

const tour_period = [{
  value: 'Full-day',
  label: 'Full-day',
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
  console.log(data)
  let temp = []
  if(data){
    for (let i = 0; i < data.length; i++) {
      temp.push(<Option key= {i}><div>{data[i].fullname}</div></Option>);
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
      showSuggest: false,
      tours_name: [],
      bookingMethods: []
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
      console.log(nextProps.eachGuideName)
      if(nextProps.eachGuideName){
        this.setState({guide_name: nextProps.eachGuideName})
      }
    }

    if(this.props.all_tours_name !== nextProps.all_tours_name){
      if(nextProps.all_tours_name){
        this.setState({tours_name: nextProps.all_tours_name})
        console.log(nextProps.all_tours_name)
      }
    }

    if(nextProps.isStoppedCountingAddTour){
      this.setState({bookingNumber: 0})
    }

    if(this.props.bookingMethodLists !== nextProps.bookingMethodLists){
      if(nextProps.bookingMethodLists){
        this.setState({bookingMethods: nextProps.bookingMethodLists})
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
          console.log('Received values of form: ', values);

          const count = this.props.form.getFieldValue('keys').length

          let formResult = []
          for(var i = 1; i <= count; i++){
            console.log(this.state.selectedbookingMethod)
            var customer = {
                booking_method: this.state.selectedbookingMethod,
                email: this.props.form.getFieldValue(`email-${i}`),
                phone: this.props.form.getFieldValue(`phone-${i}`),
                name: this.props.form.getFieldValue(`name-${i}`),
                country: this.props.form.getFieldValue(`country-${i}`),
                pickup_time: this.props.form.getFieldValue(`pickup_time-${i}`).format('HH:mm'),
                pickup_place: this.props.form.getFieldValue(`pickup_place-${i}`),
                participants: this.props.form.getFieldValue(`participants-${i}`),
                remark: this.props.form.getFieldValue(`remark-${i}`),
                price: this.props.form.getFieldValue(`price-${i}`)
              }

            formResult[i-1] = customer
          }
          console.log(formResult)

          let dateTour = changeDateFormat(this.props.dateTour)

          let payLoad =
            {
              customers: formResult,
              bookedTour:
              {
                start_date : dateTour,
                tour_name: this.state.selectedTourName,
                tour_type: this.state.selectedTourType,
                tour_guide: this.state.selectedGuideName,
                start_time: this.state.selectedTourTime,
                tour_period: this.state.selectedTourPeriod
              },
            }

          console.log(payLoad)
          this.addBookerAndTour(payLoad)
        }
      });
    },

  handleTourPeriodSelect(value,option){
    console.log(value)
    this.setState({ selectedTourPeriod: tour_period[value].value});
  },

  handleGuideSelect(value,option){
    this.setState({ selectedGuideName: this.state.guide_name[value]._id});
    // this.setState({ selectedGuideID: this.state.guide_name[value]._id})
  },

  handleBookingMethodSelect(value,option){
    this.setState({ selectedBookingMethod: this.state.bookingMethods[value].name });
  },

  handleTourNameSelect(value,option){
    this.setState({selectedTourName: this.state.tours_name[value].name})
    // this.setState({selectedTourID: tournames[value]._id})
  },

  handleTourTypeSelect(value,option){
    this.setState({selectedTourType: tourtypes[value].value})
  },

  handleTourTime(time,timeString){
    console.log(timeString)
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
    this.setState({showSuggest: true})
  },

  submitSuggest(){
    console.log("hello suggestion")
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
           label= {'Email : '}
           required={false}
         >
           {getFieldDecorator(`email-${k}`, {
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
           required={false}
         >
           {getFieldDecorator(`name-${k}`, {
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
           {getFieldDecorator(`country-${k}`, {
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
           {getFieldDecorator(`phone-${k}`, {
             validateTrigger: ['onChange', 'onBlur']
           },{ validator: this.checkTel})(
             <Input placeholder="phone"  style={{ width: '80%', marginRight: 5 }} />
           )}

         </FormItem>


       </Col>
         <Col span={14}>

           <FormItem
             {...formItemLayout}
             label={'Price : '}
             required={false}
           >
             {getFieldDecorator(`price-${k}`, {
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
             {getFieldDecorator(`pickup_place-${k}`, {
               validateTrigger: ['onChange', 'onBlur'],

             })(
               <Input placeholder="choose a location"  style={{ width: '70%', marginRight: 11 }} />
             )}

           </FormItem>


         <FormItem
            {...formItemLayout}
            label="Pickup time"
          >
            {getFieldDecorator(`pickup_time-${k}`)(
              <TimePicker
                style={{ width: '30%', marginRight: 11}}
                format={format} placeholder = "pickup" />
            )}
          </FormItem>

         <FormItem
            {...formItemLayout}
            label={'Participant : '}
          >

          {getFieldDecorator(`participants-${k}`)(
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

   let closeSuggest = () => {
     this.setState({showSuggest: false})
   }


   return (

     <div>
       <Modal
         show={this.state.showSuggest}
         onHide={closeSuggest}
         container={this}
         aria-labelledby="contained-modal-title"
       >
         <Modal.Body>
           <GuideSuggestionModal dispatch = {this.props.dispatch}
             selectedTourName = {this.state.selectedTourName}
             selectedTourPeriod = {this.state.selectedTourPeriod}
             selectedStartDate = {changeDateFormat(this.props.dateTour)}
             />
         </Modal.Body>

       </Modal>

     <Form className = "add-tour-form" horizontal onSubmit={this.handleSubmit}>

       <Row>
      <Col span={11}>
       <FormItem
         {...formItemLayout}
         label="Tour name"
       >
         {getFieldDecorator('tourname')(
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
         {getFieldDecorator('tourtype')(
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
         label="Tour period"
       >
         {getFieldDecorator('tour_period')(
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
         >
         <Row gutter={10}>
            <Col span={13}>
               {getFieldDecorator('tourGuide', {
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
                    Suggest guide!</Button>
               </Col>
         </Row>

         </FormItem>

         <FormItem
           {...formItemLayout}
           label="Tour Time"
         >
           {getFieldDecorator('tourtime', {

           })(
             <TimePicker
               style={{ width: '80%', marginRight: 11, marginLeft: 8}}
               format={format} placeholder = "tourtime"
               onChange={this.handleTourTime} />
           )}
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
        isStoppedCountingAddTour: state.addTourForm.isStoppedCountingAddTour
    };
}

export default connect(mapStateToProps)(AddBookedTourForm);
