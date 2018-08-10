import { SEARCH_USERS } from "../actions/types";

export default (state = [], action) => {
    switch (action.type) {
        case SEARCH_USERS:
            return action.payload;
        default: 
            return state;
    }
}