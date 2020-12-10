import React from "react";
import {login} from "../actions/auth.action";
import {connect} from "react-redux";
import {reduxForm} from "redux-form";
import {Link} from "react-router-dom";
import { Form, Input, Button, Checkbox } from 'antd';

class Login extends React.Component {

  onFinish = (user) => {
    this.props.login(user, (res) => {
      if (res.data.success) {
        this.props.history.push("/home");
      } else {
      }
    });
  };

    render() {
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
            <h1 align="center">Log In</h1>
            <Form
              {...layout}
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={this.onFinish.bind(this)}
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: 'Please input your username!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
            <p align="center">Don't have an account? <Link to="/signUp">sign up</Link> now!</p>
            </React.Fragment>
        );
    }

}

function mapStateToProps(store) {
    return {
        authUser: store.loggedIn
    };
}

export default connect(mapStateToProps, {login})(
    reduxForm({
        form: 'LoginForm'
    })(Login)
);
