import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import ReduxPromise from 'redux-promise';
import rootReducer from "./reducers/root.reducer";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import {Route, Switch} from "react-router";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Home from "./components/Home";
import AddFood from "./containers/AddFood";
import {BrowserRouter} from "react-router-dom";
import Menu from "./components/Menu";
import SignUp from "./containers/SignUp";
import Foods from "./components/Foods";
import EditFood from "./containers/EditFood";
import UserDetail from "./components/UserDetail";
import UserProfile from "./components/UserProfile";
import Cart from "./components/Cart";
import authAdmin from "./components/authAdmin.hoc";
import authUser from "./components/authUser.hoc";
import Users from "./components/Users";
import Orders from "./components/Orders";
import OrderFromServer from "./containers/OrderFromServer";
import authServer from "./components/authServer";
import OrderFromServerMenu from "./containers/OrderFromServerMenu";
import MyOrderDisplay from "./components/MyOrderDisplay";
import SuccessPage from "./components/SuccessPage";
import KitchenStatus from "./components/KitchenStatus";
import CheckOutPage from "./containers/CheckOutPage";
import Reservations from "./components/Reservations";
import authDriver from "./components/authDriver";
import DeliveryOrders from "./components/DeliveryOrders";
import DriverMap from "./components/DriverMap";
import Test from "./components/Test";
import ReservationSuccessPage from "./components/ReservationSuccess";
import EditReservation from "./containers/EditReservation";


const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
const user =  JSON.parse(localStorage.getItem('user'));

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(rootReducer, user ? { loggedIn: user } : {})}>
        <BrowserRouter>
            <App>
                <Switch>
                    <Route path='/login' component={Login}/>
                    <Route path='/logout' component={Logout}/>
                    <Route path='/home' component={Home}/>
                    <Route path='/menu' component={Menu}/>
                    <Route path="/signUp" component={SignUp}/>
                    <Route path="/foods" component={authAdmin(Foods)}/>
                    <Route path='/add-food' component={authAdmin(AddFood)}/>
                    <Route path="/edit-food/:id" component={authAdmin(EditFood)}/>
                    <Route path="/user-detail" component={UserDetail}/>
                    <Route path="/user-profile/:id" component={UserProfile}/>
                    <Route path="/cart" component={authUser(Cart)}/>
                    <Route path="/users" component={authAdmin(Users)}/>
                    <Route path="/orders" component={authAdmin(Orders)}/>
                    <Route path="/delivery-orders" component={authDriver(DeliveryOrders)}/>
                    <Route path="/reservations" component={authAdmin(Reservations)}/>
                    <Route path="/edit-reservation" component={authAdmin(EditReservation)}/>
                    <Route path="/order-from-server" component={authServer(OrderFromServer)}/>
                    <Route path="/order-from-server-menu" component={authServer(OrderFromServerMenu)}/>
                    <Route path="/my-order-display" component={MyOrderDisplay}/>
                    <Route path="/success-page" component={SuccessPage}/>
                    <Route path="/reservation-success-page" component={ReservationSuccessPage}/>
                    <Route path="/kitchen-status/:orderNum" component={KitchenStatus}/>
                    <Route path="/check-out-page" component={CheckOutPage}/>
                    <Route path="/driver-map" component={DriverMap}/>
                    <Route path="/test" component={Test}/>
                    <Route path="/" component={Home}/>
                </Switch>
            </App>
        </BrowserRouter>
    </Provider>
  , document.querySelector('#root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
