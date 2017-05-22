import React, { Component } from 'react';
import { Row,Col,Radio, Button, Calendar, Icon, Upload, message } from 'antd';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'

import GuidePersonal from './GuidePersonal'
import GuideExperience from './GuideExperience'
import GuideHistory from './GuideHistory'
import GuideTimetable from './GuideTimetable'
import apiAccess from '../../Helpers/apiAccess'

import Cookies from 'js-cookie'

class GuideLayout extends Component {

  constructor(props){
    super(props)
    this.state = {
      guidePersonal: true,
      experience: false,
      history: false,
      timetable: false,
      btnColor1: "#C5C1C0",
      btnColor2: "#DCD5D3",
      btnColor3: "#DCD5D3",
      btnColor4: "#DCD5D3",
      name: "",
      user_role: Cookies.get('userRole'),
      staff_image_url: ""
    }
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }




  componentDidMount(){

    if(Cookies.get('guide_id')===Cookies.get('userID')){
      this.setState({staff_image_url:"http://localhost:8000/staffs/image/"+Cookies.get('userID')})
    }else{
      this.setState({staff_image_url:"http://localhost:8000/staffs/image/"+Cookies.get('guide_id')})
    }

    const { router } = this.context;
    let guide_id = Cookies.get('guide_id')

    //set button color

    if (router.isActive('/guide/'+guide_id)) {
        this.setState({btnColor3 :"#DCD5D3",btnColor1 :"#C5C1C0",btnColor2 :"#DCD5D3",btnColor4 :"#DCD5D3"})
    }

    if (router.isActive('/guide/'+guide_id+'/history')) {
        this.setState({btnColor3 :"#C5C1C0",btnColor1 :"#DCD5D3",btnColor2 :"#DCD5D3",btnColor4 :"#DCD5D3"})
    }

    if (router.isActive('/guide/'+guide_id+'/timetable')) {
        this.setState({btnColor3 :"#DCD5D3",btnColor1 :"#DCD5D3",btnColor2 :"#DCD5D3",btnColor4 :"#C5C1C0"})
    }

    if (router.isActive('/guide/'+guide_id+'/experience')) {
        this.setState({btnColor3 :"#DCD5D3",btnColor1 :"#DCD5D3",btnColor2 :"#C5C1C0",btnColor4 :"#DCD5D3"})
    }


    //check if the user is a tour guide
    if(this.state.user_role == 'Tour Guide'){
      let user_id = Cookies.get('userID')
      Cookies.set('guide_id',user_id)
    }
      this.eachGuide(Cookies.get('guide_id'))

  }

  componentWillReceiveProps(nextProps){

    if(this.props.eachGuideName !== nextProps.eachGuideName){
      if(nextProps.eachGuideName){
        this.setState({name: nextProps.eachGuideName.fullname})
      }
    }
    // if(this.props.removePictureStatus !== nextProps.removePictureStatus){
    //   if(nextProps.removePictureStatus){
    //       console.log("hi")
    //       this.setState({staff_image_url:"http://localhost:8000/staffs/image/"+Cookies.get('guide_id')})
    //   }
    // }
  }v

