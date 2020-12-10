import React from 'react';
import {Button, Cascader, DatePicker, Form, Input, InputNumber, Tabs} from "antd";
import {bindActionCreators} from "redux";
import {editProfile, getUserDetail} from "../actions/userDetail.action";
import {connect} from "react-redux";
import {addReservation} from "../actions/reservation.action";

const ORDER_FROM_SERVER = [
  {name: 'name', type: 'text', label: 'Name'},
  {name: 'phone', type: 'text', label: 'Phone'},
];

const options = [
  {
    value: 'booth',
    label: 'Booth',
    children: [
      {
        value: 'booth-for-two',
        label: 'booth-for-two',
        children: [
          {
            value: 'booth-for-two-1',
            label: 'booth-for-two-1',
          },
          {
            value: 'booth-for-two-2',
            label: 'booth-for-two-2',
          },
          {
            value: 'booth-for-two-3',
            label: 'booth-for-two-3',
          },
          {
            value: 'booth-for-two-4',
            label: 'booth-for-two-4',
          },
        ],
      },
      {
        value: 'booth-for-four',
        label: 'booth-for-four',
        children: [
          {
            value: 'booth-for-four-1',
            label: 'booth-for-four-1',
          },
          {
            value: 'booth-for-four-2',
            label: 'booth-for-four-2',
          },
          {
            value: 'booth-for-four-3',
            label: 'booth-for-four-3',
          },
          {
            value: 'booth-for-four-4',
            label: 'booth-for-four-4',
          },
          {
            value: 'booth-for-four-5',
            label: 'booth-for-four-5',
          },
          {
            value: 'booth-for-four-6',
            label: 'booth-for-four-6',
          },
          {
            value: 'booth-for-four-7',
            label: 'booth-for-four-7',
          },
          {
            value: 'booth-for-four-8',
            label: 'booth-for-four-8',
          },
        ],
      },
    ],
  },
  {
    value: 'table',
    label: 'Table',
    children: [
      {
        value: 'table-for-four',
        label: 'table-for-four',
        children: [
          {
            value: 'table-for-four-1',
            label: 'table-for-four-1',
          },
          {
            value: 'table-for-four-2',
            label: 'table-for-four-2',
          },
          {
            value: 'table-for-four-3',
            label: 'table-for-four-3',
          },
          {
            value: 'table-for-four-4',
            label: 'table-for-four-4',
          },
          {
            value: 'table-for-four-5',
            label: 'table-for-four-5',
          },
          {
            value: 'table-for-four-6',
            label: 'table-for-four-6',
          },
          {
            value: 'table-for-four-7',
            label: 'table-for-four-7',
          },
          {
            value: 'table-for-four-8',
            label: 'table-for-four-8',
          },
        ],
      },
      {
        value: 'table-for-eight',
        label: 'table-for-eight',
        children: [
          {
            value: 'table-for-eight-1',
            label: 'table-for-eight-1',
          },
          {
            value: 'table-for-eight-2',
            label: 'table-for-eight-2',
          },
          {
            value: 'table-for-eight-3',
            label: 'table-for-eight-3',
          },
          {
            value: 'table-for-eight-4',
            label: 'table-for-eight-4',
          },
        ],
      },
      {
        value: 'table-for-sixteen',
        label: 'table-for-sixteen',
        children: [
          {
            value: 'table-for-sixteen-1',
            label: 'table-for-sixteen-1',
          },
          {
            value: 'table-for-sixteen-2',
            label: 'table-for-sixteen-2',
          },
        ],
      },
    ],
  },
  {
    value: 'party-room',
    label: 'Party Room',
    children: [
      {
        value: 'party-room-1',
        label: 'party-room-1',
      },
      {
        value: 'party-room-2',
        label: 'party-room-2',
      },
    ],
  },
];

const tailLayout = {
  wrapperCol: {
    offset: 2,
    span: 16,
  },
};

const { TabPane } = Tabs;

class OrderFromServer extends React.Component{

  constructor(props) {
   super(props);
   this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOrderSubmit = this.handleOrderSubmit.bind(this);
    this.addReservation = this.addReservation.bind(this);
  }

  renderField(field) {
    return (
      <Form.Item
        label={field.label}
        name={field.name}
        type={field.type}
      >
        <Input/>
      </Form.Item>
    );
  }

  handleSubmit(e) {
    console.log(e);
  }

  handleOrderSubmit(e) {
    this.props.history.push("/order-from-server-menu");
    e.userId = this.props.authUser.id;
    e.total = 0;
    localStorage.setItem('takeOutFromServer', JSON.stringify(e));
    console.log(e);
  }

