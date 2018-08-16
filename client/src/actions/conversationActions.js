import axios from "axios";

import { FETCH_CONVERSATIONS, SET_SELECTED_CONVERSATION, COMPOSE_MESSAGE, SET_NEW_MESSAGE, SET_NEW_CONVERSATION } from "./types";

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
        let res = await axios.get(`/api/conversations/${conversation._id}`)
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
        res = await axios.get("/api/conversations");
        dispatch({
            type: FETCH_CONVERSATIONS,
            payload: res.data.conversations
        })
    }

export const findOrBeginConversation = (user, contact, conversations) => 
    async dispatch => {
        const newArray = [user._id, contact._id].sort(); 
        const savedConversation = conversations.find(conversation => {
            let participants = conversation.participants.map(participant => participant._id).sort()
            return newArray.every((element, index) => element === participants[index]);
        })
        if (savedConversation) {
            const res = await axios.get(`/api/conversations/${savedConversation._id}`)
            const participant = savedConversation.participants.find(participant => user._id !== participant._id)
            dispatch({
                type: SET_SELECTED_CONVERSATION,
                payload: {
                    id: res.data.conversation._id,
                    participant,
                    messages: res.data.messages,
                    draftedMessage: ""
                }
            })
        } else {
            dispatch({
                type: SET_SELECTED_CONVERSATION,
                payload: {
                    id: null,
                    participant: contact,
                    messages: [],
                    draftedMessage: ""
                }
            })
        }
    }

export const composeMessage = message => {
   return { type: COMPOSE_MESSAGE, payload: message }
}

export const sendMessageOrCreateConversation = (conversation, socket) => 
    async dispatch => {
        if (!conversation.id) {
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
            dispatch({ 
                type: SET_NEW_CONVERSATION,
                payload: {
                    ...res.data.conversation,
                    recentMessage: res.data.message
                }
             })
        } else {
            const res = await axios.post(`/api/conversations/${conversation.id}`, { message: conversation.draftedMessage, to: conversation.participant })
            socket.emit("SEND_MESSAGE", res.data.message);
            dispatch({
                type: SET_NEW_MESSAGE,
                payload: res.data.message
            })
            dispatch({
                type: FETCH_CONVERSATIONS,
                payload: res.data.conversations
            })
        }
    }

export const addMessage = (message, conversations) => 
    async dispatch => {
        if (message.conversationID === conversations.selected.id) {   
            dispatch({
                    type: SET_NEW_MESSAGE,
                    payload: message
                })
        } 
       
        const res = await axios.get("/api/conversations");
        dispatch({
            type: FETCH_CONVERSATIONS,
            payload: res.data.conversations
        })
    }
    

export const addConversation = data => {
    return { 
        type: SET_NEW_CONVERSATION,
        payload: {
            ...data.conversation,
            recentMessage: {
                ...data.message
            }
        }
     }
}