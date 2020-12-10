import React from 'react';
import {Button, Form, Input} from "antd";
import {connect} from "react-redux";
// import {getUserDetail} from "../actions/userDetail.action";
import {changePassword} from "../actions/user.action";


class ChangePassword extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    console.log(this.props.user);
  }



  handleSubmit = (newPassword) => {
    this.props.changePassword(newPassword, (res) => {
      if (res.data && res.data.success) {
        this.setState({
          message: 'Change is saved'
        });
      } else {
        this.setState({
          message: 'Change is not saved'
        });
      }
    });
  };

  render () {
    return (
      <div className="container">
        <h2>Change Password</h2>
        <Form
          labelCol={{ span: 4}}
          wrapperCol={{ span: 8 }}
          layout="horizontal"
          onFinish={this.handleSubmit}
        >
          <Form.Item
            label="Old Password"
            name="oldPassword"
            >
            <Input.Password/>
          </Form.Item>

          <Form.Item
            label="New Password"
            name="newPassword"
          >
            <Input.Password/>
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
          >
            <Input.Password/>
          </Form.Item>
          <Button type="primary" htmlType="submit" >Submit</Button>
          <p>{this.state.message}</p>
        </Form>
      </div>
    );
  }

}

function mapStateToProps(store) {
  return {
    user: store.loggedIn,
  };
}

export default connect(mapStateToProps, {
  changePassword: changePassword
})(ChangePassword);

