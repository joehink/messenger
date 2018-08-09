import React, { Component } from "react";
import { connect } from "react-redux";

import "../styles/reset.css";

import { fetchUser } from "../actions"; 

import Nav from "./Nav";
import SignIn from "./SignIn";
import Messenger from "./Messenger";

class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }
    renderSignIn() {
        if (!this.props.user) {
            return <SignIn />
        } else {
            return <Messenger />
        }
    }
    render() {
        return (
            <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
                <Nav />
                { this.renderSignIn() }
            </div>
        );
    }
};

function mapStateToProps(state) {
    return { user: state.user };
}

export default connect(mapStateToProps, { fetchUser })(App);
