import React, { Component } from "react";
import { connect } from "react-redux";

import "../styles/reset.css";

import { fetchUser } from "../actions"; 

import Nav from "./Nav";

class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }
    render() {
        return (
            <Nav />
        );
    }
};



export default connect(null, { fetchUser })(App);
