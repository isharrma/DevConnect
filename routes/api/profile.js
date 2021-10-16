const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route : GET api/profile/me
// @desc : Get current user  profile
// @access : Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["id", "avatar"]
    );

    if (!profile) return res.status(400).json("Invalid Profile");

    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server Error");
  }
});

// @route : GET api/profile/me
// @desc : Get current user  profile
// @access : Private
router.post(
  "/",
  [
    auth,
    [
      check("status", "Status is required").not().isEmpty(),
      check("skills", "Skills are required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty())
      return res.status(400).json({
        error: error.array(),
      });

    const {
      company,
      website,
      location,
      bio,
      status,
      skills,
      githubusername,
      linkedin,
      instagram,
      youtube,
    } = req.body;

    // Setting up profile object
    const profileFields = {};

    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(",").map((skill) => skill.trim());
    }

    profileFields.social = {};
    if (linkedin) profileFields.linkedin = linkedin;
    if (instagram) profileFields.instagram = instagram;
    if (youtube) profileFields.youtube = youtube;

    try {
      let profile = Profile.findOne({ user: req.user.id });

      // Updating profile if it exists
      if (profileFields) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
      }

      // Creating new profile if it doesnt exists
      profile = new Profile(profileFields);
      await profile.save(); // All mongoose function return promises.
      return res.json(profile);
    } catch (err) {
      console.log(err.message);
      res.status(500).json("Server Error");
    }
  }
);

// @route : GET api/profile
// @desc : Get all the profiles
// @access : Public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", [
      "username",
      "avatar",
    ]);
    res.json(profiles);
  } catch (err) {
    console.log(err);
    rs.status(500).json("Server Error");
  }
});

// @route : GET api/profile/user/:user_id
// @desc : Get a profile by id
// @access : Public
router.get("/user/:user_id", async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.params.user_id }).populate(
      "user",
      ["username", "avatar"]
    );

    if (!profile) return res.status(400).json("Profile doesnt exist");

    res.json(profile);
  } catch (err) {
    console.log(err);

    if (err.kind == "ObjectId")
      return res.status(400).json("Profile doesnt exist");

    res.status(500).json("Server Error");
  }
});

module.exports = router;
