const mongoose = require("mongoose");
const User = mongoose.model("users");
const async = require("async");

module.exports = app => {
    app.put("/api/request/send/:recipientID", (req, res) => {
        async.parallel({
            recipient(callback) {
                return User.findByIdAndUpdate(req.params.recipientID, { 
                    $addToSet: { pendingRequests: req.user.id } 
                }, {new: true}, (err, result) => {
                    return callback(err, result)
                })
            },
            user(callback) {
                return User.findByIdAndUpdate(req.user.id, { 
                    $addToSet: { sentRequests: req.params.recipientID } 
                }, {new: true})
                .populate({ path: "contacts", model: User })
                .exec((err, result) => {
                    return callback(err, result)
                })
            }
        }, (err, results) => {
            if (err) { return err; }
            res.send(results.user)
        })
    })
    
    app.put("/api/request/accept/:senderID", (req, res) => {
        async.parallel({
            recipient(callback) {
                return User.findByIdAndUpdate(req.params.senderID, { 
                    $addToSet: { contacts: req.user.id },
                    $pull: { sentRequests: req.user.id } 
                }, {new: true}, (err, result) => {
                    return callback(err, result)
                })
            },
            user(callback) {
                return User.findByIdAndUpdate(req.user.id, { 
                    $addToSet: { contacts: req.params.senderID },
                    $pull: { pendingRequests: req.params.senderID }
                }, {new: true})
                .populate({ path: "contacts", model: User })
                .exec((err, result) => {
                    return callback(err, result)
                })
            }
        }, (err, results) => {
            if (err) { return err; }
            res.send(results.user)
        })
    })
}