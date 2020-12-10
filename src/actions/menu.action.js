import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const ADD_FOOD = 'ADD_FOOD';
export const GET_FOOD = 'GET_FOOD';
export const EDIT_FOOD = 'EDIT_FOOD';
export const DELETE_FOOD = 'DELETE_FOOD';


// send AJAX request to server and get products as payload
export function getMenu() {
    let promise = axios.get(`${API_URL}/menu`);
    return {
        type: GET_FOOD,
        payload: promise
    }
}

export function addFoodActionCreator(food, callback) {
    let promise = axios.post(`${API_URL}/menu`, food)
        .then(res => {
            callback(res);
            return {
                food: food,
                success: res.data.success
            };
        });
    return {
        type: ADD_FOOD,
        payload: promise
    };
}

export function editMenu(editMenu, callback) {
  console.log(editMenu);
    let promise = axios.put(`${API_URL}/menu`, editMenu, {withCredentials: true})
        .then(res => {
            callback(res);
            return {
                menu: editMenu,
                success: res.data.success
            };
        });
    return {
        type: EDIT_FOOD,
        payload: promise
    };
}

export function deleteFoodFromMenu(deleteFood, callback) {
    let promise = axios.delete(`${API_URL}/menu/${deleteFood.id}`, deleteFood, {withCredentials: true})
        .then(res => {
            callback(res);
            return {
                food: deleteFood,
                success: res.data.success
            };
        });
    return {
        type: DELETE_FOOD,
        payload: promise
    };
}
