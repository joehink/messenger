import React, { Component } from "react";
import { connect } from "react-redux"

import ConversationList from "./ConversationList";
import ContactList from "./ContactList";
import SearchResults from "./SearchResults";

import { searchUsers } from "../actions";

class SideBar extends Component {
    state = { list: "conversations", showResults: false };
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
        if (this.state.showResults) {
            return <SearchResults results={search} />
        }
    }
    render() {
        const { searchUsers } = this.props;
        return (
            <div id="sideBar" className="border-right">
                <div className="search m-3" style={{minWidth: "300px"}}>
                    <input 
                        placeholder="Find Friends"
                        type="text" 
                        className="form-control"
                        onFocus={() => this.setState({ showResults: true })}
                        onBlur={() => this.setState({ showResults: false })}
                        onChange={event => searchUsers(event.target.value)} 
                    />
                    { this.renderSearchResults() }
                </div>
                <div className="d-flex justify-content-center">
                    <button 
                        className={"btn mr-3 mb-2 " + (this.state.list === "conversations" ? "btn-primary" : "btn-light" )} 
                        onClick={() => this.setState({ list: "conversations" })}
                    >
                        Conversations
                    </button>
                    <button 
                        className={"btn ml-3 mb-2 " + (this.state.list === "contacts" ? "btn-primary" : "btn-light" )} 
                        onClick={() => this.setState({ list: "contacts" })}
                    >
                        Contacts
                    </button>
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
