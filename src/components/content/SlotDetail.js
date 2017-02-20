import React, { Component } from 'react';

import { Row,Col,Table, Input, Button,Icon } from 'antd';

const columns = [{
  title: 'Time',
  dataIndex: 'time',
  key: 'time',
  render: text => <a href="#">{text}</a>,
}, {
  title: 'Tour name',
  dataIndex: 'tourname',
  key: 'tourname',
}, {
  title: 'Place',
  dataIndex: 'place',
  key: 'place',
},
{
  title: 'Type',
  dataIndex: 'type',
  key: 'type',
},
{
  title: 'Guide',
  dataIndex: 'guide',
  key: 'guide',
},
 {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="#">Delete</a>
      <span className="ant-divider" />
      <a href="#">Edit</a>
    </span>
  ),
}];

const data = [{
  key: '1',
  time: '18:00',
  tourname: 'Happy tour',
  place: 'Bangkok',
  type: 'Public',
  guide: 'Ms. Misha Sawasdee'
},{
  key: '2',
  time: '18:00',
  tourname: 'Happy tour',
  place: 'Bangkok',
  type: 'Public',
  guide: 'Ms. Misha Sawasdee'
},{
  key: '3',
  time: '18:00',
  tourname: 'Happy tour',
  place: 'Bangkok',
  type: 'Public',
  guide: 'Ms. Misha Sawasdee'
},];


class SlotDetail extends Component {


  render() {
    return (

      <div>
        <Table columns={columns} dataSource={data} />
      </div>

    );
  }
}

export default SlotDetail
