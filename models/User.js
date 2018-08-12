const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    googleID: String,
    fullName: String,
    firstName: String,
    lastName: String,
    profileIMG: String,
    pendingRequests: [{ type: Schema.Types.ObjectId, ref: "User" }],
    sentRequests: [{ type: Schema.Types.ObjectId, ref: "User" }],
    contacts: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

mongoose.model("users", userSchema);
