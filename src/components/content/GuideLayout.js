import React, { Component } from 'react';
import { Row,Col,Radio, Button, Calendar } from 'antd';
import {connect} from 'react-redux';

import GuidePersonal from './GuidePersonal'
import GuideExperience from './GuideExperience'
import GuideRevenue from './GuideRevenue'
import GuideTimetable from './GuideTimetable'
import apiAccess from '../../Helpers/apiAccess'

import Cookies from 'js-cookie'

class GuideLayout extends Component {

  constructor(props){
    super(props)
    this.state = {
      guidePersonal: true,
      experience: false,
      revenue: false,
      timetable: false,
      btnColor1: "#C5C1C0",
      btnColor2: "#DCD5D3",
      btnColor3: "#DCD5D3",
      btnColor4: "#DCD5D3",
      title: "",
      name: "",
      surname: "",
      workplace: ""

    }
  }

  componentDidMount(){
    this.eachGuide(Cookies.get('guide_id'))

  }

  componentWillReceiveProps(nextProps){
    let guideProfile = nextProps.curGuideProfile

    try{
      this.setState({
        title: guideProfile.title || null,
        name: guideProfile.name || null,
        surname: guideProfile.surname || null,
        workplace: guideProfile.workplace || null,
      })
    }catch(e){

    }
  }

  eachGuide(id){
      apiAccess({
       url: 'http://localhost:8000/staffs/id/'+id,
       method: 'GET',
       payload: null,
       attemptAction: () => this.props.dispatch({ type: 'GET_GUIDE_PROFILE_ATTEMPT' }),
       successAction: (json) => this.props.dispatch({ type: 'GET_GUIDE_PROFILE_SUCCESS', json }),
       failureAction: () => this.props.dispatch({ type: 'GET_GUIDE_PROFILE_FAILED' })
     })
  }

  handleSizeChange = (e) => {

    let guide_page = e.target.value
    // this.changeGuidePage(guide_page)
    switch (guide_page) {
      case "personal":
        this.setState({guidePersonal:true,guideExperience: false,guideRevenue: false,guideTimetable: false})
        if(this.state.btnColor1!="#C5C1C0"){
          this.setState({btnColor1 :"#C5C1C0",btnColor2 :"#DCD5D3",btnColor3 :"#DCD5D3",btnColor4 :"#DCD5D3"})
        }else
          this.setState({btnColor1 :"#DCD5D3",btnColor2 :"#C5C1C0",btnColor3 :"#C5C1C0",btnColor4 :"#C5C1C0"})

        break;
      case "experience":
        this.setState({guidePersonal:false,guideExperience: true,guideRevenue: false,guideTimetable: false})
        if(this.state.btnColor2!="#C5C1C0"){
          this.setState({btnColor2 :"#C5C1C0",btnColor1 :"#DCD5D3",btnColor3 :"#DCD5D3",btnColor4 :"#DCD5D3"})
        }else
          this.setState({btnColor2 :"#DCD5D3",btnColor1 :"#C5C1C0",btnColor3 :"#C5C1C0",btnColor4 :"#C5C1C0"})

        break;
      case "revenue":
      this.setState({guidePersonal:false,guideExperience: false,guideRevenue: true,guideTimetable: false})
        if(this.state.btnColor3!="#C5C1C0"){
          this.setState({btnColor3 :"#C5C1C0",btnColor1 :"#DCD5D3",btnColor2 :"#DCD5D3",btnColor4 :"#DCD5D3"})
        }else
          this.setState({btnColor3 :"#DCD5D3",btnColor1 :"#C5C1C0",btnColor2 :"#C5C1C0",btnColor4 :"#C5C1C0"})

        break;
      case "timetable":
      this.setState({guidePersonal:false,guideExperience: false,guideRevenue: false,guideTimetable: true})
        if(this.state.btnColor4!="#C5C1C0"){
          this.setState({btnColor4 :"#C5C1C0",btnColor1 :"#DCD5D3",btnColor2 :"#DCD5D3",btnColor3 :"#DCD5D3"})
        }else
          this.setState({btnColor4 :"#DCD5D3",btnColor1 :"#C5C1C0",btnColor2 :"#C5C1C0",btnColor3 :"#C5C1C0"})
        break;

      default:

    }
  }


  render() {


    return (

      <div>
        <div className= "guide-top-content">
          <Row type="flex" justify="center">
            <Col span={8}>
            <img src={"http://dreamatico.com/data_images/kitten/kitten-1.jpg"}
              alt="boohoo" className="img-guide"/>
            </Col>
            <Col span={10} className = "guide-name">
              <h3>{this.state.title + " " + this.state.name + " " +this.state.surname} </h3>
              <h4> Workplace: {this.state.workplace}</h4>
            </Col>
          </Row>
        </div>

        <div className = "button-set">
            <Radio.Group onChange={this.handleSizeChange}>
              <Radio.Button value = "personal" style = {{height:"40px", width: "130px", textAlign:"center",
                backgroundColor: this.state.btnColor1}}
              value={"personal"}>Personal Info</Radio.Button>
              <Radio.Button style = {{height:"40px", width: "130px", textAlign:"center",
                backgroundColor: this.state.btnColor2}}
              value="experience">Experience</Radio.Button>
              <Radio.Button style = {{height:"40px", width: "130px", textAlign:"center",
                backgroundColor: this.state.btnColor3}}
              value="revenue">Revenue</Radio.Button>
              <Radio.Button style = {{height:"40px", width: "130px", textAlign:"center",
                backgroundColor:this.state.btnColor4 }}
              value="timetable">Timetable</Radio.Button>
          </Radio.Group>
        </div>

        <div className = "guide-detail">
          { this.state.guidePersonal ? <GuidePersonal /> : null }
          { this.state.guideExperience ? <GuideExperience curGuideProfile = {this.props.curGuideProfile} /> : null }
          { this.state.guideRevenue ? <GuideRevenue /> : null }
          { this.state.guideTimetable ? <GuideTimetable /> : null }
        </div>

      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  curGuideProfile: state.guideProfile.curGuideProfile
})

export default connect(mapStateToProps)(GuideLayout)
