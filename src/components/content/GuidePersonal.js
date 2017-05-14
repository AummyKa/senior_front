import React, { Component } from 'react';
import { Row,Col,Radio,Button,Input, DatePicker,Form } from 'antd';
import {connect} from 'react-redux';

import Cookies from 'js-cookie'

import moment from 'moment';
import 'moment/locale/zh-cn';


import apiAccess from '../../Helpers/apiAccess'

const { MonthPicker, RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
moment.locale('zh-cn');

class GuidePersonal extends Component {

  constructor(props){
    super(props)

    this.state = {
      id: "",
      title: "",
      name: "",
      surname: "",
      // birthdate: "-",
      email: "",
      lineID: "-",
      address: "-",
      phone: "",
      workplace: "Bangkok",
      edit: false
    }

  }

  componentDidMount(){
      this.eachGuide(Cookies.get('guide_id'))
  }

  eachGuide(id){
    console.log(id)
      apiAccess({
       url: 'http://localhost:8000/staffs/'+id,
       method: 'GET',
       payload: null,
       attemptAction: () => this.props.dispatch({ type: 'GET_GUIDE_PROFILE_ATTEMPT' }),
       successAction: (json) => this.props.dispatch({ type: 'GET_GUIDE_PROFILE_SUCCESS', json }),
       failureAction: () => this.props.dispatch({ type: 'GET_GUIDE_PROFILE_FAILED' })
     })
  }

  componentWillReceiveProps(nextProps){

    if(this.props.updateStaffStatus !== nextProps.updateStaffStatus){
      if(nextProps.updateStaffStatus){
        this.setState({edit: false})
        this.eachGuide(Cookies.get('guide_id'))
      }
    }

    console.log(this.props.curGuideProfile)
    console.log(nextProps.curGuideProfile)

    if(this.props.curGuideProfile !== nextProps.curGuideProfile){
      if(nextProps.curGuideProfile){
        this.setState({
          title:nextProps.curGuideProfile.title,
          name: nextProps.curGuideProfile.name,
          surname: nextProps.curGuideProfile.surname,
          // birthdate: this.cleanDate(nextProps.curGuideProfile.birthdate),
          email: nextProps.curGuideProfile.email,
          lineID: nextProps.curGuideProfile.lineID || "-",
          address: nextProps.curGuideProfile.address || "-",
          phone: nextProps.curGuideProfile.phone,
          workplace: nextProps.curGuideProfile.workplace || "-",
          contract: nextProps.curGuideProfile.contract
        })
      }
    }
  }

  guideEdit(){
    this.setState({edit:true})
  }

  saveEdit(id){
    console.log(id)
    let payload = {
                      title: this.state.title,
                      name: this.state.name,
                      surname: this.state.surname,
                      // birthdate: this.state.birthdate,
                      email: this.state.email,
                      lineID: this.state.lineID,
                      address: this.state.address,
                      phone: this.state.phone,
                      workplace: this.state.workplace,
                      contract: this.state.contract}

                      console.log(payload)

    apiAccess({
      url: 'http://localhost:8000/staffs/update-info/'+id,
      method: 'POST',
      payload: payload,
      attemptAction: () => this.props.dispatch({ type: 'UPDATE_STAFF_ATTEMPT' }),
      successAction: (json) => this.props.dispatch({ type: 'UPDATE_STAFF_SUCCESS', json }),
      failureAction: () => this.props.dispatch({ type: 'UPDATE_STAFF_FAILED' })
    })

  }

  cleanDate(date){
    let res = date.substring(0,10);
    return res
  }
  checkLength(rule, value, callback){
    if(value.length > 20 ) {
     callback('number of characters should not exceed 20 characters');
    }else {
     callback()
    }
  }

  handleChange(e){

    if(e.target.value !== null){
      if(e.target.id == "lineID"){
        this.setState({
            lineID: e.target.value
        });
      }else if(e.target.id == "address"){
        this.setState({
            address: e.target.value
        });
      }else if(e.target.id == "phone"){
        this.setState({
            phone: e.target.value
        });
      }
    }

  }

  dateInput(date,dateString){
    this.setState({
        birthdate: dateString
    });
  }

  guideShowEdit(val,topic){

      if (topic == "birthdate" ) {
        return(
          <div className="normal-input">
             <DatePicker className="birthdate" defaultValue ={moment(val, dateFormat)} format={dateFormat}
             onChange={this.dateInput.bind(this)} />
          </div>
        )

      }else if (topic == "lineID"){
        return(
            <Input id = {topic} defaultValue = {val} onChange={this.handleChange.bind(this)} />
          )

      }else if(topic == "address"){
        return(
          <div className="big-input">
            <Input id = {topic} className="address" type="textarea" rows={3} defaultValue = {val}
              onChange={this.handleChange.bind(this)} />
          </div>
        )

      }else if(topic == "phone"){
        return(
          <div className="phone-input">
            <Input id = {topic} value = {val} onChange={this.handleChange.bind(this)} />
          </div>
        )

      }
  }


  render() {
    return (

      <div className = "guide-content" >

        <Row>
           <Col span={4}>
             <ul>
              <li>Title</li><br/>
              <li>Name</li><br/>
              <li>Surname</li><br/>
              <li>Email</li><br/>
            </ul>

           </Col>
           <Col span={8}>
             <ul>
               <li>{this.state.title}</li><br/>
               <li>{this.state.name}</li><br/>
               <li>{this.state.surname}</li><br/>
               <li>{this.state.email}</li><br/>
            </ul>
           </Col>
           <Col span={4}>
             <ul>
              <li>LineID</li><br/>
              <li>Phone</li><br/>
              <li>Workplace</li><br/>
              <li>Address</li><br/>
            </ul>
           </Col>
           <Col span={8}>
             <ul>

               <li>{this.state.edit ? this.guideShowEdit(this.state.lineID,"lineID") :this.state.lineID}</li><br/>
               <li>{this.state.edit ? this.guideShowEdit(this.state.phone,"phone") :this.state.phone}</li><br/>
               <li>{this.state.workplace}</li><br/>
               <li>{this.state.edit ? this.guideShowEdit(this.state.address,"address") :this.state.address}</li><br/>

             </ul>
           </Col>
        </Row>
        <div className = "guide-edit-button">
          {this.state.edit ?
          <Button className = "btn-save-guide-edit" onClick ={()=>this.saveEdit(Cookies.get('guide_id'))} >Save</Button>:
          <Button className = "btn-edit-guide-profile" onClick ={()=>this.guideEdit()} >Edit</Button>}
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {

    return {
        guide_id: state.guideProfile.guide_id,
        curGuideProfile: state.guideProfile.curGuideProfile,
        updateStaffStatus: state.updateStaff.updateStaffStatus
      }
}


export default connect(mapStateToProps)(GuidePersonal)
