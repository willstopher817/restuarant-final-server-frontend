import React from 'react';
import {Card, Col, Descriptions, Divider, Row, Steps} from "antd";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getDeliveryInfoByUserId, getOneDeliveryInfoByOrderNum} from "../actions/deliveryInfo.action";

const { Step } = Steps;

class KitchenStatus extends React.Component {


  constructor(props) {
  super(props);
  this.state = {
    current: 0,
    status1: 'process',
    status2: 'wait',
    status3: 'wait',
    status4: 'wait'
  };
  // this.onButton = this.onButton.bind(this);
}

  componentDidMount() {
    const orderNum = window.location.pathname.match(/\/([^/]*)$/)[1];
    console.log(orderNum);
    this.props.getOneDeliveryInfoByOrderNum(orderNum);
    console.log(this.props.deliveryInfo);
    if (this.props.deliveryInfo.stage === 0) {
      this.setState({
        current: 0,
        status1: 'process',
        status2: 'wait',
        status3: 'wait',
        status4: 'wait'
      })
    } else if (this.props.deliveryInfo.stage === 1) {
      this.setState({
        current: 1,
        status1: 'finish',
        status2: 'process',
        status3: 'wait',
        status4: 'wait'
      })
    } else if (this.props.deliveryInfo.stage === 2) {
      this.setState({
        current: 2,
        status1: 'finish',
        status2: 'finish',
        status3: 'process',
        status4: 'wait'
      })
    } else if (this.props.deliveryInfo.state === 3 || this.props.deliveryInfo.stage === 4) {
      this.setState({
        current: 3,
        status1: 'finish',
        status2: 'finish',
        status3: 'finish',
        status4: 'process'
      })
    }
  }

  onChange = current => {
    console.log('onChange:', current);
    this.setState({ current });
  };

  // onButton() {
  //   const orderNum = window.location.pathname.match(/\/([^/]*)$/)[1];
  //   console.log(orderNum);
  //   this.props.getOneDeliveryInfoByOrderNum(orderNum);
  //   console.log(this.props.deliveryInfo);
  // };

  render () {
    return (
      <div className="container" align="center">
        <h1>Welcome to Kitchen Tracker!!</h1>
        <Steps
          type="navigation"
          size="large"
          current={this.state.current}
          onChange={this.onChange}
          className="site-navigation-steps"
        >
          <Step
            title="Step 1"
            subTitle=''
            status={this.state.status1}
            description="Bob is preparing all the ingredients."
          />
          <Step
            title="Step 2"
            subTitle=''
            status={this.state.status2}
            description="Chef Zhang is stirring fried your food!."
          />
          <Step
            title="Step 3"
            subTitle=''
            status={this.state.status3}
            description="Zed is wrapping your food!."
          />
          <Step
            title="Step 4"
            subTitle=''
            status={this.state.status4}
            description="Order is out of delivery!."
          />
        </Steps>

        {/*<Button onClick={this.onButton}>Click</Button>*/}
        <Divider/>

        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Card
              title="ORDER SUMMARY"
              style={{ width: 400 }}
              hoverable="true"
            >
            <Descriptions
              column={1}
              layout="horizontal">
              <Descriptions.Item label="Order#">#{this.props.deliveryInfo.orderNum}</Descriptions.Item>
              <Descriptions.Item label="Name">{this.props.deliveryInfo.name}</Descriptions.Item>
              <Descriptions.Item label="Phone#">{this.props.deliveryInfo.phone}</Descriptions.Item>
              <Descriptions.Item label="Email">{this.props.deliveryInfo.email}</Descriptions.Item>
              <Descriptions.Item label="Delivered Address">{this.props.deliveryInfo.address1}</Descriptions.Item>
              <Descriptions.Item label="City">{this.props.deliveryInfo.city}</Descriptions.Item>
              <Descriptions.Item label="State">{this.props.deliveryInfo.state}</Descriptions.Item>
              <Descriptions.Item label="Delivered Time">{this.props.deliveryInfo.time}</Descriptions.Item>
            </Descriptions>
            </Card>
          </Col>

          <Col span={12}>
              <Card
                title="PAYMENT DETAILS"
                style={{ width: 400 }}
                hoverable="true"
              >
                <Descriptions
                  column={1}
                  layout="horizontal">
                  <Descriptions.Item label="Subtotal">$ {parseFloat(this.props.deliveryInfo.total).toFixed(2)}</Descriptions.Item>
                  <Descriptions.Item label="Delivery Fee">$ {parseFloat(this.props.deliveryInfo.total*0.15).toFixed(2)}</Descriptions.Item>
                  <Descriptions.Item label="Tax">$ {parseFloat(this.props.deliveryInfo.total*0.08).toFixed(2)}</Descriptions.Item>
                  <Descriptions.Item label="Total">$ {parseFloat(this.props.deliveryInfo.total*1.23).toFixed(2)}</Descriptions.Item>
                </Descriptions>
              </Card>
          </Col>
        </Row>
      </div>
    );
  }

}

function mapStateToProps(store) {
  return {
    authUser: store.loggedIn,
    deliveryInfo: store.deliveryInfo,
    orderInfo: store.orderInfo
  };
}

function mapDispatchToProps(dispatch) {

  return bindActionCreators({
    getDeliveryInfoByUserId: getDeliveryInfoByUserId,
    getOneDeliveryInfoByOrderNum: getOneDeliveryInfoByOrderNum,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(KitchenStatus);
