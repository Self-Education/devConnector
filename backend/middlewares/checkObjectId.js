const mongoose = require("mongoose");

// idName could be user_id or post_id or else
const checkObjectId = (idName) => (req, res, next) => {
	if (!mongoose.Types.ObjectId.isValid(req.params[idName])) {
		return res.status(400).json({ msg: `invalid ${idName}` });
	}
	next();
};

module.exports = checkObjectId;
