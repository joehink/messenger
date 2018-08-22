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
            <form className="form-inline p-2 border-top" id="textInput" onSubmit={event => event.preventDefault()}>
                <button 
                    className="btn btn-primary mr-2"
                    disabled={!conversation.draftedMessage}
                    onClick={() => this.onSend()}
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
        )
    }
}

const mapStateToProps = state => {
    const { socket, conversations } = state;
    return { socket, conversation: conversations.selected }
}

export default connect(mapStateToProps, { userConnected, composeMessage, sendMessage, createConversation })(TextInput);