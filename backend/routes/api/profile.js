const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth");
const checkObjectId = require("../../middlewares/checkObjectId");
const Profile = require("../../models/Profile");
const { body, validationResult } = require("express-validator");
const normalize = require("normalize-url");
/* 
@route      GET api/profile/me
@desc       get current user profile
@access     private
*/
router.get("/me", [auth], async (req, res) => {
    try {
        const myProfile = await Profile.find({
            user: req.body.id,
        }).populate("user", ["name", "avatar"]);

        if (myProfile.length <= 0) {
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
        console.log(social);
        for (const key in social) {
            if (social[key] && social[key].length > 0) {
                social[key] = normalize(social[key], { forceHttp: true });
            }
        }
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
            res.status(500).send("Server Error!");
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
        res.status(500).send("Server Error!");
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
        res.status(500).send("Server Error!");
    }
});

module.exports = router;
