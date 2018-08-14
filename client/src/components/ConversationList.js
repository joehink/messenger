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
    renderConversations() {
        const { conversations, user } = this.props;
        if (conversations) {
            return conversations.map(conversation => {
                const participant = conversation.participants.find(participant => user._id !== participant._id)
                return (    
                    <li 
                        key={conversation._id} 
                        className={"list-group-item " + (conversation._id === this.state.selected ? "selected": "")} 
                        onClick={() => this.onConversationClick(conversation)}>
                        <div className="row w-100">
                            <div className="col-2">
                                <img src={participant.profileIMG} alt={participant.fullName} className="rounded-circle" />
                            </div>
                            <div className="col-10 align-self-center">
                                <div className="row pl-3 align-items-center">
                                    <label className="mb-0 pl-3">{participant.fullName}</label>
                                    <Moment 
                                        fromNow 
                                        className="font-weight-light font-italic ml-auto"
                                        style={{ fontSize: "10px", display: "block" }}
                                    >
                                        { conversation.recentMessage[0].createdAt }
                                    </Moment>
                                </div>
                                <div className="row pl-3">
                                    <p className="font-weight-light pl-3 col-10 font-italic m-0" style={{ color: "#bbb" }}>{conversation.recentMessage[0].body}</p>
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
                <ul className="list-group list-group-flush">
                    { this.renderConversations() }
                </ul>
            </div>
        );
    };
}

const mapStateToProps = state => {
    return { user: state.user }
}

export default connect(mapStateToProps, { acceptRequest, findConversation })(ConversationList);