const app = require("express")();
const http = require("http").Server(app)
const io = require("socket.io")(http);
require("./services/socketManager")(io);
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require('body-parser');

const keys = require("./config/keys");

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });
require("./models/User");
require("./models/Conversation");
require("./models/Message")

app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json())


require("./services/passport");

require("./routes/authRoutes")(app);
require("./routes/userRoutes")(app);
require("./routes/conversationRoutes")(app);
require("./routes/requestRoutes")(app);

const PORT = process.env.PORT || 5000;
http.listen(PORT);
console.log(`Server is listening on port: ${PORT}`)