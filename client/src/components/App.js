import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchUser } from "../actions"; 

import Nav from "./Nav";
import SignIn from "./SignIn";
import Messenger from "./Messenger";

class App extends Component {
    componentDidMount() {
        const { fetchUser } = this.props;
        fetchUser();
    }
    renderSignIn() {
        const { user } = this.props;
        if (user) {
            return <Messenger />
        } 
        return <SignIn />
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
    const { user } = state;
    return { user };
}

export default connect(mapStateToProps, { fetchUser })(App);
