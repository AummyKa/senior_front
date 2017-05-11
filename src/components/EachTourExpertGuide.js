import React, { Component } from 'react';
import { BarChart, AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
         Bar, ComposedChart, PieChart, Pie, Sector, Cell  } from 'recharts';
import { Col, Row, Table, Icon } from 'antd'
import StarRatingComponent from 'react-star-rating-component';


const data = [{
  key: '1',
  guidename: 'Mr. SomChai Arunrat',
  rating: 5,
}, {
  key: '2',
  guidename: 'Ms. Wattana Reaingsuk',
  rating: 5,
}, {
  key: '3',
  guidename: 'Suppakorn Amornchai',
  rating: 4,
}];


class EachTourExpertGuide extends Component {

  constructor(props){
    super(props)
  }


  render() {

    const columns = [{ title: 'Guide Name', dataIndex: 'guidename'},
                    {  title: 'Rating',dataIndex: 'rating', render: (text, record) =>
                    <span>
                      <StarRatingComponent
                        name= "rating"
                        starCount={5}
                        value={record.rating}
                        editing={false}
                        starColor= "#FFC300"
                        emptyStarColor= "#000000"
                        renderStarIcon={() => <span><Icon type="star" /></span>}
                      />
                    </span>

                    }];

    return (

       <div className = "each-tour-expert-guide">
            <Table columns={columns} dataSource={data} size="small" />
        </div>


    );
  }
}

export default EachTourExpertGuide
