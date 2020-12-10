import {ADD_ORDER_INFO, GET_ORDER_INFO} from "../actions/orderInfo.action";

export default function orderInfoReducer(oldState = [], action) {
  switch (action.type) {
    case GET_ORDER_INFO:
      return action.payload.data;     // get data from resolved promise
    case ADD_ORDER_INFO:
      if (action.payload.success) {
        const orderInfo = action.payload.orderInfo;
        return [...oldState, orderInfo];
      } else {
        return oldState;
      }
    default:
      return oldState;
  }
}
