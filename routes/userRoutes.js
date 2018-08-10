const mongoose = require("mongoose")

const requireLogin = require("../middlewares/requireLogin");
const User = mongoose.model("users");

module.exports = app => {
    app.get("/api/user", (req, res) => {
        res.send(req.user);
    });
    app.get("/api/user/logout", (req, res) => {
        req.logout();
        res.redirect("/");
    });
    app.post("/api/user/search", async (req, res) => {
        const users = await User.find({fullName: { "$regex": req.body.searchTerm, "$options": "i" }})
                .limit(25)
                .select("-contacts")
                .exec()
        if (req.body.searchTerm) {
            res.send({ users });
        } else {
            res.send({ users: [] });
        } 
    });
}
