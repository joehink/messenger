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
                            className={(message.to === participant._id ? "align-self-end" : "align-self-start") + " message"} 
                            key={message._id}>{message.body}
                        </p>
            })
        }
    }
    renderConversation() {
        const { participant } = this.props;
        if (participant) {
            return (
                <nav className="navbar navbar-light bg-light">
                    <a className="navbar-brand">
                        <img src={participant.profileIMG} className="rounded-circle mr-2" width="30" height="30" alt={participant.fullName} />
                        {participant.fullName}
                    </a>
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
            <div id="conversation" className="pb-5">
                { this.renderConversation() }
                <div id="messages" className="p-4 d-flex w-100 flex-column messages" ref="messageList">
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