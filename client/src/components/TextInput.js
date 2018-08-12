import React, { Component } from "react";
import { connect } from "react-redux";

import { userConnected, composeMessage, sendMessageOrCreateConversation } from "../actions";

class TextInput extends Component {
    render() {
        return (
            <div id="textInput">
                <button 
                    disabled={!this.props.conversation.draftedMessage}
                    onClick={() => this.props.sendMessageOrCreateConversation(this.props.conversation, this.props.socket)}
                >
                    Send
                </button>
                <input 
                    disabled={!this.props.conversation.participant} type="text" 
                    onChange={event => this.props.composeMessage(event.target.value)}
                    value={this.props.conversation.draftedMessage}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { socket: state.socket, conversation: state.conversations.selected }
}

export default connect(mapStateToProps, { userConnected, composeMessage, sendMessageOrCreateConversation })(TextInput);