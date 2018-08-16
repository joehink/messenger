import React, { Component } from "react";
import { connect } from "react-redux";
import { acceptRequest, findOrBeginConversation } from "../actions";
import RequestList from "./RequestList";

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
                <li 
                    key={contact._id}
                    className={"list-group-item " + (contact._id === this.state.selected ? "selected": "")} 
                    onClick={() => this.onContactClick(contact)}
                >
                    <div className="row w-100">
                        <div className="col-2">
                            <img src={contact.profileIMG} alt={contact.fullName} className="rounded-circle" />
                        </div>
                        <div className="col-10 align-self-center ">
                            <label className="mb-0 pl-3">{contact.fullName}</label>
                        </div>
                    </div>
                </li>   
            )   
        })
    }
    renderRequestList() {
        if (this.props.user.pendingRequests.length > 0) {
            return <RequestList />
        }
    }
    render() {
        return (
            <div id="contactList">
                {this.renderRequestList()}
                <h6 className="pl-3 pt-4 pb-0">Contacts</h6>
                <ul className="list-group list-group-flush">
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

export default connect(mapStateToProps, { acceptRequest, findOrBeginConversation })(ContactList);