const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();

// connect to DB
connectDB();

// init Middleware
app.use(express.json({ extended: true }));

//define routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

// listen on a port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening to port ${PORT}`));
