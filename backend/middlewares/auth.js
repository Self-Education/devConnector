const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
	const token = req.header("x-auth-token");
	if (!token) {
		return res.status(401).json({ msg: "No token, authorization failed!" });
	}

	try {
		req.user = jwt.verify(token, process.env.JWTSECRET).user;
		next();
	} catch (error) {
		console.error(error);
		return res.status(401).json({ msg: "auhtorization denied!" });
	}
};

module.exports = auth;
