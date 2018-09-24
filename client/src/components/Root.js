import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

import reducers from "../reducers";

function Root(props) {
    return (
        <Provider store={createStore(reducers, {}, applyMiddleware(reduxThunk))}>
            { props.children }
        </Provider>
    );
};

export default Root;