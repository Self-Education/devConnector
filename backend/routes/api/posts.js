const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const auth = require("../../middlewares/auth");
const checkObjectId = require("../../middlewares/checkObjectId");
const Post = require("../../models/Post");
const User = require("../../models/User");
/* 
@route      POST api/posts
@desc       create a post
@access     private
*/
router.post(
	"/",
	[auth, body("text", "text content is required").not().isEmpty()],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json(errors.array());
		}
		try {
			const user = await User.findById(req.user.id).select("-password");
			const post = new Post({
				text: req.body.text,
				user: req.user.id,
				name: user.name,
				avatar: user.avatar,
			});
			post.user = req.user.id;
			await post.save();
			return res.json(post);
		} catch (error) {
			console.error(error.message);
			return res.status(500).send("Server Error!");
		}
	}
);

/* 
@route      GET api/posts
@desc       GET  all posts
@access     private
*/
router.get("/", [auth], async (req, res) => {
	try {
		const posts = await Post.find().sort({ date: -1 });
		return res.json(posts);
	} catch (error) {
		console.error(error.message);
		return res.status(500).send("Server Error!");
	}
});

/* 
@route      GET api/posts/:post_id
@desc       get a post by id
@access     private
*/
router.get("/:post_id", [auth, checkObjectId("post_id")], async (req, res) => {
	try {
		const post = await Post.findById(req.params.post_id);
		if (!post) return res.status(404).json({ msg: "post not found" });

		return res.json(post);
	} catch (error) {
		console.error(error.message);
		return res.status(500).send("Server Error!");
	}
});

/* 
@route      DELETE api/posts/:post_id
@desc       DELETE a post by id
@access     private
*/
router.delete(
	"/:post_id",
	[auth, checkObjectId("post_id")],
	async (req, res) => {
		try {
			const post = await Post.findById(req.params.post_id);
			if (!post) return res.status(404).json({ msg: "post not found" });

			// check if the user is the owner of the post
			if (post.user.toString() !== req.user.id)
				return res
					.status(404)
					.json({ msg: "user is not authorized to do that" });
			await post.deleteOne();
			return res.json({ msg: "post deleted" });
		} catch (error) {
			console.error(error.message);
			return res.status(500).send("Server Error!");
		}
	}
);

/* 
@route      PUT api/posts/like/:post_id
@desc       like a post by id
@access     private
*/
router.put(
	"/like/:post_id",
	[auth, checkObjectId("post_id")],
	async (req, res) => {
		try {
			const post = await Post.findById(req.params.post_id);
			if (
				post.likes.filter(
					(like) => like.user.toString() === req.user.id
				).length > 0
			) {
				return res.status(400).json({ msg: "the post alreay liked" });
			}
			post.likes.unshift({ user: req.user.id });
			await post.save();
			return res.json(post.likes);
		} catch (error) {
			console.error(error.message);
			return res.status(500).send("Server Error!");
		}
	}
);

/* 
@route      PUT api/posts/unlike/:post_id
@desc       like a post by id
@access     private
*/
router.put(
	"/unlike/:post_id",
	[auth, checkObjectId("post_id")],
	async (req, res) => {
		try {
			const post = await Post.findById(req.params.post_id);
			if (
				post.likes.filter(
					(like) => like.user.toString() === req.user.id
				).length === 0
			) {
				return res
					.status(400)
					.json({ msg: "you did not like this post" });
			}
			const index = post.likes.findIndex(
				(like) => like.user.toString() === req.user.id
			);
			console.log(post.likes);
			console.log(req.user.id);
			console.log(index);
			post.likes.splice(index, 1);
			await post.save();
			return res.json(post.likes);
		} catch (error) {
			console.error(error.message);
			return res.status(500).send("Server Error!");
		}
	}
);

module.exports = router;
