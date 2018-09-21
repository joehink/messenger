import React, { Component } from "react";
import { connect } from "react-redux";
import { sendRequest, acceptRequest, beginConversation, findConversation } from "../actions";

class SearchResults extends Component {
    onResultClick(result) {
        const { findConversation, beginConversation, user, conversations } = this.props;
        const savedConversation = this.conversationExists(user, result, conversations)
        if (savedConversation) {
            findConversation(user, savedConversation)
        } else {
            beginConversation(result)
        }
    }
    conversationExists(user, result, conversations) {
        return conversations.find(conversation =>  {
            return conversation.participants.every(participant => {
                return participant._id === user._id || participant._id === result._id
            })
        })
    }
    renderRequestStatus(result) {
        const { user, acceptRequest, sendRequest, socket } = this.props;
        if (user.sentRequests.includes(result._id)) {
            return <p className="request-sent">Request sent</p>
        } else if (user.pendingRequests.find(request => request._id === result._id)) {
            return (
                    <button 
                        className="accept-button"
                        value={result._id}
                        onMouseDown={() => acceptRequest(result, user, socket)}
                    >
                        Accept request
                    </button>
            )
        } else if (!user.contacts.some(contact => contact._id === result._id)) {
            return (
                    <button 
                        className="button"
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
        const { results, user } = this.props;
        return results.map(result => {
            if (user._id !== result._id) {
                return (    
                    <li 
                        key={result._id}
                        className="list-item" 
                        onMouseDown={user.contacts.some(contact => contact._id === result._id) ? (() => this.onResultClick(result)) : null}
                    >
                        <div className="list-item-content">
                            <img src={result.profileIMG} alt={result.fullName} />
                            <div>
                                <label className="requestName">{result.fullName}</label>
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
                <ul className="result-list">
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

export default connect(mapStateToProps, { sendRequest, acceptRequest, beginConversation, findConversation })(SearchResults);