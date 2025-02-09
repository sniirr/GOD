const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const jwt = require("jwt-simple");
const path = require("path");
require("dotenv").config();
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const port: number | string = process.env.PORT || 4000;
import { User } from "./models/UserModel";
import userRoutes from "./routes/userRoute";
import questionRoutes from "./routes/questionRoute";
import discussionRoutes from "./routes/discussionRoute";

//controls
import { voteForSolution } from "./controlers/questionCtrl";
import { addMessage } from "./controlers/discussionCtrl";

require("./controlers/auth"); // get google authentication
require("./controlers/db"); //connect to mongoDB

app.use(cookieParser());

const JWT_SECRET = process.env.JWT_SECRET;

app.use(express.json());
app.use(express.static(path.join(__dirname, "client", "build")));

app.use("/questions", questionRoutes);
app.use("/user", userRoutes);
app.use("/discussion", discussionRoutes);

// passport settings
const PASSPORT_SECRET = process.env.PASSPORT_SECRET;
const passport = require("passport");

app.use(passport.initialize());
app.use(passport.session());
app.use(
  session({ secret: PASSPORT_SECRET, resave: false, saveUninitialized: false }),
);

//pasport routes
app.get(
  "/auth",
  passport.authenticate("google", { scope: ["email", "profile"] }),
);

app.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/fail",
  }),
  async (req, res) => {
    try {
      // console.log({ USER: req.user })
      const user = req.user;

      user.role = "public";
      user.last_entered = new Date();
      // console.log(`user ${user.displayName} logged in`);

      // Try to update user
      let userDB = await User.findOneAndUpdate({ email: user.email }, user);
      if (!userDB) {
        userDB = new User(user);
        await userDB.save();
      }
      res.user = user;
      const userJWT = jwt.encode(
        { _id: userDB._id, role: user.role, displayName: user.displayName },
        JWT_SECRET,
      );
      res.cookie("user", userJWT, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 2,
      });
      res.cookie("isLogged", "true", { maxAge: 1000 * 60 * 60 * 24 * 2 });
      res.redirect("http://localhost:3000/questions");
    } catch (err: any) {
      res.status(500).send(err.message);
    }
  },
);

app.get("/logout", (req: any, res: any) => {
  req.logout();
  res.clearCookie("user");
  res.send({ login: false });
});

//socket io
io.on("connection", (socket) => {
  // console.log(socket.rooms);
  // console.log("a user connected");

  let socketRoom = null;

  socket.on("disconnect", () => {
    socketRoom = null;
    // console.log("user disconnected");
  });

  socket.on("message", (msg) => {
    console.log("message: " + msg.message);
    io.emit("message", msg);
  });

  // rooms
  socket.on("join-room", (roomId) => {
    socket.join(roomId); //the client is now in that room

    socketRoom = roomId;
    // console.log("join room", roomId, '--------------------------------------------');
  });

  socket.on("leave-room", (roomId) => {
    socket.leave(roomId); //the client is now in that room
    socketRoom = null;
    // console.log("leave room", roomId);
  });

  socket.on(`chat-message`, async (msgObj) => {
    const res = await addMessage(msgObj);
    const socketRoom = msgObj.parentId;

    if (res && socketRoom){
      io.to(socketRoom).emit("chat-message", res);}
  });

  socket.on(`question-vote`, async ({ qid, sid, value, userId }) => {
    const userVotes = await voteForSolution({ qid, sid, value, userId });
    if (userVotes){
      io.to(qid).emit("question-vote", userVotes);}
  });
});

http.listen(port, () => {
  console.log("Server listen on port", port);
});
