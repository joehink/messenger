import update from 'immutability-helper';
import { FETCH_CONVERSATIONS, SET_SELECTED_CONVERSATION, COMPOSE_MESSAGE, SET_NEW_MESSAGE, UPDATE_CURRENT_MESSAGES } from "../actions/types";

const DEFAULT_STATE = {
    conversations: [],
    selected: {
        id: null,
        participants: [],
        messages: [],
        draftedMessage: ""
    }
}

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case FETCH_CONVERSATIONS:
            return {
                ...state,
                conversations: action.payload
            };
        case SET_SELECTED_CONVERSATION:
            return update(state, {
                selected: { $merge: action.payload }
            })
        case COMPOSE_MESSAGE:
            return {
                ...state,
                selected: {
                    ...state.selected,
                    draftedMessage: action.payload
                }
            }
        case SET_NEW_MESSAGE:
            return {
                ...state,
                selected: {
                    ...state.selected,
                    messages: [...state.selected.messages, action.payload]
                }
            }
            case UPDATE_CURRENT_MESSAGES: 
                return {
                    ...state,
                    selected: {
                        ...state.selected,
                        messages: [...state.selected.messages, action.payload]
                    }
                }
        default: 
            return state;
    }
}