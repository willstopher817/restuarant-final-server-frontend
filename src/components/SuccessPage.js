import React from 'react';
import {Button, Result} from "antd";
import {connect} from "react-redux";
import {getOneDeliveryInfoByOrderNum} from "../actions/deliveryInfo.action";

const info = JSON.parse(localStorage.getItem('info'));

class SuccessPage extends React.Component {

  constructor(props) {
    super(props);
    this.handlePanelPage = this.handlePanelPage.bind(this);
    this.handelBuyPage = this.handelBuyPage.bind(this);
    this.handelTrackOrder = this.handelTrackOrder.bind(this);
  }

  componentDidMount(){
  }

  handlePanelPage() {
    this.props.history.push("/order-from-server-menu");
    localStorage.removeItem('order');
    localStorage.removeItem('info');
  }

  handelBuyPage() {
    this.props.history.push("/order-from-server");
    localStorage.removeItem('order');
    localStorage.removeItem('info');
  }
  handelTrackOrder() {
    // this.props.history.push(`/kitchen-status/${info.orderNum}`);
    this.props.history.push('/home');
    localStorage.removeItem('order');
    localStorage.removeItem('info');
  }

  render () {
    return (

      <div>
        {
          this.props.authUser && this.props.authUser.profiles[0].type === 'ROLE_ADMIN'
            ? <Result
              status="success"
              title="Successful!"
              subTitle="Please contact to customers for more details."
              extra={[
                <Button type="primary" key="panel" onClick={this.handlePanelPage}>
                  View Panel Page
                </Button>,
                <Button key="buy" onClick={this.handelBuyPage}>
                  Make Another Reservation
                </Button>,
              ]}
            /> : null
        }
        {
          this.props.authUser && this.props.authUser.profiles[0].type === 'ROLE_SERVER'
            ? <Result
              status="success"
              title="Successful!"
              subTitle={`Congrats! The order id is: #${info.orderNum}`}
              extra={[
                <Button type="primary" key="panel" onClick={this.handelTrackOrder}>
                  Track my order!
                </Button>
              ]}
            /> : null
        }
        {
          this.props.authUser && this.props.authUser.profiles[0].type === 'ROLE_USER'
            ? <Result
              status="success"
              title="Successful!"
              subTitle={`Congrats! Your payment is done. Your order id is: #${info.orderNum}`}
              extra={[
                <Button type="primary" key="panel" onClick={this.handelTrackOrder}>
                  Go to home page
                </Button>
              ]}
            /> : null
        }
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

export default connect(mapStateToProps, {getOneDeliveryInfoByOrderNum})(SuccessPage);
