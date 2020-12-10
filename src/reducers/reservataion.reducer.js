import {ADD_RESERVATION, DELETE_RESERVATION, GET_ALL_RESERVATIONS, EDIT_RESERVATION} from "../actions/reservation.action";

export default function reservationReducer(oldState = [], action) {
  switch (action.type) {
    case GET_ALL_RESERVATIONS:
      return action.payload.data;     // get data from resolved promise
    case ADD_RESERVATION:
      if (action.payload.success) {
        const reservation = action.payload.reservation;
        return [...oldState, reservation];
      } else {
        return oldState;
      }
    case EDIT_RESERVATION:
      if (action.payload.success) {
        const reservation = action.payload.editReservation;
        const index = oldState.findIndex(r => r.id === reservation.id);
        oldState.splice(index, 1, reservation);
        return [...oldState, action.payload.editReservation]
      } else {
        return oldState;
      }
    case DELETE_RESERVATION:
      if (action.payload.success) {
        const reservation = action.payload.reservation;
        const index = oldState.findIndex(r => r.id === reservation.id);
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
