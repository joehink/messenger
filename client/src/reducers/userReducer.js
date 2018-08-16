import { FETCH_USER, UPDATE_CONTACTS, UPDATE_PENDING_REQUESTS, UPDATE_SENT_REQUESTS } from "../actions/types";

export default (state = null, action) => {
    switch (action.type) {
        case FETCH_USER:
            return action.payload || false;
        case UPDATE_CONTACTS:
            return {
                ...state,
                contacts: [...state.contacts, action.payload]
            }
        case UPDATE_PENDING_REQUESTS:
            return {
                ...state,
                pendingRequests: [...state.pendingRequests, action.payload]
            }
        case UPDATE_SENT_REQUESTS:
            return {
                ...state,
                sentRequests: action.payload
            }
        default: 
            return state;
    }
}