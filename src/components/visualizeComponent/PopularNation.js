import React, { Component } from 'react';
import { BarChart, AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
         Bar, ComposedChart, PieChart, Pie, Sector, Cell  } from 'recharts';
import { Col, Row, Table } from 'antd'



//Pie Chart
const data4 = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
                  {name: 'Group C', value: 300}, {name: 'Group D', value: 200}];
const COLORS = ['#900C3F', '#C70039', '#FF5733', '#FFC300'];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
 	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x  = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy  + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
    	{`${(percent * 100).toFixed(0)}%`}
    </text>
  );
}

class PopularNation extends Component {

  constructor(props){
    super(props)
  }


  render() {


    return (

      <div>
          <div className= "piechart-container">
                <PieChart width={300} height={170} onMouseEnter={this.onPieEnter}>
                    <Pie
                      data={data4}
                      cx={140}
                      cy={80}
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={80}
                      fill="#8884d8"
                    >

                    {
                    	data4.map((entry, index) => <Cell  fill={COLORS[index % COLORS.length]}/>)
                    }
                  </Pie>
                </PieChart>

                <div className= "popular-color-label">
                  <Row>
                    <Col span = {3} ><div className = "little-box-label" style = {{backgroundColor: COLORS[0]}}/></Col>
                    <Col span = {9} >{data4[0].name}</Col>
                    <Col span = {3} ><div className = "little-box-label" style = {{backgroundColor: COLORS[1]}}/></Col>
                    <Col span = {9} >{data4[1].name}</Col>
                    <Col span = {3} ><div className = "little-box-label" style = {{backgroundColor: COLORS[2]}}/></Col>
                    <Col span = {9} >{data4[2].name}</Col>
                    <Col span = {3} ><div className = "little-box-label" style = {{backgroundColor: COLORS[3]}}/></Col>
                    <Col span = {9} >{data4[3].name}</Col>
                  </Row>
                </div>

                

            </div>


      </div>


    );
  }
}

export default PopularNation
