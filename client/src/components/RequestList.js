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
                    className="list-group-item" 
                >
                    <div className="row w-100">
                        <div className="col-3">
                            <img src={request.profileIMG} alt={request.fullName} className="rounded-circle" />
                        </div>
                        <div className="col-9 align-self-center ">
                            <label className="mb-0 pl-3">{request.fullName}</label>
                            <button 
                                className="btn btn-success btn-sm ml-3"
                                value={request._id}
                                onClick={() => acceptRequest(request, user, socket)}
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
                <h6 className="pl-3 pt-4 pb-0">Pending Requests</h6>
                <ul className="list-group list-group-flush list">
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