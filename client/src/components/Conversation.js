import React, { Component } from "react";
import { connect } from "react-redux";

import { userConnected } from "../actions";

class Conversation extends Component {
    renderMessages() {
        if (this.props.conversation.selected.messages) {
            return this.props.conversation.selected.messages.map(message => {
                return <p key={message._id}>{message.body}</p>
            })
        }
    }
    renderConversation() {
        if (this.props.conversation.selected.participant) {
            return (
                <p>{this.props.conversation.selected.participant.fullName}</p>
            )
        }
    }
    render() {
        return (
            <div id="conversation">
                { this.renderConversation() }
                { this.renderMessages() }
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log(state.conversations.selected)
    return { socket: state.socket, conversation: state.conversations }
}

export default connect(mapStateToProps, { userConnected })(Conversation);