import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL;

export const GET_USER_DETAIL = 'GET_USER_DETAIL';
export const EDIT_USER_DETAIL = 'EDIT_USER_DETAIL';

export function getUserDetail() {
    const user = JSON.parse(localStorage.getItem('user'));
    let promise = axios.get(`${API_URL}/user-profile/${user.userDetail.id}`, {withCredentials: true});
    return {
        type: GET_USER_DETAIL,
        payload: promise
    }
}

// export function addUserActionCreator(user, callback) {
//     let promise = axios.post(`${API_URL}/users`, user)
//         .then(res => {
//             callback(res);
//             console.log(res.data);
//             return {
//                 user: user,
//                 success: res.data.success
//             };
//         });
//     return {
//         type: 'ADD_USER',
//         payload: promise
//     };
// }

export function editProfile(editProfile, callback) {
  const user = JSON.parse(localStorage.getItem('user'));
  user.userDetail = editProfile;
  localStorage.setItem('user', JSON.stringify(user));
  let promise = axios.put(`${API_URL}/user-profile/${user.userDetail.id}`, editProfile, {withCredentials: true})
    .then(res => {
      callback(res);
      return {
        editProfile: editProfile,
        success: res.data.success
      };
    });
  return {
    type: EDIT_USER_DETAIL,
    payload: promise
  };
}
