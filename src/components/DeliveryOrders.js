import React from 'react';
import {Button, notification, Table, Tag} from "antd";
import {bindActionCreators} from "redux";
import {editProfile, getUserDetail} from "../actions/userDetail.action";
import {connect} from "react-redux";
import {changeStage, getAllDeliveryInfo} from "../actions/deliveryInfo.action";

class DeliveryOrders extends React.Component {

  componentDidMount() {
    this.props.getAllDeliveryInfo();
  }


  changeStage = e => {
    this.props.changeStage(e, (res) => {
      if (res.data && res.data.success) {
        this.props.history.push('/orders')
      } else {
      }
    });
    console.log(e);
  };

  stageOnChange = e => {
    console.log(e);
  };

  handleGet = e => {
    console.log(e);
    const oldDeliveryOrder = JSON.parse(localStorage.getItem('deliveryOrder')) || [];
    const index = oldDeliveryOrder.findIndex(odo => odo.id === e.id);
    if (index >= 0) {
      oldDeliveryOrder.splice(index, 1, e);
    } else {
      oldDeliveryOrder.push(e);
    }
    localStorage.setItem('deliveryOrder', JSON.stringify(oldDeliveryOrder));
    notification.open({
      message: 'Successfully Got Delivery Order!!',
      description: `order#: ${e.orderNum}`,
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };

  handleNext() {
    window.location.replace('/driver-map')
  }

  render () {

    const columns = [
      {
        title: 'Order ID',
        key: 'orderId',
        render: (record) =>
          <div>#{record.orderNum}</div>
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Purchase Date',
        dataIndex: 'time',
        key: 'time',
      },
      {
        title: 'Address',
        dataIndex: 'address1',
        key: 'address1',
      },
      {
        title: 'City',
        dataIndex: 'city',
        key: 'city',
      },
      {
        title: 'Total',
        key: 'total',
        render: (record) =>
          <div>$ {parseFloat(record.total * 1.23).toFixed(2)}</div>
      },
      {
        title: 'Stage',
        width: '15%',
        render: (record) =>
          <span>
              {
                record.stage === 0 || record.stage === 1 || record.stage === 2
                  ? <Tag color="red" key={record}>
                    Kitchen
                  </Tag>
                  : record.stage === 3 || record.stage === 4
                  ? <Button onClick={() =>this.handleGet(record)} key={record}>
                    GET
                  </Button>
                  : <div/>
              }
            </span>
      },
    ];

    return (

      <React.Fragment>
        <Button onClick={this.handleNext.bind(this)}>Next</Button>
        {
          this.props.deliveryInfo
            ? <Table pagination={true} columns={columns} dataSource={this.props.deliveryInfo} />
            : null
        }
      </React.Fragment>

    );

  }

}

function mapStateToProps(store) {
  return {
    deliveryInfo: store.deliveryInfo,
    userDetail: store.userDetail,
    initialValues: store.userDetail,
    authUser: store.loggedIn
  }
}

function mapDispatchToProps(dispatch) {

  return bindActionCreators({
    getAllDeliveryInfo: getAllDeliveryInfo,
    getUserDetail: getUserDetail,
    editProfileWithDispatch: editProfile,
    changeStage: changeStage
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryOrders);
