import React from "react";
import { connect } from "react-redux";

import { userConnected, composeMessage, sendMessageOrCreateConversation } from "../actions";

const TextInput = ({ conversation, sendMessageOrCreateConversation, socket, composeMessage }) => {
    return (
        <form className="form-inline p-2 border-top" id="textInput" onSubmit={event => event.preventDefault()}>
            <button 
                className="btn btn-primary mr-2"
                disabled={!conversation.draftedMessage}
                onClick={() => sendMessageOrCreateConversation(conversation, socket)}
            >
                Send
            </button>
            <input 
                className="flex-fill p-1"
                disabled={!conversation.participant} type="text" 
                onChange={event => composeMessage(event.target.value)}
                value={conversation.draftedMessage}
            />
        </form>
    );
    
}

const mapStateToProps = state => {
    const { socket, conversations } = state;
    return { socket, conversation: conversations.selected }
}

export default connect(mapStateToProps, { userConnected, composeMessage, sendMessageOrCreateConversation })(TextInput);