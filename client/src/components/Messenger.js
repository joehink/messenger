import React, { Component } from "react";
import { connect } from "react-redux";

import SideBar from "./SideBar";

import { userConnected } from "../actions";

class Messenger extends Component {
    componentDidMount() {
        this.props.userConnected()
    }
    render() {
        return (
            <div>
                <SideBar />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { socket: state.socket }
}

export default connect(mapStateToProps, { userConnected })(Messenger);