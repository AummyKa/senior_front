import React, { Component } from 'react';
import { Row,Col } from 'antd';


import Box from '../Box'


class Tours extends Component {


  render() {
    return (

      <div>
        <div className = "topic">
          <h2>Tours</h2>
        </div>

        <div className = "tour-table">
            <div className="gutter-example">
              <Row gutter={16}>
                <Col className="gutter-row" span={8}>
                  <img src={'https://i.ytimg.com/vi/tntOCGkgt98/maxresdefault.jpg'} alt="boohoo" className="img-responsive"/>
                </Col>
                <Col className="gutter-row" span={8}>
                  <img src={'http://www.rd.com/wp-content/uploads/sites/2/2016/04/01-cat-wants-to-tell-you-laptop.jpg'} alt="boohoo" className="img-responsive"/>
                </Col>
                <Col className="gutter-row" span={8}>
                  <img src={'http://carltonvet.com.au/sites/default/files/styles/large/public/images/article/cats.jpg'} alt="boohoo" className="img-responsive"/>
                </Col>
              </Row>
            </div>
        </div>
        <Row>

   </Row>


      </div>

    );
  }
}

export default Tours
