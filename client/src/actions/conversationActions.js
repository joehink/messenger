import axios from "axios";

import { FETCH_CONVERSATIONS, SET_SELECTED_CONVERSATION, COMPOSE_MESSAGE, SET_NEW_MESSAGE, UPDATE_CURRENT_MESSAGES } from "./types";

export const fetchConversations = () => 
    async dispatch => {
        const res = await axios.get("/api/conversations");
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
        } else {
            const res = await axios.post(`/api/conversations/${conversation.id}`, { message: conversation.draftedMessage, to: conversation.participant })
            socket.emit("SEND_MESSAGE", res.data.message);
            dispatch({
                type: SET_NEW_MESSAGE,
                payload: res.data.message
            })
        }
    }

export const addMessage = (message, conversations) => {
    if (message.conversationID === conversations.selected.id) {
        console.log("heyyy")
        
        return {
                type: UPDATE_CURRENT_MESSAGES,
                payload: message
            }
    } else {
        const newConversations = conversations.conversations.map(conversation => {
            if (conversation._id === message.conversationID) {
                conversation.recentMessage = message
                return conversation;
            }
            return conversation;
        })
        return { type: FETCH_CONVERSATIONS, payload: newConversations }
    }
    
    
}

