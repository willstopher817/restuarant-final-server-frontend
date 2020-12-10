import React, {Component} from 'react';
import {logout} from '../actions/auth.action';
import {connect} from 'react-redux';
import {Button} from "antd";

class Logout extends Component {

    handleLogout = () => {
        this.props.logout((res) => {
            if (res.data && res.data.success) {
                this.props.history.push('/home');
            }
        });
    };

    render() {
        return (
            <React.Fragment>
                <div align="center" className="container">
                    <h2>Logout</h2>
                    <Button type="danger" onClick={this.handleLogout}>Click to Logout</Button>
                </div>
            </React.Fragment>
        );
    }

}
export default connect(null, {logout})(Logout);
