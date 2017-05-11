import React, { Component } from 'react';
import { connect } from 'react-redux'

import apiAccess from '../Helpers/apiAccess'
import { Form, Input, InputNumber, Icon, Cascader, Select, Row, Col, Checkbox, Button } from 'antd';
import { error } from './Modal'

const FormItem = Form.Item;
const Option = Select.Option;
let title1 = "Amount of Participants"
let title2 = "Tour Guide Cost(Baht)"

class CostModelModal extends Component{

  constructor(props){
    super(props)
    this.state = {
      tour_id: '',
      uuid: 1
    }
  }

  handleSubmit(e) {
    console.log(e)
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      console.log(values)
      // if (!err) {
      //
      //   let payload = {email: this.props.form.getFieldValue('email'),
      //                 password: this.props.form.getFieldValue('password'),
      //                 confirm: this.props.form.getFieldValue('confirm'),
      //                 title: this.props.form.getFieldValue('title')[0],
      //                 name:this.props.form.getFieldValue('name'),
      //                 surname:this.props.form.getFieldValue('surname'),
      //                 role:this.props.form.getFieldValue('role')[0],
      //                 workplace:this.props.form.getFieldValue('workplace')[0],
      //                 phone:"0"+ this.props.form.getFieldValue('phone'),
      //                 contract:this.props.form.getFieldValue('contract')[0]}
      //
      //     console.log(payload)
      //
      //     apiAccess({
      //       url: 'http://localhost:8000/register',
      //       method: 'POST',
      //       payload: payload,
      //       attemptAction: () => this.props.dispatch({ type: 'REGIST_ATTEMPT' }),
      //       successAction: (json) => this.props.dispatch({ type: 'REGIST_SUCCESS', json }),
      //       failureAction: () => this.props.dispatch({ type: 'REGIST_FAILED' })
      //     })
      //   }else
      //       console.log("error")
      });


  }

  editCondition(){

  }

  editInputStatus(fieldname){

  }

  componentWillMount(){


  }

  add(){
    console.log(this.state.uuid)
    let num = this.state.uuid
    let prev = num
    num++
    this.setState({uuid:num})
    console.log(num)

    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(num);

    // form.setFieldsValue({
    //   `lastNumber-${num}`: `firstNumber-${prev}`
    // });
    // can use data-binding to set
    // important! notify form to detect changes

  }

  remove(k){
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }
    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== keys.slice(-1).pop()),
    });
 }



  render() {

    const { getFieldDecorator, getFieldValue  } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 12, offset: 1},
      wrapperCol: { span: 10, offset: 1 },
    };
    const lastformItemLayout = {
      labelCol: { span: 14 },
      wrapperCol: { span: 9 },
    };
    const formItemLayoutWithOutLabel = {
       wrapperCol: { span: 13, offset: 11 },
     };

   const formItemLayoutWithOutLabelPlus = {
      wrapperCol: { span: 13, offset: 9 },
    };


   getFieldDecorator('keys', { initialValue: [1,2,3,4,5] });
   const keys = getFieldValue('keys');


    this.state.formItems = keys.map((k, index) => {
      let title = `Condition-${k}`
      return (
        <div>
          <div className = "cost-model-input-form-item" key={k}>
            <Row>
             <Col span={22}>
                  <Row>
                    <Col span={8}>
                      <FormItem
                       {...formItemLayout}
                       label= {title}
                       hasFeedback
                     >
                      {getFieldDecorator(`firstNumber-${k}`,{initialValue: getFieldValue(`secondNumber-${k-1}`)} || 0, {
                        rules: [{
                          required: true }]
                        })(
                      <InputNumber className = "firstNumber"  style={{width: '95%'}}/>
                      )}
                    </FormItem>
                    </Col>
                    <Col span={1}>
                      <p className="ant-form-split" style = {{textAlign: "center"}}>-</p>
                    </Col>
                    <Col span={7}>
                      <FormItem
                       {...formItemLayout}
                       hasFeedback
                     >
                      {getFieldDecorator(`secondNumber-${k}`, {
                        rules: [{
                          required: true }]
                        })(
                      <InputNumber className = "secondNumber" style={{width: '100%'}}  />
                      )}
                    </FormItem>
                    </Col>
                    <Col span={6}>
                      <FormItem
                       {...formItemLayout}
                       hasFeedback
                     >
                      {getFieldDecorator(`guide-cost-${k}`, {
                        rules: [{
                          required: true }]
                        })(
                      <InputNumber className = "guide-cost" min={1} max={100000} />
                      )}
                    </FormItem>
                    </Col>
                  </Row>
             </Col>

             <Col span={1}>
               <Icon
                 className="dynamic-delete-button"
                 type="minus-circle-o"
                 disabled={keys.length === 1}
                 onClick={() => this.remove()}
               />
            </Col>
          </Row>

      </div>
     </div>
    )
  })

    return(
      <Form className = "cost-model-form" onSubmit={this.handleSubmit.bind(this)}>

        <Row style = {{marginBottom: "2%"}}>
          <Col span={8} offset = {2}>
            <h7><b>{title1}</b></h7>
          </Col>
          <Col span={5} offset = {5}>
            <h7><b>{title2}</b></h7>
          </Col>
        </Row>

        {this.state.formItems}
        <Row>
         <Col span={22}>

              <Row>
                <Col span={9}>
                  <FormItem
                   {...lastformItemLayout}
                   label= "Last condition"
                   hasFeedback
                 >
                   {getFieldDecorator(`lastNumber`,{initialValue: getFieldValue(`secondNumber-${getFieldValue('keys').length}`)}|| 0
                   , {
                     rules: [{
                       required: true }]
                     })(
                  <InputNumber className = "lastNumber" style={{width: '90%'}}/>
                  )}
                </FormItem>
                </Col>
                <Col span={1}>
                  <p className="ant-form-split" style = {{textAlign: "center"}}>-</p>
                </Col>
                <Col span={2}>
                  <Icon type="ellipsis" style={{fontSize:"26px", marginLeft: '5%'}} />
                </Col>
                <Col span={6} offset={4}>
                  <FormItem
                   {...formItemLayout}
                   hasFeedback
                 >
                 {getFieldDecorator(`lastPrice`,{
                   rules: [{
                     required: true }]
                   })(
                  <InputNumber className="lastPrice" min={1} max={100000}  />
                  )}
                </FormItem>
                </Col>
              </Row>
         </Col>

         <Col span={1}>
           <Icon
             className="dynamic-delete-button"
             type="minus-circle-o"
             disabled={true}
           />
        </Col>
      </Row>
        <FormItem {...formItemLayoutWithOutLabelPlus}>
          <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
            <Icon type="plus" /> Add field
          </Button>
        </FormItem>
        <FormItem {...formItemLayoutWithOutLabel}>
          <Button type="primary" htmlType="submit" size="large" style = {{marginTop: 20}}>Submit</Button>
        </FormItem>
      </Form>
    )
  }
}

function mapStateToProps(state){
  return{

  }
}

export default connect(mapStateToProps)(Form.create({})(CostModelModal));
