import axios from 'axios';


const API_URL = process.env.REACT_APP_API_URL;
export const GET_ONE_DELIVERY_INFO_BY_ORDER_NUM = 'GET_ONE_DELIVERY_INFO_BY_ORDER_NUM';
export const GET_ORDER_INFO_BY_USER_ID = 'GET_ORDER_INFO_BY_USER_ID';
export const ADD_DELIVERY_INFO = 'ADD_DELIVERY_INFO';
export const GET_ALL_DELIVERY_INFO = 'GET_ALL_DELIVERY_INFO';
export const CHANGE_DELIVERY_STAGE = 'CHANGE_DELIVERY_STAGE';
export const DELETE_ORDER = 'DELETE_ORDER';

const user = JSON.parse(localStorage.getItem('user'));

export function getAllDeliveryInfo() {
  let promise = axios.get(`${API_URL}/deliveryInfo`);
  return {
    type: GET_ALL_DELIVERY_INFO,
    payload: promise
  }
}

export function getOneDeliveryInfoByOrderNum(num) {
  let promise = axios.get(`${API_URL}/deliveryInfo/oneOrder/${num}`);
  return {
    type: GET_ONE_DELIVERY_INFO_BY_ORDER_NUM,
    payload: promise
  }
}

export function getDeliveryInfoByUserId() {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log("this one should be invoked once user switched");
  let promise = axios.get(`${API_URL}/deliveryInfo/${user.id}`);
  return {
    type: GET_ORDER_INFO_BY_USER_ID,
    payload: promise
  }
}

export function changeStage(deliverInfo, callback) {
  let promise = axios.put(`${API_URL}/deliveryInfo`, deliverInfo, {withCredentials: true})
    .then(res => {
      callback(res);
      return {
        deliverInfo: deliverInfo,
        success: res.data.success
      };
    });
  return {
    type: CHANGE_DELIVERY_STAGE,
    payload: promise
  };
}

export function addDeliveryInfo(deliveryInfo, callback) {
  const min = 10000000;
  const max = 19999999;
  const num = Math.floor(Math.random() * (max - min + 1)) + min;

  const info = {
    name: deliveryInfo.name,
    phone: deliveryInfo.phone,
    email: deliveryInfo.email,
    address1: deliveryInfo.address1,
    address2: deliveryInfo.address2,
    city: deliveryInfo.city,
    state: deliveryInfo.state,
    zip: deliveryInfo.zip,
    time: deliveryInfo.time,
    userId: user.id,
    orderNum: num,
    stage: 0,
    total: deliveryInfo.total,
  };

  // provide order info
  localStorage.setItem('info', JSON.stringify(info));

  let promise = axios.post(`${API_URL}/deliveryInfo`, info)
    .then(res => {
      callback(res);
      return {
        deliveryInfo: info,
        success: res.data.success
      }
    });
  return {
    type: ADD_DELIVERY_INFO,
    payload: promise
  }
}

export function deleteOrder(deletedOrder, callback) {
  let promise = axios.delete(`${API_URL}/deliveryInfo/${deletedOrder.id}`, deletedOrder, {withCredentials: true})
    .then(res => {
      callback(res);
      return {
        deletedOrder: deletedOrder,
        success: res.data.success
      };
    });
  return {
    type: DELETE_ORDER,
    payload: promise
  };
}
