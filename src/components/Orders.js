import React from 'react';
import {Avatar, Button, Modal, Popconfirm, Select, Table} from "antd";
import {bindActionCreators} from "redux";
import {editProfile, getUserDetail} from "../actions/userDetail.action";
import {connect} from "react-redux";
import {changeStage, deleteOrder, getAllDeliveryInfo} from "../actions/deliveryInfo.action";
import {getOrderInfoByOrderNum} from "../actions/orderInfo.action";


const { Option } = Select;

class Orders extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
    this.handlePopupClick = this.handlePopupClick.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

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

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  handlePopupClick(e) {
    this.setState({
      visible: true,
    });
  }

  handleOk = e => {
    this.setState({
      visible: false,
    });
  };

  handleClick(e) {
    console.log(e);
    this.props.getOrderInfoByOrderNum(e.orderNum);
    this.setState({
      visible: true,
    });
  }

  handleDeleteButton(orderToDelete) {
    this.props.deleteOrder(orderToDelete, (res) => {
      if (res.data && res.data.success) {
        this.props.history.push('/orders');
      } else {
      }
    });
  }

  render () {

    const columns = [
      {
        title: 'Check Order',
        key: 'checkOrder',
        render: (record) =>
          <Button onClick={() => this.handleClick(record)}>Check</Button>
      },
      {
        title: 'Order ID',
        key: 'orderId',
        render: (record) =>
          <div>#{record.orderNum}</div>
      },
      {
        title: 'User ID',
        dataIndex: 'userId',
        key: 'userID',
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
        title: 'Total',
        key: 'total',
        render: (record) =>
          <div>$ {parseFloat(record.total * 1.23).toFixed(2)}</div>
      },
      {
        title: 'Stage',
        width: '15%',
        key: 'stage',
        render: (record) =>
          <Select
            placeholder={record.stage}
            onSelect={() => this.changeStage(record)}
            onChange={(stage) => this.stageOnChange(record.stage = stage)}
          >
            <Option value={0}>0</Option>
            <Option value={1}>1</Option>
            <Option value={2}>2</Option>
            <Option value={3}>3</Option>
            <Option value={4}>4</Option>
          </Select>
      },
      {
        title: 'Delete',
        key: 'delete',
        render: (record) =>
          <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDeleteButton(record)}>
            <a>Delete</a>
          </Popconfirm>
      }
    ];

    return (
      <React.Fragment>
        <Modal
          title="Order Detail"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>price</th>
                <th>qty</th>
                <th>Img</th>
              </tr>
            </thead>
            <tbody>
              {
                this.props.orderInfo && this.props.orderInfo.map(oi => {
                  return (
                    <tr key={oi.id}>
                      <td>{oi.foodName}</td>
                      <td>$ {parseFloat(oi.price).toFixed(2)}</td>
                      <td>{oi.qty}</td>
                      <td>
                        <Avatar size={64} shape="square" src={oi.img} />
                      </td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>

        </Modal>
        {
          this.props.deliveryInfo
            ? <Table
              columns={columns}
              dataSource={this.props.deliveryInfo} />
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
    orderInfo: store.orderInfo,
    authUser: store.loggedIn
  }
}

function mapDispatchToProps(dispatch) {

  return bindActionCreators({
    getOrderInfoByOrderNum: getOrderInfoByOrderNum,
    getAllDeliveryInfo: getAllDeliveryInfo,
    getUserDetail: getUserDetail,
    editProfileWithDispatch: editProfile,
    changeStage: changeStage,
    deleteOrder: deleteOrder
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
