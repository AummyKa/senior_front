import React, { Component } from 'react';
import { Row,Col,Radio, Button, Calendar, Icon, Upload, message, Input } from 'antd';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'

import apiAccess from '../../Helpers/apiAccess'

import Cookies from 'js-cookie'

class StaffProfile extends Component {

  constructor(props){
    super(props)
    this.state = {
      name: "",
      staffID: Cookies.get('staff_id'),
      staff_image_url: "",
      id: "",
      title: "",
      name: "",
      surname: "",
      email: "",
      lineID: "-",
      address: "-",
      phone: "",
      workplace: "Bangkok",
      edit: false,
      staff_image_url:''
    }
  }

  componentDidMount(){

    this.setState({staff_image_url:"http://localhost:8000/staffs/image/"+Cookies.get('staff_id')})

    //set button color
    //check if the user is a tour guide
    // if(this.state.userID == 'Tour Guide'){
    //   let user_id = Cookies.get('userID')
    //   Cookies.set('guide_id',user_id)
    // }
      this.eachStaff(Cookies.get('staff_id'))
  }

  componentWillReceiveProps(nextProps){

    if(this.props.staffProfile !== nextProps.staffProfile){
      if(nextProps.staffProfile){
        this.setState({
          title:nextProps.staffProfile.title,
          name: nextProps.staffProfile.name,
          surname: nextProps.staffProfile.surname,
          // birthdate: this.cleanDate(nextProps.curGuideProfile.birthdate),
          email: nextProps.staffProfile.email,
          lineID: nextProps.staffProfile.lineID || "-",
          address: nextProps.staffProfile.address || "-",
          phone: nextProps.staffProfile.phone,
          workplace: nextProps.staffProfile.workplace || "-",
          contract: nextProps.staffProfile.contract
        })
      }
    }

    if(this.props.updateStaffStatus !== nextProps.updateStaffStatus){
      if(nextProps.updateStaffStatus){
        this.setState({edit:false})
        this.eachStaff(Cookies.get('userID'))
      }
    }

  }

  eachStaff(id){
      apiAccess({
       url: 'http://localhost:8000/staffs/'+id,
       method: 'GET',
       payload: null,
       attemptAction: () => this.props.dispatch({ type: 'GET_STAFF_PROFILE_ATTEMPT' }),
       successAction: (json) => this.props.dispatch({ type: 'GET_STAFF_PROFILE_SUCCESS', json }),
       failureAction: () => this.props.dispatch({ type: 'GET_STAFF_PROFILE_FAILED' })
     })
  }

  removePicturePath(id){
      apiAccess({
       url: 'http://localhost:8000/staffs/remove-image/'+id,
       method: 'GET',
       payload: null,
       attemptAction: () => this.props.dispatch({ type: 'REMOVE_PICTURE_PATH_ATTEMPT' }),
       successAction: (json) => this.props.dispatch({ type: 'REMOVE_PICTURE_PATH_SUCCESS', json }),
       failureAction: () => this.props.dispatch({ type: 'REMOVE_PICTURE_PATH_FAILED' })
     })
  }

  handlePictureChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      window.location.replace(this.props.location.pathname)
      //this.setState({staff_image_url:"http://localhost:8000/staffs/image/"+Cookies.get('guide_id')})

    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }

  handlePicturePreview = (file) => {
    this.setState({
      staff_image_url: file.url || file.thumbUrl
    });
  }

  staffShowEdit(val,topic){

      if (topic == "lineID"){
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

  staffEdit(){
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

  render() {

    const props = {
      action: '//localhost:8000/staffs/insert-image/'+Cookies.get('staff_id'),
      onChange: this.handlePictureChange.bind(this),
      multiple: true,
      onPreview: this.handlePicturePreview.bind(this)
    };

    return (

      <div>
        <div className= "staff-top-content">
          <Row type="flex" justify="center">
            <Col span={8}>
            <img src={this.state.staff_image_url} className="img-guide"/>
            </Col>
            <Col span={10} className = "guide-name">
              <h3>{this.state.name}</h3>
              <Upload {...props}>
                <Button icon="download">Upload picture</Button>
              </Upload>
            </Col>
          </Row>
        </div>


      <div className = "staff-wrapper">
        <div className = "staff-content" >
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

                 <li>{this.state.edit ? this.staffShowEdit(this.state.lineID,"lineID") :this.state.lineID}</li><br/>
                 <li>{this.state.edit ? this.staffShowEdit(this.state.phone,"phone") :this.state.phone}</li><br/>
                 <li>{this.state.workplace}</li><br/>
                 <li>{this.state.edit ? this.staffShowEdit(this.state.address,"address") :this.state.address}</li><br/>

               </ul>
             </Col>
          </Row>

          {Cookies.get('userID') == Cookies.get('staff_id') ?
            <div className = "guide-edit-button">
              {this.state.edit ?
              <Button className = "btn-save-guide-edit" onClick ={()=>this.saveEdit(Cookies.get('userID'))} >Save</Button>:
              <Button className = "btn-edit-guide-profile" onClick ={()=>this.staffEdit()} >Edit</Button>}
            </div>
            : null
          }

        </div>
      </div>

      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  staffProfile: state.getStaffProfile.staffProfile,
  removePictureStatus: state.uploadPicture.removePictureStatus,
  updateStaffStatus: state.updateStaff.updateStaffStatus
})

export default connect(mapStateToProps)(StaffProfile)
