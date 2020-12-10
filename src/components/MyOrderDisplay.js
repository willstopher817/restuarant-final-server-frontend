import React from 'react';
import {Button, Collapse, Space, Spin, Steps} from "antd";
import {connect} from "react-redux";
import {getDeliveryInfoByUserId} from "../actions/deliveryInfo.action";

const { Step } = Steps;
const { Panel } = Collapse;

class MyOrderDisplay extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount(){
    this.props.getDeliveryInfoByUserId();
    console.log(this.props.deliveryInfo);

    for (let i in this.props.deliveryInfo) {
      if (this.props.deliveryInfo[i].stage === 0) {
        this.setState({
          current: 1,
        })
      } else if (this.props.deliveryInfo[i].stage === 1) {
        this.setState({
          current: 1,
        })
      } else if (this.props.deliveryInfo[i].stage === 2) {
        this.setState({
          current: 1,
        })
      } else if (this.props.deliveryInfo[i].state === 3) {
        this.setState({
          current: 3,
        })
      } else if (this.props.deliveryInfo[i].stage === 4) {
        this.setState({
          current: 4,
        })
      }
    }


    console.log(this.state.current);
  }

  handleClick(e) {
    // window.location.replace("/kitchen-status");
    let orderNum = e.target.value;
    this.props.history.push(`/kitchen-status/${orderNum}`);
  }

  render () {
    return (
      <div>
        <Collapse>
          {
            this.props.deliveryInfo && this.props.deliveryInfo.map(o => {
              return (
                <Panel header={`#${o.orderNum}`} key={o.orderNum}>
                  <Steps current={this.state.current}>
                    <Step title="Payment Finished!" description={`Ordered number: #${o.orderNum}.`}/>
                    <Step title="Kitchen is preparing your food!" description={
                    <Space size="middle">
                      <Spin size="large"/>
                      <Button value={o.orderNum} onClick={this.handleClick}>Check it from Kitchen now!!</Button>
                    </Space>
                  }/>
                    <Step title="Your Order is on the way!" description={`EST arrived time: ${o.time}.`} />
                    <Step title="Done!" description="Enjoy your food!." />
                  </Steps>
                </Panel>
              )
            })
          }
        </Collapse>

      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    authUser: store.loggedIn,
    deliveryInfo: store.deliveryInfo,
  };
}

export default connect(mapStateToProps, {
  getDeliveryInfoByUserId: getDeliveryInfoByUserId
})(MyOrderDisplay);
