import {
  ADD_DELIVERY_INFO,
  CHANGE_DELIVERY_STAGE, DELETE_ORDER,
  GET_ALL_DELIVERY_INFO,
  GET_ONE_DELIVERY_INFO_BY_ORDER_NUM,
  GET_ORDER_INFO_BY_USER_ID
} from "../actions/deliveryInfo.action";

export default function deliveryInfoReducer(oldState = [], action) {
  switch (action.type) {
    case GET_ALL_DELIVERY_INFO:
      return action.payload.data;
    case GET_ORDER_INFO_BY_USER_ID:
      console.log(action.payload.data);
      return action.payload.data;
    case GET_ONE_DELIVERY_INFO_BY_ORDER_NUM:
      return action.payload.data;     // get data from resolved promise
    case CHANGE_DELIVERY_STAGE:
      const user = action.payload.deliverInfo;
      const index = oldState.findIndex(u => u.id === user.id);
      oldState.splice(index, 1, user);
      return oldState;
    case ADD_DELIVERY_INFO:
      if (action.payload.success) {
        const deliveryInfo = action.payload.deliveryInfo;
        return [...oldState, deliveryInfo];
      } else {
        return oldState;
      }
    case DELETE_ORDER:
      if (action.payload.success) {
        const order = action.payload.deletedOrder;
        const index = oldState.findIndex(o => o.id === order.id);
        const newState = [...oldState];
        newState.splice(index, 1);
        return newState;
      } else {
        return oldState;
      }
    default:
      return oldState;
  }
}
