import React, { Component } from "react";
import { connect } from "react-redux"

import ConversationList from "./ConversationList";
import ContactList from "./ContactList";
import SearchResults from "./SearchResults";

import { searchUsers } from "../actions";

class SideBar extends Component {
    state = {
        list: "conversations"
    };
    renderList() {
        switch (this.state.list) {
            case "conversations":
                return <ConversationList conversations={this.props.conversations} />;
            case "contacts":
                return <ContactList contacts={this.props.user.contacts}/>;
            default: 
                return;
        }
    }
    renderSearchResults() {
        if (this.props.search) {
            return <SearchResults results={this.props.search} />
        }
    }
    render() {
        return (
            <div id="sideBar">
                <div className="search">
                    <input type="text" onChange={text => this.props.searchUsers(text.target.value)} />
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
    return { search: state.search, user: state.user, conversations: state.conversations.conversations }
}

export default connect(mapStateToProps, { searchUsers })(SideBar);
