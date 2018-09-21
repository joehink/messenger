import React, { Component } from "react";
import { connect } from "react-redux";
import { acceptRequest } from "../actions";

class RequestList extends Component {
    renderRequests() {
        const { user, socket, acceptRequest } = this.props;
        return user.pendingRequests.map(request => {
            return (    
                <li 
                    key={request._id}
                    className="list-item" 
                >
                    <div className="list-item-content">
                        <img src={request.profileIMG} alt={request.fullName} />
                        <div>
                            <label className="requestName">{request.fullName}</label>
                            <button 
                                className="accept-button"
                                value={request._id}
                                onMouseDown={() => acceptRequest(request, user, socket)}
                            >
                                Accept request
                            </button>
                        </div>
                    </div>
                </li> 
            )   
        })
    }
    render() {
        return (
            <div id="requestList">
                <h6 className="requests-header">Pending Requests</h6>
                <ul className="list">
                    { this.renderRequests() }
                </ul>
            </div>
        );
    };
}

const mapStateToProps = state => {
    const { user, socket } = state;
    return { user, socket }
}

export default connect(mapStateToProps, { acceptRequest })(RequestList);