  eachGuide(id){
      apiAccess({
       url: 'http://localhost:8000/staffs/'+id+'/name',
       method: 'GET',
       payload: null,
       attemptAction: () => this.props.dispatch({ type: 'GET_GUIDE_NAME_ATTEMPT' }),
       successAction: (json) => this.props.dispatch({ type: 'GET_GUIDE_NAME_SUCCESS', json }),
       failureAction: () => this.props.dispatch({ type: 'GET_GUIDE_NAME_FAILED' })
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


  handleSizeChange = (e) => {

    let guide_page = e.target.value
    let id = Cookies.get('guide_id')
    // this.changeGuidePage(guide_page)
    switch (guide_page) {
      case "personal":
        this.context.router.push('/guide/'+id)

        if(this.state.btnColor1!="#C5C1C0"){
          this.setState({btnColor1 :"#C5C1C0",btnColor2 :"#DCD5D3",btnColor3 :"#DCD5D3",btnColor4 :"#DCD5D3"})
        }else
          this.setState({btnColor1 :"#DCD5D3",btnColor2 :"#C5C1C0",btnColor3 :"#C5C1C0",btnColor4 :"#C5C1C0"})

        break;
      case "experience":
        this.context.router.push('/guide/'+id+'/experience')

        if(this.state.btnColor2!="#C5C1C0"){
          this.setState({btnColor2 :"#C5C1C0",btnColor1 :"#DCD5D3",btnColor3 :"#DCD5D3",btnColor4 :"#DCD5D3"})
        }else
          this.setState({btnColor2 :"#DCD5D3",btnColor1 :"#C5C1C0",btnColor3 :"#C5C1C0",btnColor4 :"#C5C1C0"})

        break;
      case "history":
        this.context.router.push('/guide/'+id+'/history')

        if(this.state.btnColor3!="#C5C1C0"){
          this.setState({btnColor3 :"#C5C1C0",btnColor1 :"#DCD5D3",btnColor2 :"#DCD5D3",btnColor4 :"#DCD5D3"})
        }else
          this.setState({btnColor3 :"#DCD5D3",btnColor1 :"#C5C1C0",btnColor2 :"#C5C1C0",btnColor4 :"#C5C1C0"})

        break;
      case "timetable":
      this.context.router.replace('/guide/'+id+'/timetable')

      this.setState({guidePersonal:false,guideExperience: false,guideHistory: false,guideTimetable: true})
        if(this.state.btnColor4!="#C5C1C0"){
          this.setState({btnColor4 :"#C5C1C0",btnColor1 :"#DCD5D3",btnColor2 :"#DCD5D3",btnColor3 :"#DCD5D3"})
        }else
          this.setState({btnColor4 :"#DCD5D3",btnColor1 :"#C5C1C0",btnColor2 :"#C5C1C0",btnColor3 :"#C5C1C0"})
        break;

      default:

    }
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


  render() {
    console.log("guide layout")
    const props = {
      action: '//localhost:8000/staffs/insert-image/'+Cookies.get('guide_id'),
      onChange: this.handlePictureChange.bind(this),
      multiple: true
    };

    return (

      <div className="guide-profile-wrapper">
        <div className= "guide-top-content">
          <Row type="flex" justify="center">
            <Col xs={24} lg={8}>
            <img src={this.state.staff_image_url} className="img-guide"/>
            </Col>
            <Col xs={24} lg={10} className = "guide-name">
              <h3>{this.state.name}</h3>
              <Upload {...props}>
                <Button icon="download">Upload picture</Button>
              </Upload>
            </Col>
          </Row>
        </div>

        <div className = "button-set">
            <Radio.Group onChange={this.handleSizeChange}>
              <Radio.Button value = "personal" style = {{height:"40px", width: "130px", textAlign:"center",
                backgroundColor: this.state.btnColor1}}
              value={"personal"}>Personal Info</Radio.Button>

              <Radio.Button style = {{height:"40px", width: "130px", textAlign:"center",
                backgroundColor: this.state.btnColor3}}
              value="history">Assigned Tours</Radio.Button>
              <Radio.Button style = {{height:"40px", width: "130px", textAlign:"center",
                backgroundColor:this.state.btnColor4 }}
              value="timetable">Timetable</Radio.Button>

            { this.state.user_role !== "Tour Guide" ?
              <Radio.Button style = {{height:"40px", width: "130px", textAlign:"center",
                backgroundColor: this.state.btnColor2}}
              value="experience">Experience</Radio.Button> : null }


          </Radio.Group>
        </div>

        <div className = "guide-detail">
          {this.props.children}

        </div>

      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  eachGuideName: state.getEachGuideName.eachGuideName,
  removePictureStatus: state.uploadPicture.removePictureStatus
})

export default connect(mapStateToProps)(GuideLayout)
