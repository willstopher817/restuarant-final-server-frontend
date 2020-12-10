import React from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {addUserActionCreator} from "../actions/user.action";
import {Button, Form, Input} from "antd";

class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(newUser) {
        this.props.addUserActionCreatorWithDispatch(newUser, (res) => {
            if (res.data && res.data.success) {
                this.props.history.push('/home');
            } else {
            }
        });
    }

  render () {
    const layout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 8,
      },
    };
    const tailLayout = {
      wrapperCol: {
        offset: 8,
        span: 8,
      },
    };
    return (
      <React.Fragment>
        <h1 align="center">Sign Up</h1>
        <Form
          {...layout}
          onFinish={this.handleSubmit}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true }]}
          >
            <Input/>
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true }]}
          >
            <Input.Password/>
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true }]}
          >
            <Input/>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </React.Fragment>
    );
  }

}


function mapDispatchToProps(dispatch) {

    return bindActionCreators({
        addUserActionCreatorWithDispatch: addUserActionCreator
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(SignUp);


