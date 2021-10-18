const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const auth = require("../../middleware/auth");
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route : POST api/posts
// @desc : Create a post
// @access : Private
router.get(
  "/",
  [auth, [check("text", "Text can not be empty").not().isEmpty()]],
  async (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) return res.status(400).json({ error: error.array() });

    try {
      const user = await User.findById(req.user.id).select("-password");

      const newPost = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.log(err);
      res.status(400).json("Server Error");
    }
  }
);

module.exports = router;
