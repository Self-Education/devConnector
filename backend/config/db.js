const mongoose = require("mongoose");

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGOURI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});
		console.log("DB is connected");
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

module.exports = connectDB;
