const express = require("express");
const cors = require("cors");
const secure = require("ssl-express-www");
const path = require("path");

const PORT = process.env.PORT || 3000;

const apirouter = require("./routes/api");

const app = express();
app.enable("trust proxy");
app.set("json spaces", 2);
app.use(cors());
app.use(secure);
app.use(express.static(path.join(__dirname, "public")));

// Route for the home page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html")); // Serve index.html for root route
});

// Route for documentation
app.get("/docs", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html")); // Serve index.html for /docs route
});

app.use("/api", apirouter);

// Error handling for unknown routes
app.use((req, res, next) => {
    res.status(404).json({ error: "Not Found" });
});

// Error handling for other errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});

module.exports = app;
