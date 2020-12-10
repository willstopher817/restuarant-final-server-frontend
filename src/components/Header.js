import React from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {Avatar, Menu} from "antd";
import HomeOutlined from "@ant-design/icons/lib/icons/HomeOutlined";
import MenuUnfoldOutlined from "@ant-design/icons/lib/icons/MenuUnfoldOutlined";
import LogoutOutlined from "@ant-design/icons/lib/icons/LogoutOutlined";
import LoginOutlined from "@ant-design/icons/lib/icons/LoginOutlined";
import EditOutlined from "@ant-design/icons/lib/icons/EditOutlined";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import AuditOutlined from "@ant-design/icons/lib/icons/AuditOutlined";
import ShoppingCartOutlined from "@ant-design/icons/lib/icons/ShoppingCartOutlined";
import UnorderedListOutlined from "@ant-design/icons/lib/icons/UnorderedListOutlined";
import {getCart} from "../actions/cart.action";
import CheckOutlined from "@ant-design/icons/lib/icons/CheckOutlined";
import QuestionCircleOutlined from "@ant-design/icons/lib/icons/QuestionCircleOutlined";
import CalendarOutlined from "@ant-design/icons/lib/icons/CalendarOutlined";
import SnippetsOutlined from "@ant-design/icons/lib/icons/SnippetsOutlined";

const {SubMenu} = Menu;

class Header extends React.Component{

  render() {
        return(
            <React.Fragment>
              <Menu mode="horizontal" theme="light">
                <Menu.Item key="home">
                  <HomeOutlined />
                  Home
                  <Link to="/home"/>
                </Menu.Item>
                <Menu.Item key="menu">
                  <MenuUnfoldOutlined />
                  Menu
                  <Link to="/menu"/>
                </Menu.Item>
                <Menu.Item style={{float: 'right'}}>
                  <QuestionCircleOutlined />
                  Help
                </Menu.Item>
                <Menu.Item>
                  Test
                  <Link to="/test"/>
                </Menu.Item>

                {
                  this.props.authUser
                    ? <Menu.Item style={{float: 'right'}}>
                      <Avatar src="https://msi-final-client-willstopher-static.s3.us-east-2.amazonaws.com/icons/1588742220(1).jpg" />
                      <LogoutOutlined />
                      Logout
                      <Link to="/logout"/>
                    </Menu.Item>
                    : <Menu.Item style={{float: 'right'}}>
                      <LoginOutlined />
                      Login
                      <Link to="/login"/>
                    </Menu.Item>
                }

                {
                  this.props.authUser
                    ? this.props.authUser.profiles[0].type === 'ROLE_ADMIN'
                      ? <SubMenu title="Edit Panel" icon={<EditOutlined />}>
                          <Menu.ItemGroup>
                            <Menu.Item>
                              <MenuUnfoldOutlined />
                              Menu
                              <Link to="/foods"/>
                            </Menu.Item>
                            <Menu.Item key="orders">
                              <UnorderedListOutlined />
                              Orders
                              <Link to="/orders"/>
                            </Menu.Item>
                            <Menu.Item key="users">
                              <AuditOutlined />
                              Users
                              <Link to="/users"/>
                            </Menu.Item>
                            <Menu.Item key="reservations">
                              <CalendarOutlined />
                              Reservations
                              <Link to="/reservations"/>
                            </Menu.Item>
                          </Menu.ItemGroup>
                        </SubMenu>
                      : <div/>
                      ? this.props.authUser.profiles[0].type === 'ROLE_USER'
                        ? <Menu.Item>
                            <Link to={`/user-detail/user-profile/${this.props.authUser.id}`}>
                              <UserOutlined />
                              My Profile
                            </Link>
                          </Menu.Item>
                        : null
                      : null
                    : null
                }

                {
                  this.props.authUser && this.props.authUser.profiles[0].type === 'ROLE_SERVER'
                    ? <Menu.Item key="order-from-server">
                      <SnippetsOutlined />
                        Take Order
                        <Link to='/order-from-server'/>
                      </Menu.Item>
                    : null
                }

                {
                  this.props.authUser && this.props.authUser.profiles[0].type === 'ROLE_USER'
                    ?<Menu.Item key="cart">
                      <ShoppingCartOutlined />
                      Cart
                      {
                        this.props.authUser
                          ? <a href={`/cart`}/>
                          : <Link to="/home"/>
                      }
                    </Menu.Item>
                    : null
                }
                {
                  this.props.authUser && this.props.authUser.profiles[0].type === 'ROLE_USER'
                    ?<Menu.Item key="myOrder">
                      <CheckOutlined />
                      My Order
                      {
                        this.props.authUser
                          ? <Link to={`/my-order-display`}/>
                          : <Link to="/home"/>
                      }
                    </Menu.Item>
                    : null
                }
                {
                  this.props.authUser && this.props.authUser.profiles[0].type === 'ROLE_DRIVER'
                    ? <Menu.Item key="delivery-orders">
                      Orders
                      <Link to='/delivery-orders'/>
                    </Menu.Item>
                    : null
                }
              </Menu>
            </React.Fragment>
        );
    }
}

function mapStateProps(store) {
    return{
      cart: store.cart,
      userDetail: store.userDetail,
      authUser: store.loggedIn
    };
}

export default connect(mapStateProps, {getCart})(Header);
