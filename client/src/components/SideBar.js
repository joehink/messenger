import React, { Component } from "react";
import { connect } from "react-redux"

import ConversationList from "./ConversationList";
import ContactList from "./ContactList";
import RequestList from "./RequestList";

import { searchUsers } from "../actions";

class SideBar extends Component {
    state = {
        list: "conversations"
    };
    renderList() {
        switch (this.state.list) {
            case "conversations":
                return <ConversationList />;
            case "contacts":
                return <ContactList />;
            case "requests":
                return <RequestList />;
            default: 
                return;
        }
    }
    render() {
        return (
            <div>
                <div>
                    <input type="text" onChange={text => this.props.searchUsers(text.target.value)} />
                </div>
                <div>
                    <a onClick={() => this.setState({ list: "conversations" })}>Conversations</a>
                    <a onClick={() => this.setState({ list: "contacts" })}>Contacts</a>
                    <a onClick={() => this.setState({ list: "requests" })}>Requests</a>
                </div>
                { this.renderList() }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { search: state.search }
}

export default connect(mapStateToProps, { searchUsers })(SideBar);
