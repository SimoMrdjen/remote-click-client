const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Store action logs to show on the UI
let actionLogs = [];

// Set EJS as the view engine
app.set("view engine", "ejs");

// Serve static files
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

// Serve the UI
app.get("/", (req, res) => {
  res.render("index", { logs: actionLogs });
});

// Handle logging actions from the client
app.post("/log", (req, res) => {
  const { message } = req.body;
  actionLogs.push({ timestamp: new Date(), message });
  if (actionLogs.length > 10) actionLogs.shift(); // Keep last 10 logs
  res.status(200).send("Logged");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
