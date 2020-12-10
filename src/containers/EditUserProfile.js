import React from 'react';
import {connect} from "react-redux";
import {editProfile, getUserDetail} from "../actions/userDetail.action";
import {Button, Form, Input} from 'antd';
import {bindActionCreators} from "redux";

const EDIT_USER_PROFILE_FROM_CONTROLS = [
  {name: 'id', type: 'number', label: 'ID'},
  {name: 'name', type: 'text', label: 'Name'},
  {name: 'phone', type: 'text', label: 'Phone'},
  {name: 'email', type: 'text', label: 'Email'},
  {name: 'address1', type: 'text', label: 'Address1'},
  {name: 'address2', type: 'text', label: 'Address2'},
  {name: 'city', type: 'text', label: 'City'},
  {name: 'state', type: 'text', label: 'State'},
  {name: 'zip', type: 'text', label: 'ZIP'},
];

class EditUserProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
    this.h2ElemRef = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getUserDetail();
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

  handleSubmit = (editProfileFormData) => {
    this.props.editProfileWithDispatch(editProfileFormData, (res) => {
      if (res.data && res.data.success) {
        window.location.reload(false);
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
        <h2 ref={this.h2ElemRef}>Edit Profile</h2>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 8 }}
          layout="horizontal"
          initialValues={this.props.userDetail}
          onFinish={this.handleSubmit}>
          {
            EDIT_USER_PROFILE_FROM_CONTROLS.map(field => this.renderField(field))
          }
          <Button type="primary" htmlType="submit" >Submit</Button>
          <p>{this.state.message}</p>
        </Form>
      </div>
    );
  }
}

function mapStateToProps({userDetail}) {
  return {
    userDetail,
    initialValues: userDetail
  }
}

function mapDispatchToProps(dispatch) {

  return bindActionCreators({
    getUserDetail: getUserDetail,
    editProfileWithDispatch: editProfile
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUserProfile);

