import React, { Component } from "react";
import { connect } from "react-redux";

import "../styles/nav.css"

class Nav extends Component {
    renderContent() {
        switch (this.props.user) {
            case null:
                return;
            case false:
                return <a className="nav-link" href="/auth/google">Sign in with Google</a>;
            default: 
                return <a className="nav-link" href="/api/user/logout">Logout</a>
        }
    }
    render() {
        return (
            <nav>
                <span id="brand">Messenger</span>
                { this.renderContent() }
            </nav>
        );
    };
};

function mapStateToProps(state) {
    return { user: state.user }
}

export default connect(mapStateToProps)(Nav);
