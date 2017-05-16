import React, { Component } from 'react';
import { Row,Col,Radio, Button, Calendar } from 'antd';
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
      user_role: Cookies.get('userRole')
    }
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }


  componentDidMount(){
    this.eachGuide(Cookies.get('guide_id'))

  }

  componentWillReceiveProps(nextProps){

    if(this.props.eachGuideName !== nextProps.eachGuideName){
      if(nextProps.eachGuideName){
        console.log(nextProps.eachGuideName.fullname)
        this.setState({name: nextProps.eachGuideName.fullname})
      }
    }
  }

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


  render() {
    console.log("guide layout")

    return (

      <div>
        <div className= "guide-top-content">
          <Row type="flex" justify="center">
            <Col span={8}>
            <img src={"http://dreamatico.com/data_images/kitten/kitten-1.jpg"}
              alt="boohoo" className="img-guide"/>
            </Col>
            <Col span={10} className = "guide-name">
              <h3>{this.state.name}</h3>
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
              value="history">History</Radio.Button>
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
  eachGuideName: state.getEachGuideName.eachGuideName
})

export default connect(mapStateToProps)(GuideLayout)
