import {LOGIN, LOGOUT} from '../actions/auth.action';

export default function (state = null, action) {
    let res;
    switch (action.type) {
        case LOGIN:
          res = action.payload ? action.payload.data : null;
            if (res && res.success) {
                return res.user;
            } else {
                return state;
            }
        case LOGOUT:
            res = action.payload.data;
            if (res.success) {
                return null;
            } else {
                return state;
            }
        default:
            return state;
    }
}
