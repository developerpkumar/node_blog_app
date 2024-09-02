const router = require("router");
const User = require("../models/user");

// Signup ---------------------------------------------------------
router.post("/signup", async (req, res) => {
  const [userName, email, password] = { ...req.body };
  const newUser = new User({ userName, email, password });
  try {
    await newUser.save().then((user) => {
      res.json(user);
      res.send("User created successfully");
    });
  } catch (err) {
    console.log(err);
  }
});

//Login ------------------------------------------------------------
router.post("/login", async (req, res) => {
  let [email, password] = { ...req.body };
  try {
    const user = await User.findOne({ email });
    if (user) {
      if (password === user.password) {
        res.send("User logged in successfully");
        res.json(user);
      } else {
        res.send("Incorrect password");
      }
    } else {
      res.send("User not found");
    }
  } catch (err) {
    console.log(err);
  }
});

// Update User
router.put("/updateuser", async (req, res) => {
  let [email, oldPassword, newPassword, userName] = { ...req.body };
  try {
    const user = await User.findOne({ email });
    if (user) {
      if (oldPassword === user.password) {
        user.password = newPassword;
        user.userName = userName;
        user.save();
        res.send("User updated successfully");
      } else {
        res.send("Incorrect password");
      }
    } else {
      res.send("User not found");
    }
  } catch (err) {
    console.log(err);
  }
});

// Delete User
router.delete("/deleteuser", async (req, res) => {
  let [email, password] = { ...req.body };
  try {
    const user = await User.findOne({ email });
    if (user) {
      if (password === user.password) {
        user.remove();
        res.send("User deleted successfully");
      } else {
        res.send("Incorrect password");
      }
    } else {
      res.send("User not found");
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
