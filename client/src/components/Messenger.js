import React, { Component } from "react";
import { connect } from "react-redux";
import io from "socket.io-client";

import "../styles/messenger.css";

import SideBar from "./SideBar";
import Conversation from "./Conversation";
import TextInput from "./TextInput";

import { userConnected, fetchConversations, addMessage } from "../actions";

const socket = io("http://localhost:5000");

class Messenger extends Component {
    componentDidMount() {
        this.socket = io("http://localhost:5000");
        const { user, userConnected, fetchConversations } = this.props;
        this.socket.emit("login", user._id)
        this.socket.on("DELIVER_MESSAGE", message => {
            this.preMessage(message);
        })
        if (user) {
            userConnected(socket)
            fetchConversations();
        }
    }
    preMessage(message) {
        const { addMessage, conversations } = this.props
        addMessage(message, conversations)
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
    console.log(conversations)
    return { socket, user, conversations }
}


export default connect(mapStateToProps, { userConnected, fetchConversations, addMessage })(Messenger);