import React, { Component } from "react";
import { connect } from "react-redux";
import { sendRequest, acceptRequest } from "../actions";

class SearchResults extends Component {
    renderRequestStatus(result) {
        if (this.props.user.sentRequests.includes(result._id)) {
            return <p>Request sent</p>
        } else if (this.props.user.pendingRequests.includes(result._id)) {
            return <button 
                        value={result._id}
                        onClick={event => this.props.acceptRequest(event)}
                    >
                        Accept request
                    </button>
        } else if (!this.props.user.contacts.some(contact => contact._id === result._id)) {
            return <button 
                        value={result._id}
                        onClick={event => this.props.sendRequest(event)}
                    >
                        Send request
                    </button>
        } else {
            return;
        }
    }
    renderResults() {
        return this.props.results.map(result => {
            if (this.props.user._id !== result._id) {
                return (    
                    <div style={{ display: "flex", alignItems: "center" }} key={result._id}>
                        <img src={result.profileIMG} alt={result.fullName}/>
                        <p>{result.fullName}</p>
                        { this.renderRequestStatus(result) }
                    </div>
                )   
            } else {
                return null;
            }
        })
    }
    render() {
        return (
            <div id="searchResults">
                <div className="list">
                    { this.renderResults() }
                </div>
            </div>
        );
    };
}

const mapStateToProps = state => {
    return { user: state.user }
}

export default connect(mapStateToProps, { sendRequest, acceptRequest })(SearchResults);