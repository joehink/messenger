import io from "socket.io-client";
import { USER_CONNECTED } from "./types";

export const userConnected = () => 
    async dispatch => {
        const socket = io("http://localhost:5000");
        dispatch({
            type: USER_CONNECTED,
            payload: socket
        });
    };
