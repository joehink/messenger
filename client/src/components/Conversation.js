import React, { Component } from "react";
import { connect } from "react-redux";
import * as ReactDOM from 'react-dom';

import { userConnected } from "../actions";

class Conversation extends Component {
    renderMessages() {
        const { messages, participant } = this.props;
        if (messages) {
            return messages.map(message => {
                return <p 
                            className={(message.to === participant._id ? "sent" : "received") + " message"} 
                            key={message._id}
                        >
                            {message.body}
                        </p>
            })
        }
    }
    renderConversation() {
        const { participant } = this.props;
        if (participant) {
            return (
                <nav>
                    <img src={participant.profileIMG} alt={participant.fullName} />
                    {participant.fullName}
                </nav>
            )
        }
    }
    scrollToBottom() {
        const { messageList } = this.refs;
        const scrollHeight = messageList.scrollHeight;
        const height = messageList.clientHeight;
        const maxScrollTop = scrollHeight - height;
        ReactDOM.findDOMNode(messageList).scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
    componentDidUpdate() {
        this.scrollToBottom()
    }
    render() {
        return (
            <div id="conversation">
                { this.renderConversation() }
                <div id="messages" className="messages" ref="messageList">
                    { this.renderMessages() }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { messages, participant } = state.conversations.selected;
    return { messages, participant }
}

export default connect(mapStateToProps, { userConnected })(Conversation);