import axios from "axios";
import { FETCH_CONVERSATIONS, SET_SELECTED_CONVERSATION, COMPOSE_MESSAGE, SET_NEW_MESSAGE } from "./types";

export const fetchConversations = () => 
    async dispatch => {
        const res = await axios.get("/api/conversations");
        dispatch({
            type: FETCH_CONVERSATIONS,
            payload: res.data.conversations
        })
    }

export const findConversation = (user, conversation) => 
    async dispatch => {
        const res = await axios.get(`/api/conversations/${conversation._id}`)
        const participant = conversation.participants.find(participant => user._id !== participant._id)
        dispatch({
            type: SET_SELECTED_CONVERSATION,
            payload: {
                id: res.data.conversation._id,
                participant,
                messages: res.data.messages,
                draftedMessage: ""
            }
        })
    }

export const beginConversation = contact => {
    return {
        type: SET_SELECTED_CONVERSATION,
        payload: {
            id: null,
            participant: contact,
            messages: [],
            draftedMessage: ""
        }
    }
}

export const composeMessage = message => ({ type: COMPOSE_MESSAGE, payload: message })

export const sendMessage = (conversation, socket) => 
    async dispatch => {
        const res = await axios.post(`/api/conversations/${conversation.id}`, { message: conversation.draftedMessage, to: conversation.participant })
        socket.emit("SEND_MESSAGE", res.data.message);
        dispatch({
            type: SET_NEW_MESSAGE,
            payload: res.data.message
        })
        dispatch(fetchConversations())
    }

export const createConversation = (conversation, socket) => 
    async dispatch => {
        const res = await axios.post(`/api/conversations/new/${conversation.participant._id}`, { message: conversation.draftedMessage })
        socket.emit("NEW_CONVERSATION", res.data);
        dispatch({
            type: SET_SELECTED_CONVERSATION,
            payload: {
                id: res.data.conversation._id,
                participant: conversation.participant,
                messages: [res.data.message],
                draftedMessage: ""
            }
        })
        dispatch(fetchConversations())
    }

export const addMessage = (message, conversations) => 
    async dispatch => {
        if (message.conversationID === conversations.selected.id) {   
            dispatch({
                type: SET_NEW_MESSAGE,
                payload: message
            })
        } 
        dispatch(fetchConversations())
    }