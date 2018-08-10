const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    googleID: String,
    fullName: String,
    firstName: String,
    lastName: String,
    profileIMG: String,
    pendingRequests: [],
    contacts: [],
});

mongoose.model("users", userSchema);
