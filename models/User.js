const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    googleID: String,
    firstName: String,
    lastName: String,
    profileIMG: String,
    pendingRequests: [],
    contacts: [],
});

mongoose.model("users", userSchema);
