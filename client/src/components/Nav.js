import React, { Component } from "react";
import { connect } from "react-redux";

class Nav extends Component {
    renderContent() {
        const { user } = this.props;
        if (user) {
            return [
                <a key="1" className="nav-link nav-item mr-4" href="/api/user/logout">Logout</a>,
                <span key="2" className="navbar-text">{ user.firstName }</span>
            ]
        }
    }
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <a className="navbar-brand h1 m-0 text-light">Messenger</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <div className="navbar-nav ml-auto">
                        { this.renderContent() }
                    </div>
                </div>
            </nav>
        );
    };
};

function mapStateToProps(state) {
    const { user } = state;
    return { user }
}

export default connect(mapStateToProps)(Nav);
