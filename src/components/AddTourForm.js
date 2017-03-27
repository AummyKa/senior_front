import React, { PropTypes, Component } from 'react';
import {connect} from 'react-redux';

import { InputNumber, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, TimePicker } from 'antd';
import moment from 'moment';

import apiAccess from '../Helpers/apiAccess'

import { error } from './Modal'


import CustomerInput from './CustomerInput'

const FormItem = Form.Item;
const Option = Select.Option;
const format = 'HH:mm';




const tournames = [{
  value: 'zhejiang',
}, {
  value: 'jiangsu',
}];

const agencies = [{
  value: 'N/A',
  label: 'N/A',
}, {
  value: 'Happy',
  label: 'Happy',
},{
  value: 'Hula hula',
  label: 'Hula hula',
}];

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


function getGuideName(gList,resultJSON){
  for(var i = 0; i < gList.length; i++) {
    var objectJSON = {
      name: gList[i].name
    }
    resultJSON[i] = objectJSON
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
  let temp = []
  for (let i = 0; i < data.length; i++) {
    temp.push(<Option key= {i}>{data[i].value}</Option>);
  }
  return temp
}

function throwOptionTourNameObject(data){
  let temp = []
  for (let i = 0; i < data.length; i++) {
    temp.push(<Option key= {i}>{data[i].value}</Option>);
  }
  return temp
}

let uuid = 0;

const AddTourForm = Form.create()(React.createClass({

  getInitialState() {
    this.getGuideList()
    return{
      showCusInput: false,
      cusLen: 0,
      guide_name: [],
      selectedTourName: "",
      selectedAgency: "",
      selectedTourType: "",
      selectedTourTime: ""
    }
  },

  handleSubmit(e){
      e.preventDefault();

      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);

          const count = this.props.form.getFieldValue('keys').length

          let formResult = []
          for(var i = 0; i < count; i++){
            i = i+1
            var customer = {
                agency: this.props.form.getFieldValue(`agency-${i}`)[0],
                email: this.props.form.getFieldValue(`email-${i}`),
                name: this.props.form.getFieldValue(`name-${i}`)[0],
                country: this.props.form.getFieldValue(`country-${i}`)[0],
                pickup_time: this.props.form.getFieldValue(`pickup_time-${i}`),
                pickup_place: this.props.form.getFieldValue(`pickup_place-${i}`)[0],
                participants: this.props.form.getFieldValue(`participants-${i}`),
                remark: this.props.form.getFieldValue(`remark-${i}`)[0]
              }

            formResult[i] = customer
          }

          console.log(formResult)

          let payLoad = {
            start_date : this.props.dateTour,
            tour_name: this.state.selectedTourName,
            tour_type: this.state.selectedTourType,
            tour_guide: this.state.selectedGuideName,
            start_time: this.state.selectedTourTime,
            customer: formResult
          }
          console.log(payLoad)
          this.addBookerAndTour(payLoad)
        }
      });
    },

  handleGuideSelect(value,option){
    this.setState({ selectedGuideName: this.state.guide_name[value].name});
  },

  handleAgencySelect(value,option){
    this.setState({ selectedAgency: agencies[value].value });
  },

  handleTourNameSelect(value,option){
    this.setState({selectedTourName: tournames[value].value})
  },

  handleTourTypeSelect(value,option){
    this.setState({selectedTourType: tourtypes[value].value})
  },

  handleTourTime(time,timeString){
    console.log(timeString)
    this.setState({selectedTourTime: timeString})
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

        return(
          <CustomerInput />
        )
        count = count - 1
      }
  },


  render(){
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };
    //customer input form
  const formItemLayoutWithOutLabel = {
     wrapperCol: { span: 20, offset: 4 },
   };
   getFieldDecorator('keys', { initialValue: [] });
   const keys = getFieldValue('keys');

   const formItems = keys.map((k, index) => {

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
          <Col span={11} offset={1}>

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
                  {throwOptionAgencyObject(agencies)}
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


       </Col>
         <Col span={11} offset = {1}>

         <FormItem
           {...formItemLayout}
           label={'Pickup Place : '}
           required={false}
           labelCol={{
            sm: { span: 5 },
          }}
         >
           {getFieldDecorator(`pickup_place-${k}`, {
             initialValue: ['N/A'],
             validateTrigger: ['onChange', 'onBlur']
           })(
             <Input placeholder="pick up place"  style={{ width: '100%'}}/>
           )}
         </FormItem>


         <FormItem
            {...formItemLayout}
            label="Pickup time"
          >
            {getFieldDecorator(`pickup_time-${k}`)(
              <TimePicker
                style={{ width: '30%', marginRight: 11, marginLeft: 11}}
                format={format} placeholder = "pickup" />
            )}
          </FormItem>

         <FormItem
            {...formItemLayout}
            label={'Participant : '}
          >

          {getFieldDecorator(`participants-${k}`)(
            <InputNumber
              style={{ width: '30%', marginRight: 11, marginLeft: 11}}
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
             <Input type="textarea" rows={2} />
           )}

         </FormItem>
       </Col>
         </Row>
       </div>

     );

   });


   return (
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
              onChange = {this.handleTourNameChange}
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
             {throwOptionTourNameObject(tournames)}
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
              style={{ width: '80%', marginRight: 11 }}
              placeholder="Select a type of tour"
              optionFilterProp="children"
              onSelect={this.handleTourTypeSelect}
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
             {throwOptionAgencyObject(tourtypes)}
            </Select>
         )}
       </FormItem>

       </Col>

      <Col span={11} offset = {1}>


         <FormItem
           {...formItemLayout}
           label="Tour Guide"
         >
           {getFieldDecorator('tourGuide', {

           })(
             <Select
                showSearch
                style={{ width: '80%', marginRight: 11, marginLeft: 8 }}
                placeholder="Select a person"
                optionFilterProp="children"
                onSelect={this.handleGuideSelect}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
               {throwOptionGuideObject(this.state.guide_name)}
              </Select>
           )}
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

         {formItems}
         <FormItem {...formItemLayoutWithOutLabel}>
          <Button type = "dash" className = "btn-add-tour-form" onClick={this.add}>
            +
          </Button>
        </FormItem>
        <FormItem {...formItemLayoutWithOutLabel}>
          <Button type="primary" htmlType="submit" size="large">Submit</Button>
        </FormItem>

     </Form>
   );
 },
}));

function mapStateToProps(state) {

    return {
        guideLists: state.guideDetail.guideLists,
        dateTour: state.addTourForm.dateTour
    };
}

export default connect(mapStateToProps)(AddTourForm);
