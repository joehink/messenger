import { combineReducers } from "redux";
import userReducer from "./userReducer";
import socketReducer from "./socketReducer";

export default combineReducers({
    user: userReducer,
    socket: socketReducer
});