const mongoose = require("mongoose");
const { Schema } = mongoose;

const conversationSchema = new Schema({
    participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

mongoose.model("conversations", conversationSchema);