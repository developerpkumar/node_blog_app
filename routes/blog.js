const router = require("router");
const Post = require("../models/blog");

// get all posts ---------------------------------------------
router.get("/", async (req, res) => {
  try {
    const post = await Post.find();
    if (post) {
      res.json(post);
    } else {
      res.send("Post not found");
    }
  } catch (err) {
    console.log(err);
  }
});

// get single post -------------------------------------------
router.get("/:id", (req, res) => {
  const id = req.params.id;
  try {
    const post = Post.findById(id);
    if (post) {
      res.json(post);
    } else {
      res.send("Post not found");
    }
  } catch (err) {
    console.log(err);
  }
});

// create post -----------------------------------------------
router.post("/", async (req, res) => {
  const { name, image, description, author } = req.body;
  const newPost = new Post({
    name,
    image,
    description,
    author,
    likes: 0,
    comments: [],
  });
  try {
    const post = await newPost.save();
    if (post) {
      res.send("Post created successfully");
    } else {
      res.send("Post not created");
    }
  } catch (err) {
    console.log(err);
  }
});

// update post ----------------------------------------------
router.put("/:id", (req, res) => {
  const id = req.params.id;
  try {
    const post = Post.findById(id);
    if (post) {
      res.send("Post updated successfully");
    } else {
      res.send("Post not found");
    }
  } catch (err) {
    console.log(err);
  }
});

// delete post ----------------------------------------------
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  try {
    const post = Post.findById(id);
    if (post) {
      res.send("Post deleted successfully");
    } else {
      res.send("Post not found");
    }
  } catch (err) {}
});

module.exports = router;
