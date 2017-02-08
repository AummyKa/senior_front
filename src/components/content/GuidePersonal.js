import React, { Component } from 'react';
import { Row,Col,Radio,Button,Input, DatePicker } from 'antd';


class GuidePersonal extends Component {

  constructor(props){
    super(props)
    this.state = {
      title: "Ms.",
      name: "Marry",
      surname: "Christmas",
      birthdate: "1988-04-12",
      email: "marry@gmail.com",
      lineID: "marry1113",
      address: "-",
      tel: "085-033-2222",
      workPlace: "Bangkok",
      edit: false
    }
  }

  guideEdit(){
    this.setState({edit:true})
  }

  showButtonSave(){
    return(
      <Button className = "save-guide-edit" >Save</Button>
    )
  }

  guideShowEdit(val,topic){

      switch (topic) {
        case "birthdate":
        return(
          <div className="normal-input">
             <DatePicker />
          </div>
        )
          break;
        case "lineID":
        return(
          <div className="normal-input">
            <Input defaultValue = {val} />
          </div>
        )
          break;
        case "address":
        return(
          <div className="big-input">
            <Input type="textarea" rows={3} defaultValue = {val} />
          </div>
        )
          break;
        case "tel":
        return(
          <div className="tel-input">
            <Input defaultValue = {val} />
          </div>
        )
          break;
        default:
  }
  }

  render() {


    return (

      <div className = "guide-personal-content" >
        <Row>
           <Col span={4}>
             <ul>
              <li>Title</li><br/>
              <li>Name</li><br/>
              <li>Surname</li><br/>
              <li>Birthdate</li><br/>
              <li>Email</li><br/>
            </ul>

           </Col>
           <Col span={8}>
             <ul>
               <li>{this.state.title }</li><br/>
               <li>{this.state.name}</li><br/>
               <li>{this.state.surname}</li><br/>
               <li>{this.state.edit ? this.guideShowEdit(this.state.birthdate,"birthdate") :this.state.birthdate}</li><br/>
               <li>{this.state.email}</li><br/>
            </ul>
           </Col>
           <Col span={4}>
             <ul>
              <li>LineID</li><br/>
              <li>Address</li><br/><br/>
              <li>Tel</li><br/>
              <li>WorkPlace</li><br/>
            </ul>
           </Col>
           <Col span={8}>
             <ul>
               <li>{this.state.edit ? this.guideShowEdit(this.state.lineID,"lineID") :this.state.lineID}</li><br/>
               <li>{this.state.edit ? this.guideShowEdit(this.state.address,"address") :this.state.address}</li><br/><br/>
               <li>{this.state.edit ? this.guideShowEdit(this.state.tel,"tel") :this.state.tel}</li><br/>
               <li>{this.state.workPlace}</li><br/>

             </ul>
           </Col>
        </Row>
        <div className = "guide-edit-button">
          {this.state.edit ? this.showButtonSave() : null}
        </div>

        <Button className = "edit-guide-profile" onClick ={()=>this.guideEdit()} >Edit</Button>
      </div>



    );
  }
}

export default GuidePersonal
