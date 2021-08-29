const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Post = require("./models/post");

const app = express();


app.use(bodyParser.json() );
app.use(bodyParser.urlencoded({extended: false}) );

mongoose.connect("mongodb+srv://gus:changeme@cluster0.itilw.mongodb.net/Cluster0?retryWrites=true&w=majority")
  .then(()=> {
    console.log("Connected to mongodb");
  })
  .catch((error)=> {
    console.log("error connecting to mongodb", error);
  });

app.use( (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");

  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  console.log(post);
  res.status(201).json({message: 'Post added successfully'});
});

app.use("/api/posts", (req, res, next) => {

  posts = [
    {
      id: "1",
      title: "First Post",
      content: "This is the first post's content",
    },
    {
      id: "2",
      title: "Second Post",
      content: "This is the second post's content",
    },
    {
      id: "3",
      title: "Third Post",
      content: "This is the third post's content",
    },
  ];
  res.status(200).json({
    message: "message from node",
    posts: posts,
  });
});

module.exports = app;
