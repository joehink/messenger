import React, { Component } from "react";
import { connect } from "react-redux";

import "../styles/nav.css"

class Nav extends Component {
    renderContent() {
        const { user } = this.props;
        if (user) {
            return [
                <a key="1" className="nav-link" href="/api/user/logout">Logout</a>,
                <span key="2">{ user.firstName }</span>
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
    const { user } = state;
    return { user }
}

export default connect(mapStateToProps)(Nav);
