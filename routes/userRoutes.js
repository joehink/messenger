const requireLogin = require("../middlewares/requireLogin");

module.exports = app => {
    app.get("/api/user", (req, res) => {
        res.send(req.user);
    });
    app.get("/api/user/logout", (req, res) => {
        req.logout();
        res.redirect("/");
    });
}
