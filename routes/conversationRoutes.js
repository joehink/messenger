const mongoose = require("mongoose");
const Conversation = mongoose.model("conversations");
const Message = mongoose.model("messages");
const User = mongoose.model("users");

module.exports = app => {
    // Get a user's conversations and the most recent message
    app.get("/api/conversations", async (req, res) => {
        const conversations = await Conversation.find({ participants: req.user.id })
                .populate({ path: "participants", model: User })
                .lean()
                .exec();
        const userConversations = conversations.map(async conversation => {
            const message = await Message.find({ conversationID: conversation._id })
                    .sort("-createdAt")
                    .limit(1)
                    .populate({
                        path: "author", model: User
                    })
                    .exec();
                conversation.recentMessage = message[0];
            return conversation;
        })
        Promise.all(userConversations).then(values => {
            res.send({ conversations: values })
        })
    })

    // Get a single conversation
    app.get("/api/conversations/:conversationID", async (req, res) => {
        let conversation = await Conversation.findById(req.params.conversationID);
        console.log(conversation.notify, req.user.id)
        if (String(conversation.notify) === req.user.id) {
            conversation = await Conversation.findByIdAndUpdate(req.params.conversationID, {
                notify: null
            }, {new: true});
        }
    
        const messages = await Message.find({ conversationID: req.params.conversationID })
            .sort("createdAt")
            .populate({
                path: "author", model: User
            })
            .exec();
        res.send({conversation, messages});
    })

    // Create a new conversation
    app.post("/api/conversations/new/:recipientID", async (req, res) => {
        const conversation = await new Conversation({
            participants: [req.user.id, req.params.recipientID],
            notify: req.params.recipientID
        })
        .save();

        const fullConversation = await Conversation.findById(conversation.id)
                                        .populate({
                                            path: "participants", model: User
                                        })
                                        .exec()

        const message = await new Message({
            conversationID: conversation.id,
            body: req.body.message,
            author: req.user.id,
            to: req.params.recipientID
        }).save();
        
        res.send({conversation: fullConversation, message})
    });

    // Send message in conversation
    app.post("/api/conversations/:conversationID", async (req, res) => {
        await Conversation.findByIdAndUpdate(req.params.conversationID, {
            notify: req.body.to
        }).exec()
        const message = await new Message({
            conversationID: req.params.conversationID,
            body: req.body.message,
            author: req.user.id,
            to: req.body.to
        }).save();

        const conversations = await Conversation.find({ participants: req.user.id })
                .populate({ path: "participants", model: User })
                .lean()
                .exec();
        const userConversations = conversations.map(async conversation => {
            const message = await Message.find({ conversationID: conversation._id })
                    .sort("-createdAt")
                    .limit(1)
                    .populate({
                        path: "author", model: User
                    })
                    .exec();
                conversation.recentMessage = message[0];
            return conversation;
        })
        Promise.all(userConversations).then(values => {
            res.send({ conversations: values, message })
        })
    });
}
