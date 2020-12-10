import {ADD_USER, CHANGE_PASSWORD, GET_USER, TOGGLE_DISABLE} from "../actions/user.action";

export default function usersReducer(oldUserState = [], action) {
    switch (action.type) {
        case GET_USER:
            return action.payload.data;
        case ADD_USER:
            if (action.payload.success) {
                return [...oldUserState, action.payload.user];
            } else {
                return oldUserState;
            }
      case TOGGLE_DISABLE:
        if (action.payload.success) {
          const user = action.payload.toggledUser;
          const index = oldUserState.findIndex(u => u.id === user.id);
          oldUserState.splice(index, 1, user);
          return oldUserState;
        } else {
          return oldUserState;
        }
        case CHANGE_PASSWORD:
            if (action.payload.success) {
                return [...oldUserState, action.payload.password];
            } else {
              return oldUserState;
            }
        default:
            return oldUserState;
    }
}
