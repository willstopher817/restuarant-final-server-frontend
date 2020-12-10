import {Avatar, Badge, Descriptions} from "antd";
import React from "react";
import {connect} from "react-redux";



class UserProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      email: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
    }
  }

  componentDidMount() {
      this.setState({
        name: this.props.user.userDetail.name,
        phone: this.props.user.userDetail.phone,
        email: this.props.user.userDetail.email,
        address1: this.props.user.userDetail.address1,
        address2: this.props.user.userDetail.address2,
        city: this.props.user.userDetail.city,
        state: this.props.user.userDetail.state,
        zip: this.props.user.userDetail.zip,
      })
  }
  render () {
    return (
      <React.Fragment>
        <div className="container">
          <h2>My Profile</h2>
          <div>
            <button>
              <Avatar size={128} src="https://msi-final-client-willstopher-static.s3.us-east-2.amazonaws.com/icons/1588742220(1).jpg" />
            </button>
          </div>
          <Descriptions layout="vertical" bordered>
          <Descriptions.Item label="Name" span={1}>{this.state.name}</Descriptions.Item>
          <Descriptions.Item label="Phone" span={1}>{this.state.phone}</Descriptions.Item>
          <Descriptions.Item label="Email" span={1}>{this.state.email}</Descriptions.Item>
          <Descriptions.Item label="Address1" span={3}>
            {this.state.address1}
          </Descriptions.Item>
          <Descriptions.Item label="Address2" span={3}>
            {this.state.address2}
          </Descriptions.Item>
          <Descriptions.Item label="City" span={1}>{this.state.city}</Descriptions.Item>
          <Descriptions.Item label="State" span={1}>{this.state.state}</Descriptions.Item>
          <Descriptions.Item label="Zip" span={1}>{this.state.zip}</Descriptions.Item>
          <Descriptions.Item label="Status" span={3}>
          <Badge status="processing" text="Online" />
          </Descriptions.Item>
          </Descriptions>
        </div>
      </React.Fragment>
        );}
}

function mapStateToProps(store) {
  return {
    user: store.loggedIn,
  };
}

export default connect(mapStateToProps)(UserProfile);
