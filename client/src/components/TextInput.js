import React from "react";
import { connect } from "react-redux";

import { userConnected, composeMessage, sendMessageOrCreateConversation } from "../actions";

const TextInput = ({ conversation, sendMessageOrCreateConversation, socket, composeMessage }) => {
    return (
        <div id="textInput">
            <button 
                disabled={!conversation.draftedMessage}
                onClick={() => sendMessageOrCreateConversation(conversation, socket)}
            >
                Send
            </button>
            <input 
                disabled={!conversation.participant} type="text" 
                onChange={event => composeMessage(event.target.value)}
                value={conversation.draftedMessage}
            />
        </div>
    );
    
}

const mapStateToProps = state => {
    const { socket, conversations } = state;
    return { socket, conversation: conversations.selected }
}

export default connect(mapStateToProps, { userConnected, composeMessage, sendMessageOrCreateConversation })(TextInput);