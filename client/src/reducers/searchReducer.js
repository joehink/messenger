import { SEARCH_USERS, UPDATE_SEARCH } from "../actions/types";

export default (state = [], action) => {
    switch (action.type) {
        case SEARCH_USERS:
            return action.payload;
        default: 
            return state;
    }
}