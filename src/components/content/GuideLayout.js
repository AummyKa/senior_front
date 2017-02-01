import React, { Component } from 'react';
import { Row,Col,Radio } from 'antd';


class GuideLayout extends Component {

  handleSizeChange = (e) => {

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
              <Radio.Button style = {{height:"40px", width: "130px", textAlign:"center", backgroundColor:"#C5C1C0"}}
              value="personal">Personal Info</Radio.Button>
              <Radio.Button style = {{height:"40px", width: "130px", textAlign:"center", backgroundColor:"#C5C1C0"}}
              value="experience">Experience</Radio.Button>
              <Radio.Button style = {{height:"40px", width: "130px", textAlign:"center", backgroundColor:"#C5C1C0"}}
              value="revenue">Revenue</Radio.Button>
              <Radio.Button style = {{height:"40px", width: "130px", textAlign:"center", backgroundColor:"#C5C1C0"}}
              value="timetable">Timetable</Radio.Button>
          </Radio.Group>
        </div>

        <div className = "guide-detail">
          <h1>hey</h1>
        </div>

      </div>

    );
  }
}

export default GuideLayout
