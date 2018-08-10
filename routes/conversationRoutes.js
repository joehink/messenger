const Conversation = require("../models/Conversation");
const Message = require("../models/Message");

module.exports = app => {
    // Get a user's conversations and the most recent message
    app.get("/api/conversations", async (req, res) => {
        const conversations = await Conversation.find({ participants: req.user.id })
                .select("_id")
                .exec();
        const userConversations = conversations.map(async conversation => {
            const message = await Message.find({ conversationID: conversation.id })
                    .sort("-createdAt")
                    .limit(1)
                    .populate({
                        path: "author",
                        select: "firstName lastName"
                    })
                    .exec();
            conversation.recentMessage = {
                body: message.body,
                authorFirst: message.author.firstName,
                authorLast: message.author.lastName,
            }
            return conversation;
        })
        res.send({ conversations: userConversations })
    })

    // Get a single conversation
    app.get("/api/conversations/:conversationID", async (req, res) => {
        const messages = await Message.find({ conversationID: req.params.conversationID })
            .select("createsAt body author")
            .sort("-createdAt")
            .populate({
                path: "author",
                select: "firstName lastName"
            })
            .exec();
        res.send({messages});
    })

    // Create a new conversation
    app.post("/api/conversations/new/:recipientID", async (req, res) => {
        const conversation = await new Conversation({
            participants: [req.user.id, req.params.recipentID]
        }).save();

        const message = new Message({
            conversationID: conversation.id,
            body: req.body.message,
            author: req.user.id
        }).save();

        res.send({conversation: conversation.id})
    });

    // Send message in conversation
    app.post("/api/conversations/:conversationID", async (req, res) => {
        const message = await new Message({
            conversationID: req.params.conversationID,
            body: req.body.message,
            author: req.user.id
        }).save();

        res.send();
    });
}
