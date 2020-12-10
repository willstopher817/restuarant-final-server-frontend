import React from 'react';
import {connect} from "react-redux";
import {
  Avatar, Badge,
  Button,
  Col,
  DatePicker,
  Descriptions,
  Divider,
  Form,
  Input,
  Popconfirm,
  Row,
  Table,
} from "antd";
import {bindActionCreators} from "redux";
import {editProfile, getUserDetail} from "../actions/userDetail.action";
import {getCart} from "../actions/cart.action";
import {addDeliveryInfo} from "../actions/deliveryInfo.action";
import {Link} from "react-router-dom";


const order = JSON.parse(localStorage.getItem('order'));
// let purchase = [];

const EDIT_USER_PROFILE_FROM_CONTROLS = [
  {name: 'name', type: 'text', label: 'Name'},
  {name: 'phone', type: 'text', label: 'Phone'},
  {name: 'email', type: 'text', label: 'Email'},
  {name: 'address1', type: 'text', label: 'Address1'},
  {name: 'address2', type: 'text', label: 'Address2'},
  {name: 'city', type: 'text', label: 'City'},
];
let total = 0;

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      searchText: '',
      searchedColumn: '',
      value: null,
    };
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  renderField(field) {
    return (
      <Form.Item
        label={field.label}
        name={field.name}
        type={field.type}
      >
        <Input
          disabled={field.name === 'id'}
          {...field.input}
        />
      </Form.Item>
    );
  }

  componentDidMount() {
    this.props.getUserDetail();
    // this.props.getCart();
    // const userIndex = this.props.cart.findIndex(i => i.user.id === this.props.authUser.id);
    // const orderId = this.props.cart[userIndex] ? this.props.cart[userIndex].id : null;
    // const index = this.props.cart.findIndex(i => i.id === orderId ? orderId : null);
    // const cart = this.props.cart[index];
    // if (cart) {
    //   purchase = cart.purchases;
    // } else {
    //   return null;
    // }
    // total = 0;
    // for (let i in purchase) {
    //   total += purchase[i].menu.price * purchase[i].qty
    // }
    for (let i in order) {
      total += order[i].price * order[i].qty;
    }
  }

  handleSubmit(e) {
    const order = {
      name: e.name,
      phone: e.phone,
      email: e.email,
      address1: e.address1,
      address2: e.address2,
      city: e.city,
      state: e.state,
      zip: e.zip,
      time: e.time,
      total: total
    };

    this.props.addDeliveryInfo(order, (res) => {
      if (res.data && res.data.success) {
        window.location.replace("/check-out-page");
      }
      else{
      }
    })

  }

  handleDeleteClick(o) {
    const index = order.findIndex(order => order === o);
    order.splice(index, 1);
    localStorage.setItem('order', JSON.stringify(order));
    window.location.replace("/cart");
  }

  dateOnChange(date, dateString) {
    console.log(date, dateString);
  }

  timeOnChange = time => {
    console.log(time);
    this.setState({ value: time });
  };

  onOk(value) {
    console.log('onOk: ', value);
  }

render () {

    const columns = [
      {
        key: 'img',
        render: (record) =>
          <span className="avatar-item">
          <Badge count={record.qty}>
          <Avatar size={72} shape="square" src={record.img} />
          </Badge>
          </span>
      },
      {
        title: 'Name',
        key: 'foodName',
        render: (record) =>
          <h5>{record.foodName}</h5>
      },
      {
        title: 'Price per Unit',
        key: 'price',
        render: (record) =>
          <p>{record.price}</p>
      },
      {
        title: 'Total',
        key: 'total',
        render: (record) =>
          <p>{record.price * record.qty}</p>
      },
      {
        dataIndex: 'delete',
        width: '5%',
        render: (text, record) =>
          order ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDeleteClick(record)}>
              <a>Delete</a>
            </Popconfirm>
          ) : null,
      },
    ];

    return (
      <React.Fragment>
        <Row gutter={[16, 16]}>
          <Col span={5} offset={1}>
            <div className="container">
              <h2 ref={this.h2ElemRef}>Where?</h2>
              <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 8 }}
                layout="vertical"
                initialValues={this.props.userDetail}
                onFinish={this.handleSubmit}
              >
                {
                  EDIT_USER_PROFILE_FROM_CONTROLS.map(field => this.renderField(field))
                }
                <Form.Item label="State and ZIP" style={{ marginBottom: 0 }}>
                  <Form.Item
                    name="state"
                    rules={[{ required: true }]}
                    style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                  >
                    <Input placeholder="Input state" />
                  </Form.Item>
                  <Form.Item
                    name="zip"
                    rules={[{ required: true }]}
                    style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
                  >
                    <Input placeholder="Input ZIP" />
                  </Form.Item>
                </Form.Item>
                <Form.Item label="When you want your food delivered?" name="time" key="time">
                  <DatePicker showTime onChange={this.dateOnChange} onOk={this.onOk} />
                </Form.Item>
                <Button type="primary" htmlType="submit">
                  Check Out
                </Button>
              </Form>
            </div>
          </Col>

          <Col span={5} offset={8}>
            {
              order
              ? <Table pagination={false} columns={columns} dataSource={order} />
              : <Link to='/menu'>Your Cart is Empty, please try to add something to your Cart!</Link>
            }
            <h1>Check Out</h1>
            <Divider/>
            <Descriptions
              column={1}
              layout="horizontal">
              <Descriptions.Item label="Subtotal">$ {parseFloat(total).toFixed(2)}</Descriptions.Item>
              <Descriptions.Item label="Delivery Fee">$ {parseFloat(total*0.15).toFixed(2)}</Descriptions.Item>
              <Descriptions.Item label="Tax">$ {parseFloat(total*0.08).toFixed(2)}</Descriptions.Item>
              <Divider/>
              <Descriptions.Item label="Total">$ {parseFloat(total*1.23).toFixed(2)}</Descriptions.Item>
            </Descriptions>
            <p>{this.state.message}</p>
          </Col>
        </Row>
      </React.Fragment>
    );
  }

}

function mapStateToProps(store) {
  return {
    cart: store.cart,
    userDetail: store.userDetail,
    initialValues: store.userDetail,
    authUser: store.loggedIn
  }
}

function mapDispatchToProps(dispatch) {

  return bindActionCreators({
    addDeliveryInfo: addDeliveryInfo,
    getCart: getCart,
    getUserDetail: getUserDetail,
    editProfileWithDispatch: editProfile
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
