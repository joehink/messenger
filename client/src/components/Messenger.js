import React, { Component } from "react";
import { connect } from "react-redux";
import io from "socket.io-client";

import "../styles/messenger.css";

import SideBar from "./SideBar";
import Conversation from "./Conversation";
import TextInput from "./TextInput";

import { userConnected, fetchConversations, addMessage, addConversation, addContact, addPendingRequest } from "../actions";

class Messenger extends Component {
    componentDidMount() {
        this.socket = io((process.env.NODE_ENV === "production" ? "" : "http://localhost:5000"));
        const { user, userConnected, fetchConversations } = this.props;

        if (user) {
            userConnected(this.socket)
            fetchConversations();
            console.log(user)
        }

        this.socket.emit("login", user._id)

        this.socket.on("DELIVER_MESSAGE", message => {
            this.listeners("DELIVER_MESSAGE", message);
        })

        this.socket.on("ADD_CONVERSATION", conversation => {
            this.listeners("ADD_CONVERSATION", conversation)
        })

        this.socket.on("ADD_PENDING_REQUEST", newPendingRequest => {
            this.listeners("ADD_PENDING_REQUEST", newPendingRequest)
        })

        this.socket.on("ADD_CONTACT", newContact => {
            this.listeners("ADD_CONTACT", { user, newContact })
        })
    }
    listeners(event, data) {
        const { addMessage, conversations, addConversation, addPendingRequest, addContact } = this.props
        switch (event) {
            case "DELIVER_MESSAGE":
                return addMessage(data, conversations)
            case "ADD_CONVERSATION":
                return addConversation(data)
            case "ADD_CONTACT":
                return addContact(data);
            case "ADD_PENDING_REQUEST":
                return addPendingRequest(data);
            default:
                return;
        }
    }
    render() {
        return (
            <div id="messenger">
                <SideBar />
                <Conversation />
                <TextInput />
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { socket, user, conversations } = state;
    return { socket, user, conversations }
}


export default connect(mapStateToProps, { userConnected, fetchConversations, addMessage, addConversation, addContact, addPendingRequest })(Messenger);