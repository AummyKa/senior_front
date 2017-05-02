import React, { Component } from 'react';
import { BarChart, AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
         Bar, ComposedChart, PieChart, Pie, Sector, Cell  } from 'recharts';
import { Col, Row, Table } from 'antd'


const data2 = [{name: 'Page A', uv: 590, pv: 800, amt: 1400},
              {name: 'Page B', uv: 868, pv: 967, amt: 1506},
              {name: 'Page C', uv: 1397, pv: 1098, amt: 989},
              {name: 'Page D', uv: 1480, pv: 1200, amt: 1228},
              {name: 'Page E', uv: 1520, pv: 1108, amt: 1100},
              {name: 'Page F', uv: 1400, pv: 680, amt: 1700}];


class TourRanking extends Component {

  constructor(props){
    super(props)
  }


  render() {

    return (

      <div>
         <ComposedChart layout="vertical" width={300} height={250} data={data2}
             margin={{top: 10, right: 20, bottom: 20, left: 20}}>
           <XAxis type="number"/>
           <YAxis dataKey="name" type="category"/>
           <Tooltip/>
           <Legend/>
           <CartesianGrid stroke='#f5f5f5'/>
           <Bar dataKey='pv' barSize={20} fill='#FFC300'/>

        </ComposedChart>
      
      </div>

    );
  }
}

export default TourRanking
