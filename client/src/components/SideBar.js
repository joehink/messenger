import React, { Component } from "react";
import { connect } from "react-redux"

import ConversationList from "./ConversationList";
import ContactList from "./ContactList";
import SearchResults from "./SearchResults";

import { searchUsers } from "../actions";

class SideBar extends Component {
    state = { list: "conversations" };
    renderList() {
        const { user, conversations } = this.props;
        switch (this.state.list) {
            case "conversations":
                return <ConversationList conversations={conversations} />;
            case "contacts":
                return <ContactList contacts={user.contacts}/>;
            default: 
                return;
        }
    }
    renderSearchResults() {
        const { search } = this.props;
        if (search) {
            return <SearchResults results={search} />
        }
    }
    render() {
        const { searchUsers } = this.props;
        return (
            <div id="sideBar">
                <div className="search">
                    <input type="text" onChange={event => searchUsers(event.target.value)} />
                    { this.renderSearchResults() }
                </div>
                <div>
                    <button onClick={() => this.setState({ list: "conversations" })}>Conversations</button>
                    <button onClick={() => this.setState({ list: "contacts" })}>Contacts</button>
                </div>
                { this.renderList() }
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { search, user, conversations } = state;
    return { search, user, conversations: conversations.conversations }
}

export default connect(mapStateToProps, { searchUsers })(SideBar);
