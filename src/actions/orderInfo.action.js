import axios from 'axios';


const API_URL = process.env.REACT_APP_API_URL;
export const ADD_ORDER_INFO = 'ADD_ORDER_INFO';
export const GET_ORDER_INFO = 'GET_ORDER_INFO';

const user = JSON.parse(localStorage.getItem('user'));

export function getOrderInfoByOrderNum(orderNum) {
  let promise = axios.get(`${API_URL}/orderInfo/${orderNum}`);
  return {
    type: GET_ORDER_INFO,
    payload: promise
  }
}

export function addOrderInfo(orderInfo, callback) {
  let promise = axios.post(`${API_URL}/orderInfo`, orderInfo)
    .then(res => {
      callback(res);
      return {
        orderInfo: orderInfo,
        success: res.data.success
      }
    });
  return {
    type: ADD_ORDER_INFO,
    payload: promise
  }
}

