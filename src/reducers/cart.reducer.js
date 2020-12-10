import {ADD_TO_CART, GET_CART} from "../actions/cart.action";

export default function cartReducer(oldState = [], action) {
  switch (action.type) {
    case GET_CART:
      return action.payload.data;     // get data from resolved promise
    // case GET_ONE_ORDER:
    //   console.log(action.payload.data);
    //     return [action.payload.data];
    case ADD_TO_CART:
      if (action.payload.success) {
        return [...oldState, action.payload.order];
      } else {
        return oldState;
      }
    // case ADD_CART:
    //   if (action.payload.success) {
    //     const cart = action.payload.cart;
    //     return [...oldState, cart];
    //   } else {
    //     return oldState;
    //   }
    // case EDIT_CART:
    //   if (action.payload.success) {
    //     const cart = action.payload.menu;
    //     const index = oldState.findIndex(c => c.id === cart.id);
    //     oldState.splice(index, 1, cart);
    //     return [...oldState, action.payload]
    //   } else {
    //     return oldState;
    //   }
    // case DELETE_CART:
    //   if (action.payload.success) {
    //     const cart = action.payload.cart;
    //     const index = oldState.findIndex(c => c.id === cart.id);
    //     const newState = [...oldState];
    //     newState.splice(index, 1);
    //     return newState;
    //   } else {
    //     return oldState;
    //   }
    default:
      return oldState;
  }
}
