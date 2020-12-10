import React from 'react'
import Styles from '../Styles'
import { Form, Field } from 'react-final-form'
import Card from '../Card'
import PaypalExpressBtn from 'react-paypal-express-checkout';
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate
} from '../cardUtils'
import {Button, Tabs} from "antd";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {addOrderInfo} from "../actions/orderInfo.action";


const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const onSubmit = async values => {
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2))
};

const App = () => (
  <Styles>
    <Form
      onSubmit={onSubmit}
      render={({
                 handleSubmit,
                 form,
                 submitting,
                 pristine,
                 values,
                 active
               }) => {
        return (
          <form onSubmit={handleSubmit}>
            <Card
              number={values.number || ''}
              name={values.name || ''}
              expiry={values.expiry || ''}
              cvc={values.cvc || ''}
              focused={active}
            />
            <div>
              <Field
                name="number"
                component="input"
                type="text"
                pattern="[\d| ]{16,22}"
                placeholder="Card Number"
                format={formatCreditCardNumber}
              />
            </div>
            <div>
              <Field
                name="name"
                component="input"
                type="text"
                placeholder="Name"
              />
            </div>
            <div>
              <Field
                name="expiry"
                component="input"
                type="text"
                pattern="\d\d/\d\d"
                placeholder="Valid Thru"
                format={formatExpirationDate}
              />
              <Field
                name="cvc"
                component="input"
                type="text"
                pattern="\d{3,4}"
                placeholder="CVC"
                format={formatCVC}
              />
            </div>
            <div className="buttons">
              <button type="submit" disabled={submitting}>
                Submit
              </button>
              <button
                type="button"
                onClick={form.reset}
                disabled={submitting || pristine}
              >
                Reset
              </button>
            </div>
          </form>
        )
      }}
    />
  </Styles>
);

const { TabPane } = Tabs;

const order = JSON.parse(localStorage.getItem('order'));
const info = JSON.parse(localStorage.getItem('info'));

class CheckOutPage extends React.Component {

  constructor(props) {
    super(props);
    this.handleTest = this.handleTest.bind(this);
  }

  handleTest() {
    for (let i in order) {
      order[i].orderNum = info.orderNum;
      this.props.addOrderInfo(order[i], (res) => {
        if (res.data && res.data.success) {
          this.props.history.push('/success-page');
        }
        else{
        }
      })
    }
  }

  render () {
    return (
      <div>
        <Tabs defaultActiveKey="1" size="large">
          <TabPane tab={"Credit Card"} key="1">
            <App />
          </TabPane>
          <TabPane tab="Paypal" key="2">
            <div align="center">
              <PaypalExpressBtn/>
            </div>
          </TabPane>
        </Tabs>
        <div align="center">
          <Button onClick={this.handleTest}>Test</Button>
        </div>
      </div>
    );
  }

}

function mapDispatchToProps(dispatch) {

  return bindActionCreators({
    addOrderInfo: addOrderInfo
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(CheckOutPage);
