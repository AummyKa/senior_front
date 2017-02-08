import React, { Component } from 'react';
import { Row,Col,Radio, Button } from 'antd';

import GuidePersonal from './GuidePersonal'

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
      btnColor4: "#DCD5D3"

    }
  }

  handleSizeChange = (e) => {
    console.log(e.target.value)
    let guide_page = e.target.value
    // this.changeGuidePage(guide_page)
    switch (guide_page) {
      case "personal":
        this.setState({guidePersonal:true,experience: false,revenue: false,timetable: false})
        if(this.state.btnColor1!="#C5C1C0"){
          this.setState({btnColor1 :"#C5C1C0",btnColor2 :"#DCD5D3",btnColor3 :"#DCD5D3",btnColor4 :"#DCD5D3"})
        }else
          this.setState({btnColor1 :"#DCD5D3",btnColor2 :"#C5C1C0",btnColor3 :"#C5C1C0",btnColor4 :"#C5C1C0"})

        break;
      case "experience":
        if(this.state.btnColor2!="#C5C1C0"){
          this.setState({btnColor2 :"#C5C1C0",btnColor1 :"#DCD5D3",btnColor3 :"#DCD5D3",btnColor4 :"#DCD5D3"})
        }else
          this.setState({btnColor2 :"#DCD5D3",btnColor1 :"#C5C1C0",btnColor3 :"#C5C1C0",btnColor4 :"#C5C1C0"})

        break;
      case "revenue":
        if(this.state.btnColor3!="#C5C1C0"){
          this.setState({btnColor3 :"#C5C1C0",btnColor1 :"#DCD5D3",btnColor2 :"#DCD5D3",btnColor4 :"#DCD5D3"})
        }else
          this.setState({btnColor3 :"#DCD5D3",btnColor1 :"#C5C1C0",btnColor2 :"#C5C1C0",btnColor4 :"#C5C1C0"})

        break;
      case "timetable":
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
              <h3> Ms. Lilly Dada </h3>
              <h4> Expert: Midnight tour </h4>
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
        </div>        

      </div>

    );
  }
}

export default GuideLayout
