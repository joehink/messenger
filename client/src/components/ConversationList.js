import React, { Component } from "react";
import { connect } from "react-redux";
import { acceptRequest, findConversation } from "../actions";

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
                    <div 
                        className={conversation._id === this.state.selected ? "selected": ""} 
                        style={{ display: "flex", alignItems: "center" }} 
                        key={conversation._id}
                        onClick={() => this.onConversationClick(conversation)}
                    >
                        <img src={participant.profileIMG} alt={participant.fullName}/>
                        <p>{participant.fullName }</p>
                    </div>
                )   
            })
        }
    }
    render() {
        console.log(this.props.conversations)
        return (
            <div id="conversationList">
                { this.renderConversations() }
            </div>
        );
    };
}

const mapStateToProps = state => {
    return { user: state.user }
}

export default connect(mapStateToProps, { acceptRequest, findConversation })(ConversationList);