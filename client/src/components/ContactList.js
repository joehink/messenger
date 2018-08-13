import React, { Component } from "react";
import { connect } from "react-redux";
import { acceptRequest, findOrBeginConversation } from "../actions";

class ContactList extends Component {
    state = { selected: "" }
    onContactClick(contact) {
        const { findOrBeginConversation, user, conversations } = this.props;

        this.setState({ selected: contact._id })
        findOrBeginConversation(user, contact, conversations)
    }
    renderContacts() {
        const { contacts } = this.props;
        return contacts.map(contact => {
            return (    
                <div 
                    className={contact._id === this.state.selected ? "selected": ""} 
                    style={{ display: "flex", alignItems: "center" }} 
                    key={contact._id}
                    onClick={() => this.onContactClick(contact)}
                >
                    <img src={contact.profileIMG} alt={contact.fullName}/>
                    <p>{contact.fullName}</p>
                </div>
            )   
        })
    }
    render() {
        return (
            <div id="contactList">
                { this.renderContacts() }
            </div>
        );
    };
}

const mapStateToProps = state => {
    const { user, conversations } = state;
    return { user, conversations: conversations.conversations }
}

export default connect(mapStateToProps, { acceptRequest, findOrBeginConversation })(ContactList);