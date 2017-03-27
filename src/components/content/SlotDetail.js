import React, { Component } from 'react';

import { Row,Col,Table, Input, Button,Icon, Dropdown, Badge, Menu } from 'antd';
import { addTour } from '../../actions/action-addTour'

import { Modal } from 'react-bootstrap';
import AddTourForm from '../AddTourForm';

const menu = (
  <Menu>
    <Menu.Item>
      Action 1
    </Menu.Item>
    <Menu.Item>
      Action 2
    </Menu.Item>
  </Menu>
);


  const expandedRowRender = () => {
    const columns = [
      { title: 'Name', dataIndex: 'name', key: 'name' },
      { title: 'Country', dataIndex: 'country', key: 'country' },
      { title: 'Address', dataIndex: 'address', key: 'address' },
      { title: 'Email', dataIndex: 'email', key: 'email' },
      { title: 'Remark', dataIndex: 'remark', key: 'remark' },

      {
        title: 'Action',
        dataIndex: 'operation',
        key: 'operation',
        render: () => (
          <span className={'table-operation'}>
            <a href="#">Edit</a>
          </span>
        ),
      },
    ];

    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i,
        name: 'bubi',
        country: 'Spain',
        address: 'ss hotel',
        email: '+778932233',
        remark: 'nothing',
      });
    }
    return (
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
      />
    );
  };


  const columns = [

    { title: 'Tour', dataIndex: 'tourname', key: 'tourname' },
    { title: 'Type', dataIndex: 'tourtype', key: 'tourtype' },
    { title: 'Guide', dataIndex: 'guide', key: 'guide' },
    { title: 'Participants', dataIndex: 'participants', key: 'participants' },
    { title: 'Remark', dataIndex: 'remark', key: 'remark' },

  ];

  const data = [];
  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i,
      tourname: 'Hello Tour',
      tourtype: 'midnight',
      guide: 'mimi',
      participant: 12,
      remark: 'picked up',
    });
  }


class SlotDetail extends Component {

  constructor(props){
    super(props)
    this.state = {
      show: false
    }
  }

  addMoreTour(){
      this.props.dispatch(addTour("ADD_TOUR",this.props.selectedDate))
  }

  render() {
    return (

      <div>
        <Button className = 'add-tour' onClick={()=> this.addMoreTour() }>Add tour</Button>
        <Table className="components-table-demo-nested" columns={columns}
          expandedRowRender={expandedRowRender} dataSource={data}/>
      </div>

    );
  }
}


export default SlotDetail
