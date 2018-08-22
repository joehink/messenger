import axios from "axios";
import { FETCH_USER, SEARCH_USERS, UPDATE_CONTACTS, UPDATE_PENDING_REQUESTS, UPDATE_SENT_REQUESTS } from "./types";

export const fetchUser = () => 
    async dispatch => {
        const res = await axios.get("/api/user");
        dispatch({
            type: FETCH_USER,
            payload: res.data
        });
    };

export const searchUsers = searchTerm => 
    async dispatch => {
        const res = await axios.post("/api/user/search", { searchTerm })
        dispatch({
            type: SEARCH_USERS,
            payload: res.data.users
        });
    };

export const sendRequest = (result, user, socket) => 
    async dispatch => {
        const res = await axios.put(`/api/request/send/${result._id}`)
        socket.emit("SEND_REQUEST", {user, to: result._id})
        dispatch({
            type: FETCH_USER,
            payload: res.data
        })
    }

export const acceptRequest = (result, user, socket) => 
    async dispatch => {
        const res = await axios.put(`/api/request/accept/${result._id}`)
        socket.emit("ACCEPT_REQUEST", {user, to: result._id})
        dispatch({
            type: FETCH_USER,
            payload: res.data
        })
    }

export const addContact = data => 
    dispatch => {
        const newSentRequests = data.user.sentRequests.map(request => {
            if (request !== data.newContact._id) {
                return request;
            } else {
                return null;
            }
        }) 
        dispatch({
            type: UPDATE_SENT_REQUESTS,
            payload: newSentRequests
        })
        dispatch({
            type: UPDATE_CONTACTS,
            payload: data.newContact
        })
    }

export const addPendingRequest = newPendingRequest => 
    dispatch => {
        dispatch({
            type: UPDATE_PENDING_REQUESTS,
            payload: newPendingRequest
        })
    }
    
    

