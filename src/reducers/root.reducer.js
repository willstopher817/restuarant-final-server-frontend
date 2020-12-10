import {combineReducers} from 'redux';
import {reducer as FormReducer} from 'redux-form';
import AuthReducer from './auth.reducer';
import menuReducer from './menu.reducer'
import usersReducer from "./user.reducer";
import userDetailReducer from "./userDetail.reducer";
import cartReducer from "./cart.reducer";
import deliveryInfoReducer from "./deliveryInfo.reducer";
import orderInfoReducer from "./orderInfo.reducer";
import reservationReducer from "./reservataion.reducer";


const rootReducer = combineReducers({
    form: FormReducer,
    cart: cartReducer,
    menu: menuReducer,
    products: menuReducer,
    roles: usersReducer,
    loggedIn: AuthReducer,
    userDetail: userDetailReducer,
    deliveryInfo: deliveryInfoReducer,
    orderInfo: orderInfoReducer,
    reservations: reservationReducer
});
export default rootReducer;
