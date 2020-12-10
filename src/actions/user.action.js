import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL;

export const GET_USER = 'GET_USER';
export const ADD_USER = 'ADD_USER';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const TOGGLE_DISABLE = 'TOGGLE_DISABLE';

export function getUser() {
    let promise = axios.get(`${API_URL}/users`,{withCredentials: true});
    return {
        type: GET_USER,
        payload: promise
    }
}

export function addUserActionCreator(user, callback) {
    let promise = axios.post(`${API_URL}/users`, user)
        .then(res => {
            callback(res);
            return {
                user: user,
                success: res.data.success
            };
        });
    return {
        type: ADD_USER,
        payload: promise
    };
}

export function toggleDisable(toggledUser, callback) {
  if (toggledUser.disable === "N") {
    toggledUser.disable = "Y";
  } else {
    toggledUser.disable = "N"
  }
  console.log(toggledUser);
  let promise = axios.put(`${API_URL}/users`, toggledUser, {withCredentials: true})
    .then(res => {
      callback(res);
      return {
        toggledUser: toggledUser,
        success: res.data.success
      };
    });
  return {
    type: TOGGLE_DISABLE,
    payload: promise
  };
}

export function changePassword(password, callback) {
  const user = JSON.parse(localStorage.getItem('user'));
  const passwordHolder = {
    id: user.id,
    oldPassword: password.oldPassword,
    newPassword: password.newPassword
  };
  console.log(passwordHolder);
  let promise = axios.put(`${API_URL}/users/${user.id}`, passwordHolder, {withCredentials: true})
    .then(res => {
      callback(res);
      return {
        password: password,
        success: res.data.success
      };
    });
  return {
    type: CHANGE_PASSWORD,
    payload: promise
  };
}
