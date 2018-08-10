module.exports = io => {
    const users = {};

    io.on("connection", socket => {
        socket.on("create_conversation", conversation => {
            socket.join(conversation);
        })

        socket.on("leave_conversation", conversation => {
            socket.leave(conversation);
        })

        socket.on("send_message", conversation => {
            io.to(`${socketId}`).emit('message', 'I just met you');
        })

        socket.on("disconnect", () => {

        })
    })
}