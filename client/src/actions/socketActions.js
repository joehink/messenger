import { USER_CONNECTED } from "./types";

export const userConnected = (socket) => 
    async dispatch => {
        dispatch({
            type: USER_CONNECTED,
            payload: socket
        });
    };
