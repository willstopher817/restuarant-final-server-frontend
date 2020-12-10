import React from 'react';
import {connect} from "react-redux";
import {getMenu} from "../actions/menu.action";
import {Button, Card, Col, Modal, Rate, Row, Select} from "antd";
import {StarOutlined, ShoppingCartOutlined} from '@ant-design/icons'
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
import {addToCart} from "../actions/cart.action";

const { Option } = Select;

class Menu extends React.Component{

  constructor(props) {
    super(props);
    this.handlePopupClick = this.handlePopupClick.bind(this);
    this.handleSelectClick = this.handleSelectClick.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleAlertClick = this.handleAlertClick.bind(this);
  }

  state = {
    amount: 0,
    food: '',
    visible: false,
    order: [{
      userId: 0,
      foodId: 0,
      qty: 0,
      foodName: '',
      img: ''
    }]
  };

  componentDidMount() {
    this.props.getMenu();
  }

  handleOk = e => {
    this.setState({
      visible: false,
    });
    const oldOrder = JSON.parse(localStorage.getItem('order')) || [];
    const index = oldOrder.findIndex(id => id.foodId === this.state.order.foodId);
    if (index >= 0) {
        oldOrder.splice(index, 1, this.state.order);
      } else {
        oldOrder.push(this.state.order);
    }
    localStorage.setItem('order', JSON.stringify(oldOrder));
    // this.props.addToCart(this.state.order, (res) => {
    //   if (res.data && res.data.success) {
    //     this.props.history.push('/menu');
    //   } else {
    //   }
    // })
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  handlePopupClick(e) {
    this.setState({
      food: JSON.parse(e.target.value),
      visible: true,
    });
  }

  handleAlertClick() {
    alert("Please log in to use cart!")
  }

  handleSelectClick(e) {
    this.setState({
      amount: e,
    });
    this.setState({
      order: {
        userId: this.props.user.id,
        foodId: this.state.food.id,
        qty: parseInt(e),
        foodName: this.state.food.name,
        price: this.state.food.price,
        img: this.state.food.image
      }
    })
  }

  handleClick() {
  }

    render () {
        return (
          <React.Fragment>
            <Modal
              title="Select Amount"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              <Row>
                <Col span={18} push={2}>
                  <h3>{this.state.food.name}</h3>
                  <p>$ {this.state.food.price}.00</p>

                  <Select
                    defaultValue="0" style={{ width: 120 }}
                    onSelect={this.handleSelectClick}>
                    <Option value="1">1</Option>
                    <Option value="2">2</Option>
                    <Option value="3">3</Option>
                    <Option value="4">4</Option>
                    <Option value="5">5</Option>
                    <Option value="6">6</Option>
                    <Option value="7">7</Option>
                    <Option value="8">8</Option>
                    <Option value="9">9</Option>
                    <Option value="10">10</Option>
                  </Select>
                </Col>
                <Col span={6} pull={2}>
                  <p>Total: $ {this.state.food.price * this.state.amount}</p>
                </Col>
              </Row>
            </Modal>

            <h1>Appetizers</h1>
            <Row gutter={[16, 24]}>
              {
                this.props.menu && this.props.menu
                  .filter (p => {
                    return p.category === 'Appetizer'
                  })
                  .map(p => {
                    return(
                      <Col span={8} key={p.id}>
                        <Card
                          title={p.name}
                          style={{ width: 300 }}
                          hoverable="true"
                          cover={
                            <img src={p.image} alt=""/>
                          }
                          actions={[
                            <Button shape="circle" size="large">
                            <StarOutlined />
                            </Button>,
                            <div>
                              {
                                this.props.user
                                ? <Button
                                  value={JSON.stringify(p)}
                                  onClick={this.handlePopupClick}
                                  shape="circle"
                                  size="large"
                                >
                                  <ShoppingCartOutlined />
                                  </Button>
                                  :<Button
                                    onClick={this.handleAlertClick}
                                    shape="circle"
                                    size="large"
                                  >
                                    <ShoppingCartOutlined />
                                  </Button>
                              }
                            </div>,
                            <Button shape="circle" size="large" onClick={this.handleClick}>
                              <PlusOutlined />
                            </Button>
                          ]}
                        >
                          <h2>$ {p.price}</h2>
                          <Rate allowHalf/>
                        </Card>
                      </Col>
                    )
                  })
              }
            </Row>

            <h1>Entrees</h1>
            <Row gutter={[16, 24]}>
              {
                this.props.menu && this.props.menu
                  .filter (p => {
                    return p.category === 'Entree'
                  })
                  .map(p => {
                    return(
                      <Col span={8} key={p.id}>
                        <Card
                          title={p.name}
                          style={{ width: 300 }}
                          hoverable="true"
                          cover={
                            <img src={p.image} alt=""/>
                          }
                          actions={[
                            <Button shape="circle" size="large">
                              <StarOutlined />
                            </Button>,
                            <Button
                              value={JSON.stringify(p)}
                              onClick={this.handlePopupClick}
                              shape="circle"
                              size="large"
                            >
                              <ShoppingCartOutlined />
                            </Button>,
                            <Button shape="circle" size="large">
                              <PlusOutlined />
                            </Button>
                          ]}
                        >
                          <h2>$ {p.price}</h2>
                          <Rate allowHalf/>
                        </Card>
                      </Col>
                    )
                  })
              }
            </Row>

            <h1>Drinks</h1>
            <Row gutter={[16, 24]}>
              {
                this.props.menu && this.props.menu
                  .filter (p => {
                    return p.category === 'Drinks'
                  })
                  .map(p => {
                    return(
                      <Col span={8} key={p.id}>
                        <Card
                          title={p.name}
                          style={{ width: 300 }}
                          hoverable="true"
                          cover={
                            <img src={p.image} alt=""/>
                          }
                          actions={[
                            <Button shape="circle" size="large">
                              <StarOutlined />
                            </Button>,
                            <Button shape="circle" size="large">
                              <PlusOutlined />
                            </Button>
                          ]}
                        >
                          <h2>$ {p.price}</h2>
                          <Rate allowHalf/>
                        </Card>
                      </Col>
                    )
                  })
              }
            </Row>
          </React.Fragment>
        );
    }

}

function mapStateToProps(store) {
    return {
      user: store.loggedIn,
      menu: store.menu,
    };
}

export default connect(mapStateToProps, {
  addToCart: addToCart,
  getMenu: getMenu,
})(Menu);
