const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Post = require("./models/post");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose
  .connect(
    "mongodb+srv://gus:changeme@cluster0.itilw.mongodb.net/gus-node-angular?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to mongodb");
  })
  .catch((error) => {
    console.log("error connecting to mongodb", error);
  });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );

  next();
});



app.post("/api/posts/:id", (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
  });
  post.save().then((createdPost) => {
    res.status(201).json({
      message: "Post updated successfully",
      postId: createdPost._id
    });
  });

});



app.put("/api/posts/", (req, res, next) => {

  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });

  Post.updateOne({_id: req.param.id}, post )
    .then((createdPost) => {
    res.status(201).json({
      message: "Post added successfully" });
  });
});



app.get("/api/posts", (req, res, next) => {
  // posts = [
  //   {
  //     id: "1",
  //     title: "First Post",
  //     content: "This is the first post's content",
  //   },
  //   {
  //     id: "2",
  //     title: "Second Post",
  //     content: "This is the second post's content",
  //   },
  //   {
  //     id: "3",
  //     title: "Third Post",
  //     content: "This is the third post's content",
  //   },
  // ];

  Post.find()
    .then((documents) => {
      res.status(200).json({
        message: "message from node",
        posts: documents,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id })
    .then((result) => {
      console.log(result);
      res.status(201).json({ message: "Post deleted successfully" });
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = app;
