const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth");
const user = require("../../models/User");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

/* 
@route      GET api/auth
@desc       get user by using token
@access     public
*/
router.get("/", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).send("server error");
    }
});

/* 
@route      Post api/auth/login
@desc       login a user
@access     public
*/
router.post(
    "/login",
    [
        body("email", "email is required").isEmail(),
        body("password", "password has to be at least 3 chararcters").isLength({
            min: 3,
        }),
    ],
    async (req, res) => {
        // console.log("i am inside api login");
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email: email });
            if (!user)
                return res
                    .status(400)
                    .json({ errors: [{ message: "user does not exist!" }] });

            if (!(await bcrypt.compare(password, user.password))) {
                return res
                    .status(400)
                    .json({ errors: [{ message: "Wrong password!" }] });
            }
            const payload = {
                user: {
                    id: user.id,
                },
            };
            const token = jwt.sign(payload, process.env.JWTSECRET, {
                expiresIn: "120h",
            });
            res.json({ token: token });
        } catch (error) {
            console.error(error);
            return res.status(500).send("server error");
        }
    }
);

module.exports = router;
