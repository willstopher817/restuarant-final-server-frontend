import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL;

export const GET_CART = 'GET_CART';
export const ADD_TO_CART = 'ADD_TO_CART';
export const GET_ONE_ORDER = 'GET_ONE_ORDER';


export function getCart() {
  // const user = JSON.parse(localStorage.getItem('user'));
  let promise = axios.get(`${API_URL}/orders`, {withCredentials: true});
  return {
    type: GET_CART,
    payload: promise
  };
}

// export function getOneOrder(id) {
//   let promise = axios.get(`${API_URL}/orders/${id}`, {withCredentials: true});
//   return{
//     type: GET_ONE_ORDER,
//     payload: promise
//   }
// }

export function addToCart(purchase, callback) {
  const purchaseToBackend = {
    id: null,
    qty: purchase.qty,
    orderId: null,
    menuId: purchase.foodId
  };
  let promise = axios.post(`${API_URL}/purchases`, purchaseToBackend, {withCredentials: true})
    .then(res => {
      callback(res);
      return {
        order: purchaseToBackend,
        success: res.data.success
      };
    });
  return {
    type: ADD_TO_CART,
    payload: promise
  }
}
