import React from "react";
import {connect} from "react-redux";
import {Field, reduxForm} from "redux-form";
import {Button} from "antd";
import {editReservation, getAllReservations} from "../actions/reservation.action";

class EditReservation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
    this.h2ElemRef = React.createRef();
  }

  componentDidMount() {
    if (!this.props.reservations) {
      this.props.getAllReservations();
    }
    console.log(this.props.reservations);
  }

  renderField(field) {
    return (
      <div className="form-group">
        <label align="left">
          {field.label}
          <input
            type={field.type}
            className="form-control"
            name={field.input.name}
            disabled={field.input.name === 'id'}
            {...field.input}
          />
        </label>
        <p className="text-danger">{field.meta.error}</p>
      </div>
    );
  }

  onSubmit = (editMenuFormData) => {
    this.props.editReservation(editMenuFormData, (res) => {
      if (res.data && res.data.success) {
        this.props.history.push('/reservations');
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
      <div align="center" className="container">
        <h2 ref={this.h2ElemRef}>Edit Reservation</h2>
        {/*<p>URL id: {this.props.match.params.id}</p>*/}
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Field
            name="id"
            label="ID"
            type="number"
            component={this.renderField}
          />
          <Field
            name="name"
            label="Name"
            type="text"
            component={this.renderField}
          />
          <Field
            name="phone"
            label="Phone"
            type="text"
            component={this.renderField}
          />
          <Field
            name="people"
            label="People"
            type="number"
            component={this.renderField}
          />
          <Field
            name="time"
            label="Time"
            type="text"
            component={this.renderField}
          />
          <Field
            name="spot"
            label="Table"
            type="text"
            component={this.renderField}
          />
          <Button type="primary" htmlType="submit" >Submit</Button>
          <p>{this.state.message}</p>
        </form>
      </div>
    );
  }
}

function mapStateToProps({reservations}, componentProps) {
  const orderId = window.location.pathname.match(/\/([^/]*)$/)[1];
  const re = reservations ? reservations.find(r => {
    return r.id === orderId;
  }) : null;
  return {
    reservations,
    initialValues: re
  };
}

export default connect(mapStateToProps, {getAllReservations, editReservation})(
  reduxForm({
    form: 'editReservationForm',
  })(EditReservation)
)

