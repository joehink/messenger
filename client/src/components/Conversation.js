import React, { Component } from "react";
import { connect } from "react-redux";

import { userConnected } from "../actions";

class Conversation extends Component {
    renderMessages() {
        const { messages } = this.props;
        if (messages) {
            return messages.map(message => {
                return <p key={message._id}>{message.body}</p>
            })
        }
    }
    renderConversation() {
        const { participant } = this.props;
        if (participant) {
            return <p>{participant.fullName}</p>
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
    const { messages, participant } = state.conversations.selected;
    return { messages, participant }
}

export default connect(mapStateToProps, { userConnected })(Conversation);