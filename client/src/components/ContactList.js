import React, { Component } from "react";
import { connect } from "react-redux";
import { acceptRequest, beginConversation, findConversation } from "../actions";
import RequestList from "./RequestList";

class ContactList extends Component {
    state = { selected: "" }
    onContactClick(contact) {
        const { user, conversations, beginConversation, findConversation } = this.props;
        this.setState({ selected: contact._id })
        const savedConversation = this.conversationExists(user, contact, conversations)
        if (savedConversation) {
            findConversation(user, savedConversation)
        } else {
            beginConversation(contact)
        }
    }
    conversationExists(user, contact, conversations) {
        return conversations.find(conversation =>  {
            return conversation.participants.every(participant => {
                return participant._id === user._id || participant._id === contact._id
            })
        })
    }
    renderContacts() {
        const { contacts } = this.props;
        return contacts.map(contact => {
            return ( 
                <li 
                    key={contact._id}
                    className={"list-item " + (contact._id === this.state.selected ? "selected": "")} 
                    onClick={() => this.onContactClick(contact)}
                >
                    <div className="list-item-content">
                        <img src={contact.profileIMG} alt={contact.fullName} />
                        <label className="contactName">{contact.fullName}</label>
                    </div>
                </li>   
            )   
        })
    }
    renderRequestList() {
        const { pendingRequests } = this.props.user;
        if (pendingRequests.length > 0) {
            return <RequestList />
        }
    }
    render() {
        return (
            <div id="contactList">
                {this.renderRequestList()}
                <h6 className="contacts-header">Contacts</h6>
                <ul className="list">
                    { this.renderContacts() }
                </ul>
            </div>
        );
    };
}

const mapStateToProps = state => {
    const { user, conversations } = state;
    return { user, conversations: conversations.conversations }
}

export default connect(mapStateToProps, { acceptRequest, beginConversation, findConversation })(ContactList);