const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user");

const app = express();

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://kumarpushp06:kumarpushp06@clusterblog.qwhne.mongodb.net/?retryWrites=true&w=majority&appName=ClusterBlog"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Middleware
app.use((req, res, next) => {
  console.log("First middleware");
  next();
});

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

// home route

app.get("/", (req, res) => {
  res.send("Welcome to blog application");
});
app.get("/home", (req, res) => {
  res.send("Welcome to blog application");
});

// login - logout routes

app.post("/signup", (req, res, next) => {
  const newUser = new User({
    username: "add Username",
    password: req.body.password,
    email: req.body.email,
  });

  newUser
    .save()
    .then((data) => res.json(data))
    .catch((err) => console.log(err));

  next();
});

app.post("/login", (req, res) => {
  let { email, password } = req.body;

  User.findOne({ email, password })
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
});

// blog routes ------------------------------------------------

// get all blogs
app.get("/blogs", (req, res) => {
  res.send("All Blogs");
});

// get user specific blogs
app.get("/userblogs:userid", (req, res) => {
  res.send("User blog details");
});

// create blog
app.post("/createblog", (req, res) => {
  res.send("Blog created successfully");
});

// get blog
app.get("/blog:blogId", (req, res) => {
  res.send("Blog details");
});

// update blog
app.put("/updateblog:blogId", (req, res) => {
  res.send("Blog updated successfully");
});

// delete blog
app.delete("/deleteblog:blogId", (req, res) => {
  res.send("Blog deleted successfully");
});

// error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.send("Something went wrong");
});

let port = 8080;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
