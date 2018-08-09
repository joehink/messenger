const requireLogin = require("../middlewares/requireLogin");

module.exports = app => {
    app.get("/api/user", requireLogin, (req, res) => {
        res.send(req.user);
    });
    app.get("/api/user/logout", requireLogin, (req, res) => {
        req.logout();
        res.send(req.user);
    });
}
