module.exports = io => {
    const users = {};

    io.on("connection", socket => {
        socket.on("login", userID => {
            users[userID] = socket.id;
            console.log(users)
        })
        
        socket.on("disconnect", () => {
            for (let user in users) {
                if (users[user] === socket.id) {
                    delete users[user]
                    console.log(users);
                }
            }
        })

        socket.on("SEND_MESSAGE", message => {
            socket.to(users[message.to]).emit("DELIVER_MESSAGE", message)
        })
        
        socket.on("NEW_CONVERSATION", conversation => {
            socket.to(users[conversation.message.to]).emit("ADD_CONVERSATION", conversation)
        })

        socket.on("SEND_REQUEST", data => {
            socket.to(users[data.to]).emit("ADD_PENDING_REQUEST", data.user)
        })

        socket.on("ACCEPT_REQUEST", data => {
            socket.to(users[data.to]).emit("ADD_CONTACT", data.user)
        });
    })
}