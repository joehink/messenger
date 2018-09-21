import React, { Component } from "react";
import { connect } from "react-redux";

import { userConnected, composeMessage, sendMessage, createConversation } from "../actions";

class TextInput extends Component {
    onSend() {
        const { conversation, socket, sendMessage, createConversation } = this.props;
        if (conversation.id) {
            sendMessage(conversation, socket)
        } else {
            createConversation(conversation, socket)
        }
    }
    render() {
        const { conversation, composeMessage } = this.props;
        return (
            <form id="textInput" onSubmit={event => event.preventDefault()}>
                <button 
                    className="send-button"
                    disabled={!conversation.draftedMessage}
                    onClick={() => this.onSend()}
                >
                    Send
                </button>
                <input 
                    className="message-input"
                    disabled={!conversation.participant} type="text" 
                    onChange={event => composeMessage(event.target.value)}
                    value={conversation.draftedMessage}
                />
            </form>
        )
    }
}

const mapStateToProps = state => {
    const { socket, conversations } = state;
    return { socket, conversation: conversations.selected }
}

export default connect(mapStateToProps, { userConnected, composeMessage, sendMessage, createConversation })(TextInput);