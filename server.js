const express = require("express");

const server = express();

const userRoutes = require("./users/userRouter.js");
const postRoutes = require("./posts/postRouter.js");

server.use(express.json());
server.use(logger);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use("/api/users", userRoutes);
server.use("/api/posts", postRoutes);

//custom middleware

function logger(req, res, next) {
  console.log(
    `Request method: ${req.method}, 
      Request URL: ${req.originalUrl}, 
      Date: ${new Date()}`
  );
  next();
}

module.exports = server;