  addReservation(e) {
    e = {
      name: e.name,
      phone: e.phone,
      people: e.people,
      spot: e.spot[2],
      time: e.time
    };
    this.props.addReservation(e, (res) => {
      if (res.data && res.data.success) {
        this.props.history.push("/reservation-success-page");
      }
      else{
      }
    })
  }

  dateOnChange(date, dateString) {
    console.log(date, dateString);
  }

  onChange(value) {
    console.log(value);
  }

  displayRender(label) {
    return label[label.length - 1];
  }

  render () {
    return (
        <Tabs defaultActiveKey="1" size="large">
          <TabPane tab="Dine In" key="1">
              <h2 ref={this.h2ElemRef}>Dine In</h2>
              <Form
                labelCol={{ span: 2}}
                wrapperCol={{ span: 8 }}
                layout="horizontal"
                onFinish={this.handleOrderSubmit}>
                {
                  ORDER_FROM_SERVER.map(field => this.renderField(field))
                }
                <Form.Item
                  label="People"
                  name="people"
                >
                  <InputNumber min={1} max={100}/>
                </Form.Item>
                <Form.Item
                  label="Table"
                  name="table"
                  type="text"
                >
                  <Cascader
                    options={options}
                    expandTrigger="hover"
                    displayRender={this.displayRender}
                    onChange={this.onChange}
                  />
                </Form.Item>
                <Form.Item {...tailLayout}>
                  <Button type="primary" htmlType="submit" >Next</Button>
                </Form.Item>
              </Form>
          </TabPane>
          <TabPane tab="Take Out" key="2">
              <h2 ref={this.h2ElemRef}>Take Out</h2>
              <Form
                labelCol={{ span: 2 }}
                wrapperCol={{ span: 8 }}
                layout="horizontal"
                onFinish={this.handleOrderSubmit}>
                {
                  ORDER_FROM_SERVER.map(field => this.renderField(field))
                }
                <Form.Item
                  label="Email"
                  name="email"
                >
                  <Input/>
                </Form.Item>
                <Form.Item
                  label="Address1"
                  name="address1"
                >
                  <Input/>
                </Form.Item>
                <Form.Item
                  label="Address2"
                  name="address2"
                >
                  <Input/>
                </Form.Item>
                <Form.Item
                  label="City"
                  name="city"
                >
                  <Input/>
                </Form.Item>
                <Form.Item label="State and ZIP" style={{ marginBottom: 0 }}>
                  <Form.Item
                    name="state"
                    style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                  >
                    <Input placeholder="State"/>
                  </Form.Item>
                  <Form.Item
                    name="zip"
                    style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
                  >
                    <Input placeholder="Zip"/>
                  </Form.Item>
                </Form.Item>
                <Form.Item label="Time" key="time" name="time">
                  <DatePicker
                    showTime
                    onChange={this.dateOnChange}
                    onOk={this.onOk}
                  />
                </Form.Item>
                <Form.Item {...tailLayout}>
                  <Button type="primary" htmlType="submit" >Next</Button>
                </Form.Item>
              </Form>
          </TabPane>
          <TabPane tab="Reservation" key="3">
            <h2 ref={this.h2ElemRef}>Reservation</h2>
            <Form
              labelCol={{ span: 2}}
              wrapperCol={{ span: 8 }}
              layout="horizontal"
              onFinish={this.addReservation}>
              {
                ORDER_FROM_SERVER.map(field => this.renderField(field))
              }
              <Form.Item
                label="People"
                name="people"
              >
                <InputNumber min={1} max={100}/>
              </Form.Item>
              <Form.Item
                label="Table"
                name="spot"
                type="text"
              >
                <Cascader
                  options={options}
                  expandTrigger="hover"
                  displayRender={this.displayRender}
                  onChange={this.onChange}
                />
              </Form.Item>
              <Form.Item label="Time" key="time" name="time">
                <DatePicker
                  showTime
                  onChange={this.dateOnChange}
                  onOk={this.onOk}
                />
              </Form.Item>
              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" >Submit</Button>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>

    );
  }

}
function mapStateToProps(store) {
  return {
    initialValues: store.userDetail,
    authUser: store.loggedIn
  }
}

function mapDispatchToProps(dispatch) {

  return bindActionCreators({
    addReservation: addReservation,
    getUserDetail: getUserDetail,
    editProfileWithDispatch: editProfile
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderFromServer);
