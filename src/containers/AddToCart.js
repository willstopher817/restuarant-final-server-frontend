import React from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Menu from "../components/Menu";

class AddToCart extends React.Component {

  render () {
    return (

      <div>

      </div>

    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({

  }, dispatch);

}

export default connect(null, mapDispatchToProps)(AddToCart);
