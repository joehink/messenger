import axios from "axios";
import { FETCH_USER, SEARCH_USERS } from "./types";

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

