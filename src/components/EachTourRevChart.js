import React, { Component } from 'react';
import { BarChart, AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
         Bar, ComposedChart, PieChart, Pie, Sector, Cell  } from 'recharts';
import { Col, Row, Table } from 'antd'

const data = [
      {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
      {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
      {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
      {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
      {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
      {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
      {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];

const data3 = [{
  key: '1',
  month: 'January',
  public: '150,000',
  private: '112,045'
}, {
  key: '2',
  month: 'Febluary',
  public: '230,000',
  private: '110,100'
}, {
  key: '3',
  month: 'March',
  public: '211,340',
  private: '100,400'
}];

function getTotalMonthlyRev(pub,pri){

  let intPub = parseInt(pub.replace(',',''))
  let intPri = parseInt(pri.replace(',',''))
  let total = intPub + intPri
  console.log(total)
  return(
    <span>{total}</span>
  )
}


class EachTourRevChart extends Component {

  constructor(props){
    super(props)
  }


  render() {

    const columns = [{ title: 'Month', dataIndex: 'month'},
                    {  title: 'Public',dataIndex: 'public'},
                    {  title: 'Private',dataIndex: 'private'},
                    {  title: 'Total', dataIndex: 'total', render: (text, record) =>
                      getTotalMonthlyRev(record.public,record.private) }];

    return (

      <div>
          <AreaChart width={650} height={230} data={data}
                 margin={{top: 10, right: 30, left: 0, bottom: 0}}>
             <XAxis dataKey="name"/>
             <YAxis/>
             <CartesianGrid strokeDasharray="3 3"/>
             <Tooltip/>
             <Area type='monotone' dataKey='uv' stroke='#FF5733' fill='#FFC300' />
           </AreaChart>

             <div className = "each-tour-month-rev-summary">
              <Row>
                <Col span = {10}><h5><b>Monthly revenue summary</b></h5></Col>
                <Col span = {6} offset = {8}><h5>Year</h5></Col>
              </Row>
                <Table columns={columns} dataSource={data3} size="small" />
            </div>

      </div>

    );
  }
}

export default EachTourRevChart
