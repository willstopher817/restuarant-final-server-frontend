import React from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {Avatar, Carousel, Col, Divider, Input, Row} from "antd";


class Home extends React.Component {

  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(e) {
    this.props.history.push(`/kitchen-status/${e}`);
  }

  render() {
    const { Search } = Input;
        return (
          <div>
            {
                this.props.authUser
                ? <div align="center">
                    <h1>Welcome, {this.props.authUser.username}</h1>
                    <p>Your role is: {this.props.authUser.profiles[0].type}</p>
                </div>
                : <h1 align="center">Please <Link to="/login">Log In.</Link></h1>
            }

            {
              this.props.authUser && this.props.authUser.profiles[0].type === 'ROLE_SERVER'
                ?<div align="center">
                  <h1 align="center"><Link to="/order-from-server">Get Started!.</Link></h1>
                </div>
              : null
            }


            <Row>
              <Col span={8} offset={16}>
                <h3 align="center">Order Quick Tracker</h3>
                <Search
                  placeholder="input your order#"
                  enterButton="Search"
                  onSearch={this.handleSearch}
                /></Col>
            </Row>


            <Divider/>
            <Carousel autoplay effect="fade">
              <Avatar shape="square" size={640} src="https://msi-final-client-willstopher-static.s3.us-east-2.amazonaws.com/appetizers/dumpling.jpg" />
              <Avatar shape="square" size={640} src="https://msi-final-client-willstopher-static.s3.us-east-2.amazonaws.com/entrees/orange_chicken.jpg" />
              <Avatar shape="square" size={640} src="https://msi-final-client-willstopher-static.s3.us-east-2.amazonaws.com/drinks/Margarita.jpg" />
            </Carousel>

          </div>
        );

    }
}

function mapStateProps(store) {
    return{
        authUser: store.loggedIn
    };
}

export default connect(mapStateProps)(Home);
