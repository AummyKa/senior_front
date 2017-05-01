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
  for (let i = 0; i < data.length; i++) {
    temp.push(<Option key= {i}>{data[i].name}</Option>);
  }
  return temp
}

function throwOptionAgencyObject(data){
  console.log(data)
  let temp = []
  for (let i = 0; i < data.length; i++) {
    temp.push(<Option key= {i}>{data[i].agency_name}</Option>);
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

function throwOptionTourNameObject(data){
  if(data){
    let temp = []
    for (let i = 0; i < data.length; i++) {
      temp.push(<Option key= {i}>{data[i].name}</Option>);
    }
    return temp
  }
}

let uuid = 0;

const AddTourForm = Form.create()(React.createClass({

  getInitialState() {
    return{
      showCusInput: false,
      cusLen: 0,
      guide_name: [],
      selectedTourName: "",
      selectedAgency: "",
      selectedTourType: "",
      selectedTourTime: "",
      bookingNumber:0,
      showSuggest: false,
      tours_name: [],
      agencyData: []
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

  getAgencyList(){
    apiAccess({
      url: 'http://localhost:8000/agencies',
      method: 'GET',
      payload: null,
      attemptAction: () => this.props.dispatch({ type: 'GET_AGENCY_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'GET_AGENCY_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'GET_AGENCY_FAILED' })
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
    if(this.props.guideLists !== nextProps.guideLists){
      // getGuideName(nextProps.guideLists,this.state.guide_name)
      if(nextProps.guideLists){
        this.setState({guide_name: nextProps.guideLists})
      }
    }

    if(this.props.tours_data !== nextProps.tours_data){
      this.setState({tours_name: nextProps.tours_data})
      console.log(nextProps.tours_data)
    }

    if(nextProps.isStoppedCountingAddTour){
      this.setState({bookingNumber: 0})
    }

    if(this.props.agencyData !== nextProps.agencyData){
      if(nextProps.agencyData){
        console.log(nextProps.agencyData)
        this.setState({agencyData: nextProps.agencyData})
      }
    }
  },

  componentWillMount(){
    this.getAllTourName()
    this.getGuideList()
    this.getAgencyList()
  },

  handleSubmit(e){
      e.preventDefault();

      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);

          const count = this.props.form.getFieldValue('keys').length

          let formResult = []
          for(var i = 1; i <= count; i++){
            console.log(this.props.form.getFieldValue(`pickup_time-${i}`))
            var customer = {
                agency: this.state.selectedAgency,
                email: this.props.form.getFieldValue(`email-${i}`),
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
                start_time: this.state.selectedTourTime
              },
            }

          console.log(payLoad)
          this.addBookerAndTour(payLoad)
        }
      });
    },



  handleGuideSelect(value,option){
    this.setState({ selectedGuideName: this.state.guide_name[value].name});
    // this.setState({ selectedGuideID: this.state.guide_name[value]._id})
  },

  handleAgencySelect(value,option){
    this.setState({ selectedAgency: this.state.agencyData[value].agency_name });
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
     keys: keys.filter(key => key !== k),
   });
 },

 add(){
   uuid++;
   const { form } = this.props;
   // can use data-binding to get
   const keys = form.getFieldValue('keys');
   const nextKeys = keys.concat(uuid);
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
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };
    //customer input form
  const formItemLayoutWithOutLabel = {
     wrapperCol: { span: 13, offset: 11 },
   };
   getFieldDecorator('keys', { initialValue: [] });
   const keys = getFieldValue('keys');

   let k = this.state.bookingNumber //still can't not fix
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
          <Col span={8} offset={1}>

            <FormItem
              {...formItemLayout}
              label="Agency"
            >
              {getFieldDecorator(`agency-${k}`, {
                initialValue: ['N/A'],

              })(
                <Select
                   showSearch
                   style={{ width: '80%', marginRight: 11 }}
                   placeholder="Select a person"
                   optionFilterProp="children"
                   onSelect={this.handleAgencySelect}
                   filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                 >
                  {throwOptionAgencyObject(this.state.agencyData)}
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
             <Input placeholder="email" style={{ width: '80%', marginRight: 11 }} />
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
             <Input placeholder="name"  style={{ width: '80%', marginRight: 11 }} />
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
             <Input placeholder="country"  style={{ width: '80%', marginRight: 11 }} />
           )}

         </FormItem>

         <FormItem
           {...formItemLayout}
           label={'Price : '}
           required={false}
         >
           {getFieldDecorator(`price-${k}`, {
             validateTrigger: ['onChange', 'onBlur'],

           })(
             <Input placeholder="price"  style={{ width: '80%', marginRight: 11 }} />
           )}

         </FormItem>


       </Col>
         <Col span={14} offset = {1}>

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
           <GuideSuggestionModal dispatch = {this.props.dispatch} selectedTourName = {this.state.selectedTourName} />
         </Modal.Body>

       </Modal>

     <Form className = "add-tour-form" horizontal onSubmit={this.handleSubmit}>

       <Row>
      <Col span={11} offset = {1}>
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
        agencyData: state.getAgency.agencyData,
        tours_data: state.getTours.tours_data,
        guideLists: state.guideDetail.guideLists,
        dateTour: state.addTourForm.dateTour,
        eachTour: state.getSpecificTour.eachTour,
        isStoppedCountingAddTour: state.addTourForm.isStoppedCountingAddTour
    };
}

export default connect(mapStateToProps)(AddTourForm);
