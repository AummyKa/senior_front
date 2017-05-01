import React, { Component } from 'react';
import { BarChart, AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
         Bar, ComposedChart, PieChart, Pie, Sector, Cell  } from 'recharts';
import { Col, Row, Table } from 'antd'

import TotalRev from '../visualizeComponent/TotalRev'
import BoxAbove from '../visualizeComponent/BoxAbove'
import TourRanking from '../visualizeComponent/TourRanking'
import PopularNation from '../visualizeComponent/PopularNation'


class Home extends Component {

  constructor(props){
    super(props)
  }


  render() {

    return (

      <div>

        <div className="gutter-example" >
            <BoxAbove />
        </div>

        <Row gutter={16}>
         <Col span={16}>
           <div className = "total-revenue">
             <div className = "total-revenue-label">
               <h4>Total Revenue</h4>
             </div>
             <TotalRev />
           </div>
         </Col>

         <Col span={8}>
           <div className = "each-tour-total-revenue">
             <div className = "each-tour-total-revenue-label">
               <h4>Tour Ranking</h4>
             </div>
             <TourRanking />
           </div>

           <div className = "popular-nation">
             <div className = "popular-nation-label">
               <h4>Popular Nation</h4>
             </div>
             <PopularNation />
           </div>

         </Col>

      { /*</Row>
        <Col span={8}>
          <div className = "fav-nation">
          </div>
        </Col>
        <Col span={8}>
          <div className = "guide-rev">
          </div>
        </Col>
        <Col span={8}>
          <div className = "guide-rev-graph">
          </div>
        </Col>
      <Row>
      */}
      </Row>

      </div>

    );
  }
}

export default Home
