const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageScema = new Schema({
    conversationID: { type: Schema.Types.ObjectId, required: true },
    body: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User" }
}, {
    timestamps: true
});