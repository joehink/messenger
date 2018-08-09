import React, { Component } from "react";
import { connect } from "react-redux";

import "../styles/nav.css"

class Nav extends Component {
    renderContent() {
        if (this.props.user) {
            return [
                <a key="1" className="nav-link" href="/api/user/logout">Logout</a>,
                <span key="2">{ this.props.user.firstName }</span>
            ]
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
