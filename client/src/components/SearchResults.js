import React, { Component } from "react";
import { connect } from "react-redux";
import { sendRequest, acceptRequest } from "../actions";

class SearchResults extends Component {
    renderRequestStatus(result) {
        const { user, acceptRequest, sendRequest } = this.props;
        if (user.sentRequests.includes(result._id)) {
            return <p>Request sent</p>
        } else if (user.pendingRequests.includes(result._id)) {
            return <button 
                        value={result._id}
                        onClick={event => acceptRequest(event)}
                    >
                        Accept request
                    </button>
        } else if (!user.contacts.some(contact => contact._id === result._id)) {
            return <button 
                        value={result._id}
                        onClick={event => sendRequest(event)}
                    >
                        Send request
                    </button>
        } else {
            return;
        }
    }
    renderResults() {
        const { results, user } = this.props;
        return results.map(result => {
            if (user._id !== result._id) {
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
    const { user } = state;
    return { user }
}

export default connect(mapStateToProps, { sendRequest, acceptRequest })(SearchResults);