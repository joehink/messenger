import React, { Component } from "react";
import { connect } from "react-redux";


import { userConnected } from "../actions";

class Messenger extends Component {
    componentDidMount() {
        this.props.userConnected()
    }
    render() {
        return (
            <div>
                Messenger
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log(state.socket)
    return { socket: state.socket }
}

export default connect(mapStateToProps, { userConnected })(Messenger);