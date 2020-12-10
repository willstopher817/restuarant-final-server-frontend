import React from 'react';
import {connect} from "react-redux";
import {getUserDetail} from "../actions/userDetail.action";
import {Layout, Menu} from "antd";
import {Link} from "react-router-dom";
import ChangePassword from "../containers/ChangePassword";
import UserProfile from "./UserProfile";
import {Route, Switch} from "react-router";
import EditUserProfile from "../containers/EditUserProfile";

const { Content, Sider, Footer, Header } = Layout;

class UserDetail extends React.Component {

  constructor(props) {
    super(props);
    // this.state = {
    //   name: '',
    //   phone: '',
    //   email: '',
    //   address1: '',
    //   address2: '',
    //   city: '',
    //   state: '',
    //   zip: '',
    // }
  }

    componentDidMount() {
        this.props.getUserDetail();
    }

    render () {
      return (
        <React.Fragment>
          <Layout style={{ minHeight: '80vh' }}>
            <Sider theme="light">
              <Menu defaultSelectedKeys="/user-detail/myProfile" mode="inline">
                <Menu.Item key="/user-detail/myProfile">
                  <Link to={`/user-detail/user-profile/${this.props.user.id}`}>My Profile</Link>
                </Menu.Item>
                <Menu.Item key="user-detail/edit-user-profile">
                  <Link to={`/user-detail/edit-user-profile/${this.props.user.id}`}>
                    Edit Profile
                  </Link>
                </Menu.Item>
                <Menu.Item key="/user-detail/change-password">
                  <Link to="/user-detail/change-password">
                    Change Password
                  </Link>
                </Menu.Item>
                <Menu.Item key="4">Email and SMS</Menu.Item>
                <Menu.Item key="5">Privacy ad Security</Menu.Item>
              </Menu>
            </Sider>
            <Layout className="site-layout">
              <Content className="site-layout-background">
                <Switch>
                  <Route path={`/user-detail/user-profile/${this.props.user.id}`} component={UserProfile}/>
                  <Route path={`/user-detail/edit-user-profile/${this.props.user.id}`} component={EditUserProfile}/>
                  <Route path="/user-detail/change-password" component={ChangePassword}/>
                </Switch>
              </Content>
              <Footer style={{ textAlign: 'center' }}>Ant Design ©2020 Created by Wei Wang</Footer>
            </Layout>
          </Layout>
        </React.Fragment>

      );
    }

}

function mapStateToProps(store) {
    return {
        user: store.loggedIn,
        userDetail: store.userDetail
    };
}

export default connect(mapStateToProps, {
    getUserDetail: getUserDetail,
})(UserDetail);
