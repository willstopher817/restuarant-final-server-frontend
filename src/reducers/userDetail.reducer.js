import {EDIT_USER_DETAIL, GET_USER_DETAIL} from "../actions/userDetail.action";


export default function userDetailReducer(oldState = null, action) {
    switch (action.type) {
        case GET_USER_DETAIL:
            return action.payload.data;     // get data from resolved promise
        // case ADD_FOOD:
        //     if (action.payload.success) {
        //         const food = action.payload.food;
        //         return [...oldState, food];
        //     } else {
        //         return oldState;
        //     }
        case EDIT_USER_DETAIL:
            if (action.payload.success) {
                return action.payload.editProfile;
            } else {
                return oldState;
            }
        // case DELETE_FOOD:
        //     if (action.payload.success) {
        //         const food = action.payload.food;
        //         const index = oldState.findIndex(f => f.id === food.id);
        //         const newState = [...oldState];
        //         newState.splice(index, 1);
        //         return newState;
        //     } else {
        //         return oldState;
        //     }
        default:
            return oldState;
    }
}
