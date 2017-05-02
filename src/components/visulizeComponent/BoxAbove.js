import React, { Component } from 'react';

import { Col, Row, Table } from 'antd'



class BoxAbove extends Component {

  constructor(props){
    super(props)
  }


  render() {

    return (

      <div>
         <Row style = {{marginRight: -90}}>
           <Col className="gutter-row" span={6} >
             <div className="total-customer" >
               <h4>Total customers</h4>
               <div className="text-box">200</div>
             </div>
           </Col>
           <Col className="gutter-row" span={6}>
             <div className="unassigned-guide" >
               <h4>Unassigned Guide</h4>
               <div className="text-box">200</div>
             </div>
           </Col>
           <Col className="gutter-row" span={6}>
             <div className="public-tour">
               <h4>Public Tour</h4>
               <div className="text-box">200</div>
             </div>
           </Col>
           <Col className="gutter-row" span={6}>
             <div className="private-tour" >
               <h4>Private Tour</h4>
               <div className="text-box">200</div>
             </div>
           </Col>
         </Row>
      </div>

    );
  }
}

export default BoxAbove
