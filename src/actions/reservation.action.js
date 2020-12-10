import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
export const ADD_RESERVATION = 'ADD_RESERVATION';
export const GET_ALL_RESERVATIONS = 'GET_ALL_RESERVATIONS';
export const DELETE_RESERVATION = 'DELETE_RESERVATION';
export const EDIT_RESERVATION = 'EDIT_RESERVATION';

export function getAllReservations() {
  let promise = axios.get(`${API_URL}/reservations`);
  return {
    type: GET_ALL_RESERVATIONS,
    payload: promise
  }
}

export function addReservation(reservation, callback) {
  let promise = axios.post(`${API_URL}/reservations`, reservation)
    .then(res => {
      callback(res);
      return {
        reservation: reservation,
        success: res.data.success
      }
    });
  return {
    type: ADD_RESERVATION,
    payload: promise
  }
}

export function editReservation(editReservation, callback) {
  console.log(editReservation);
  let promise = axios.put(`${API_URL}/reservations`, editReservation, {withCredentials: true})
    .then(res => {
      callback(res);
      return {
        editReservation: editReservation,
        success: res.data.success
      };
    });
  return {
    type: EDIT_RESERVATION,
    payload: promise
  };
}

export function deleteReservation(reservation, callback) {
  let promise = axios.delete(`${API_URL}/reservations/${reservation.id}`, reservation, {withCredentials: true})
    .then(res => {
      callback(res);
      return {
        reservation: reservation,
        success: res.data.success
      }
    });
  return {
    type: DELETE_RESERVATION,
    payload: promise
  }
}
