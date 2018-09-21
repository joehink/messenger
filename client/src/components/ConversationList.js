import React, { Component } from "react";
import { connect } from "react-redux";
import { acceptRequest, findConversation } from "../actions";
import Moment from "react-moment";

class ConversationList extends Component {
    state = { selected: "" }
    onConversationClick(conversation) {
        const { findConversation, user } = this.props;

        this.setState({ selected: conversation._id })
        findConversation(user, conversation)
    }
    renderNotification(conversation) {
        if (conversation.notify === this.props.user._id && this.props.selected.id !== conversation._id) {
            return <span className="redDot"></span>
        }
    }
    renderConversations() {
        const { conversations, user } = this.props;
        if (conversations) {
            return conversations.map(conversation => {
                const participant = conversation.participants.find(participant => user._id !== participant._id)
                return (    
                    <li 
                        key={conversation._id} 
                        className={"list-item " + (conversation._id === this.state.selected ? "selected": "")} 
                        onClick={() => this.onConversationClick(conversation)}>
                        <div className="list-item-content">
                            <img src={participant.profileIMG} alt={participant.fullName} />
                            <div className="name-time-wrapper">
                                <div className="name-time">
                                    { this.renderNotification(conversation) }
                                    <label className="participantName">{participant.fullName}</label>
                                    <Moment 
                                        fromNow 
                                        className="time"
                                    >
                                        { conversation.recentMessage.createdAt }
                                    </Moment>
                                </div>
                                <div className="recentMessage">
                                    <p>{conversation.recentMessage.body}</p>
                                </div>
                            </div>
                        </div>
                    </li>
                )
            })
        }
    }
    render() {
        return (
            <div id="conversationList">
                <ul className="list">
                    { this.renderConversations() }
                </ul>
            </div>
        );
    };
}

const mapStateToProps = state => {
    return { user: state.user, selected: state.conversations.selected }
}

export default connect(mapStateToProps, { acceptRequest, findConversation })(ConversationList);