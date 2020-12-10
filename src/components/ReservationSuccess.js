import React from 'react';
import {Button, Result} from "antd";
import {connect} from "react-redux";

class ReservationSuccessPage extends React.Component {

  constructor(props) {
    super(props);
    this.handelAnotherReservation = this.handelAnotherReservation.bind(this);
    this.handleHome = this.handleHome.bind(this);
  }

  componentDidMount(){
  }

  handelAnotherReservation() {
    this.props.history.push('/order-from-server');
  }

  handleHome() {
    this.props.history.push('/home');
  }

  render () {
    return (

      <div>

        <Result
          status="success"
          title="Successful!"
          subTitle="Reservation successfully made!."
          extra={[
            <Button key="reservation" onClick={this.handleHome}>
             Go To Home Page
            </Button>,
            <Button type="primary" key="reservation" onClick={this.handelAnotherReservation}>
              Make Another Reservation
            </Button>,
          ]}
        />
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

export default connect(mapStateToProps)(ReservationSuccessPage);
