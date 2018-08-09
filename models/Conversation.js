const mongoose = require("mongoose");
const { Schema } = mongoose;

const conversationSchema = new Schema({
    participants: [],
    lastUpdated: Date,
    messages: [],
});

mongoose.model("conversations", conversationSchema);