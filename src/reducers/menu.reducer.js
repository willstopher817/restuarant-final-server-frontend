import {ADD_FOOD, DELETE_FOOD, EDIT_FOOD, GET_FOOD} from "../actions/menu.action";

export default function menuReducer(oldState = [], action) {
    switch (action.type) {
        case GET_FOOD:
          return action.payload.data;     // get data from resolved promise
        case ADD_FOOD:
            if (action.payload.success) {
                const food = action.payload.food;
                return [...oldState, food];
            } else {
                return oldState;
            }
        case EDIT_FOOD:
            if (action.payload.success) {
                const food = action.payload.menu;
                const index = oldState.findIndex(f => f.id === food.id);
                oldState.splice(index, 1, food);
                return [...oldState, action.payload.menu]
            } else {
                return oldState;
            }
        case DELETE_FOOD:
            if (action.payload.success) {
                const food = action.payload.food;
                const index = oldState.findIndex(f => f.id === food.id);
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
