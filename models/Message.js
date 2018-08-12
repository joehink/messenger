const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema({
    conversationID: { type: Schema.Types.ObjectId, required: true },
    body: { type: String, required: true },
    to: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User" }
}, {
    timestamps: true
});

mongoose.model("messages", messageSchema)