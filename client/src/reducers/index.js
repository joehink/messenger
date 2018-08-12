import { combineReducers } from "redux";
import userReducer from "./userReducer";
import searchReducer from "./searchReducer";
import socketReducer from "./socketReducer";
import conversationReducer from "./conversationReducer";

export default combineReducers({
    user: userReducer,
    search: searchReducer,
    socket: socketReducer,
    conversations: conversationReducer
});