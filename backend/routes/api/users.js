const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
/* 
@route      Post api/users
@desc       regiter a user
@access     public
*/
router.post(
	"/",
	[
		body("name", "name is requried").not().isEmpty(),
		body("email", "email is required").isEmail(),
		body("password", "password has to be at least 3 chararcters").isLength({
			min: 3,
		}),
	],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { name, email, password } = req.body;

		try {
			const user = await User.findOne({ email: email });
			if (user) {
				return res
					.status(400)
					.json({ errors: [{ msg: "user already exists!" }] });
			}

			const newUser = new User(req.body);

			// hash password
			const salt = await bcrypt.genSalt(10);
			newUser.password = await bcrypt.hash(password, salt);

			// gravatar
			newUser.avatar = gravatar.url(email, {
				s: "200",
				r: "pg",
				d: "mm",
			});
			await newUser.save();

			// json web token
			const payload = {
				user: {
					id: newUser.id,
				},
			};
			const token = jwt.sign(payload, process.env.JWTSECRET, {
				expiresIn: "120h",
			});
			res.json({ token: token });
		} catch (error) {
			console.error(error.message);
			res.status(500).send("Server Error!");
		}
	}
);

module.exports = router;
