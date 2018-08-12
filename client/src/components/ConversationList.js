import React, { Component } from "react";
import { connect } from "react-redux";
import { acceptRequest } from "../actions";

class ConversationList extends Component {
    renderConversations() {
        if (this.props.conversations) {
            return this.props.conversations.map(conversation => {
                return (    
                    <div 
                        style={{ display: "flex", alignItems: "center" }} 
                        key={conversation._id}
                    >
                        <p>{conversation.participants.find(participant => this.props.user._id !== participant._id).fullName }</p>
                    </div>
                )   
            })
        }
    }
    render() {
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

export default connect(mapStateToProps, { acceptRequest })(ConversationList);