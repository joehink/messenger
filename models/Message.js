const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageScema = new Schema({
    body: String,
    timeSent: Date,
    from: String,
});