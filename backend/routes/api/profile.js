const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth");
const checkObjectId = require("../../middlewares/checkObjectId");
const Profile = require("../../models/Profile");
const { body, validationResult } = require("express-validator");
const normalize = require("normalize-url");
const axios = require("axios");
/* 
@route      GET api/profile/me
@desc       get current user profile
@access     private
*/
router.get("/me", [auth], async (req, res) => {
	try {
		const myProfile = await Profile.findOne({
			user: req.user.id,
		}).populate("user", ["name", "avatar"]);
		if (!myProfile) {
			return res.status(404).json({
				msg: "You do not have profile, please go ahead and add it!",
			});
		}

		return res.json(myProfile);
	} catch (error) {
		console.error(error.message);
		return res.status(500).send("Server Error!");
	}
});

/* 
@route      POST api/profile/
@desc       create  or update a profile
@access     private
*/
router.post(
	"/",
	[
		auth,
		body("status", "Status is required").not().isEmpty(),
		body("skills", "Skills are required").not().isEmpty(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json(errors.array());
		}
		const {
			website,
			skills,
			youtube,
			twitter,
			instagram,
			linkedin,
			facebook,
			// spread the rest of the fields we don't need to check
			...rest
		} = req.body;

		const newProfile = {
			user: req.user.id,
			website:
				website && website != ""
					? normalize(website, { forceHttp: true })
					: "",
			skills: Array.isArray(skills)
				? skills
				: skills.split(",").map((skill) => skill.trim()),
			...rest,
		};
		const social = { youtube, twitter, instagram, linkedin, facebook };
		for (const key in social) {
			if (social[key] && social[key].length > 0) {
				social[key] = normalize(social[key], { forceHttp: true });
			}
		}
		console.log(social);

		newProfile.social = social;

		try {
			// upsert: if not exist, create one
			// setDefaultOnInsert:  if this and upsert are true, mongoose will apply the defaults specified in the model's schema if a new document is created
			const profile = await Profile.findOneAndUpdate(
				{ user: req.user.id },
				newProfile,
				{ new: true, upsert: true, setDefaultsOnInsert: true }
			);
			return res.json(profile);
		} catch (error) {
			console.error(error.message);
			return res.status(500).send("Server Error!");
		}
	}
);

/* 
@route      GET api/profile/
@desc       get  all profiles
@access     public
*/
router.get("/", async (req, res) => {
	try {
		const profiles = await Profile.find().populate("user", [
			"name",
			"avatar",
		]);
		return res.json(profiles);
	} catch (error) {
		console.error(error.message);
		return res.status(500).send("Server Error!");
	}
});

/* 
@route      GET api/profile/user/:user_id
@desc       get the profile by userID
@access     public
*/
router.get("/user/:user_id", checkObjectId("user_id"), async (req, res) => {
	try {
		const profile = await Profile.findOne({
			user: req.params.user_id,
		}).populate("user", ["name", "avatar"]);
		if (!profile)
			return res
				.status(404)
				.json({ msg: "there is no profile for this person!" });
		return res.json(profile);
	} catch (error) {
		console.error(error.message);
		return res.status(500).send("Server Error!");
	}
});

/* 
@route      DELETE api/profile
@desc       delete user, profile and post
@access     private
*/
router.delete("/", [auth], async (req, res) => {
	try {
		// @todo delete all posts

		// delete profile
		await Profile.findOneAndDelete({ user: req.user.id });

		// delete user
		await User.findOneAndDelete({ _id: req.user.id });

		return res.json({ msg: "user deleted!" });
	} catch (error) {
		console.error(error.message);
		return res.status(500).send("Server Error!");
	}
});

/* 
@route      PUT api/profile/experience
@desc       add a new experience
@access     private
*/
router.put(
	"/experience",
	[
		auth,
		body("company", "company is required").not().isEmpty(),
		body("from", "from is required").not().isEmpty(),
		body("title", "title is required").not().isEmpty(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json(errors.array());
		}

		try {
			const profile = await Profile.findOne({ user: req.user.id });
			if (!profile) {
				return res.status(400).json({
					msg: "you have no profile, please create profile first!",
				});
			}
			profile.experience.unshift(req.body);
			await profile.save();
			return res.json(profile);
		} catch (error) {
			console.error(error.message);
			return res.status(500).send("Server Error!");
		}
	}
);

/* 
@route      DELETE api/profile/experience/:experienc_id
@desc       delete experience
@access     private
*/
router.delete(
	"/experience/:experience_id",
	[auth, checkObjectId("experience_id")],
	async (req, res) => {
		try {
			const profile = await Profile.findOne({ user: req.user.id });
			const index = profile.experience.findIndex(
				(exp) => exp.id === req.params.experience_id
			);
			if (index === -1)
				return res.status(400).json({ msg: "the post does not exist" });
			profile.experience.splice(index, 1);
			profile.save();
			return res.json({ msg: "experience deleted!" });
		} catch (error) {
			console.error(error.message);
			return res.status(500).send("Server Error!");
		}
	}
);

/* 
@route      PUT api/profile/education
@desc       add a new education
@access     private
*/
router.put(
	"/education",
	[
		auth,
		body("school", "school is required").not().isEmpty(),
		body("degree", "degree is required").not().isEmpty(),
		body("fieldofstudy", "study field is required").not().isEmpty(),
		body("from", "from field is required").not().isEmpty(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		console.log("inside api put education");
		if (!errors.isEmpty()) {
			return res.status(400).json(errors.array());
		}

		try {
			const profile = await Profile.findOne({ user: req.user.id });
			if (!profile) {
				return res.status(400).json({
					msg: "you have no profile, please create profile first!",
				});
			}
			profile.education.unshift(req.body);
			await profile.save();
			return res.json(profile);
		} catch (error) {
			console.error(error.message);
			return res.status(500).send("Server Error!");
		}
	}
);

/* 
@route      DELETE api/profile/education/:education_id
@desc       delete eduction
@access     private
*/
router.delete(
	"/education/:education_id",
	[auth, checkObjectId("education_id")],
	async (req, res) => {
		try {
			const profile = await Profile.findOne({ user: req.user.id });
			const index = profile.education.findIndex(
				(edu) => edu.id === req.params.edu_id
			);
			console.log(index);
			profile.education.splice(index, 1);
			profile.save();
			return res.json({ msg: "education deleted!" });
		} catch (error) {
			console.error(error.message);
			return res.status(500).send("Server Error!");
		}
	}
);

/* 
@route      GET api/profile/github/:username
@desc       get github repo
@access     public
*/
router.get("/github/:username", auth, async (req, res) => {
	try {
		const uri = encodeURI(
			`https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
		);
		const headers = {
			"user-agent": "node.js",
			Authorization: `token ${process.env.GITHUBTOKEN}`,
		};
		const githubRes = await axios.get(uri, { headers });
		return res.json(githubRes.data);
	} catch (error) {
		console.error(error);
		return res.status(404).json({ msg: "No Github profile found" });
	}
});

module.exports = router;
