import { USER_CONNECTED } from "../actions/types";

export default (state = null, action) => {
    switch (action.type) {
        case USER_CONNECTED:
            return action.payload;
        default: 
            return state;
    }
}