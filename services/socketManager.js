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
    })
}