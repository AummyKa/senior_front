import { Modal, Button } from 'antd';
import React from 'react';

const ModalPop = React.createClass({
  getInitialState() {
    return {
      loading: false,
      visible: true,
    };
  },
  showModal() {
    this.setState({
      visible: true,
    });
  },
  handleOk() {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  },
  handleCancel() {
    this.setState({ visible: false });
  },
  render() {
    return (
      <div>
        <Modal
          visible={this.state.visible}
          title="Title"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" type="ghost" size="large" onClick={this.handleCancel}>Return</Button>,
            <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.handleOk}>
              Submit
            </Button>,
          ]}
        >
          {this.props.text}
        </Modal>
      </div>
    );
  },
});

export default ModalPop
