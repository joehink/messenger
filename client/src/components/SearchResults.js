import React, { Component } from "react";
import { connect } from "react-redux";
import { sendRequest, acceptRequest, findOrBeginConversation } from "../actions";

class SearchResults extends Component {
    renderRequestStatus(result) {
        const { user, acceptRequest, sendRequest, socket } = this.props;
        if (user.sentRequests.includes(result._id)) {
            return <p className="ml-3 m-0 font-italic" style={{ color: "#bbb" }}>Request sent</p>
        } else if (user.pendingRequests.find(request => request._id === result._id)) {
            return (
                    <button 
                        className="btn btn-success btn-sm ml-3"
                        value={result._id}
                        onMouseDown={() => acceptRequest(result, user, socket)}
                    >
                        Accept request
                    </button>
            )
        } else if (!user.contacts.some(contact => contact._id === result._id)) {
            return (
                    <button 
                        className="btn btn-primary btn-sm ml-3"
                        value={result._id}
                        onMouseDown={() => sendRequest(result, user, socket)}
                    >
                        Send request
                    </button>
            ) 
        } else {
            return;
        }
    }
    renderResults() {
        const { results, user, conversations } = this.props;
        return results.map(result => {
            if (user._id !== result._id) {
                return (    
                    <li 
                        key={result._id}
                        className="list-group-item result" 
                        onMouseDown={user.contacts.some(contact => contact._id === result._id) ? (() => this.props.findOrBeginConversation(user, result, conversations)) : null}
                    >
                        <div className="row w-100">
                            <div className="col-3">
                                <img src={result.profileIMG} alt={result.fullName} className="rounded-circle" />
                            </div>
                            <div className="col-9 align-self-center ">
                                <label className="mb-0 pl-3">{result.fullName}</label>
                                { this.renderRequestStatus(result) }
                            </div>
                        </div>
                    </li> 
                )   
            } else {
                return null;
            }
        })
    }
    render() {
        return (
            <div id="searchResults">
                <ul className="list-group list-group-flush list shadow">
                    { this.renderResults() }
                </ul>
            </div>
        );
    };
}

const mapStateToProps = state => {
    const { user, conversations, socket } = state;
    return { user, conversations: conversations.conversations, socket }
}

export default connect(mapStateToProps, { sendRequest, acceptRequest, findOrBeginConversation })(SearchResults);