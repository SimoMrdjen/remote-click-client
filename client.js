const ioClient = require("socket.io-client");
const robot = require("robotjs");
const express = require("express");
const path = require("path");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server); // This will handle Socket.IO on the local server

const PORT = 3000; // Client UI server port
// If running in pkg executable, use special path handling
const viewsPath = process.pkg
  ? path.join(process.execPath, "views")
  : path.join(__dirname, "views");
// Setup EJS view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files like CSS, JS
app.use(express.static(path.join(__dirname, "public")));

// Serve the index.ejs file for the root route
app.get("/", (req, res) => {
  res.render("index", { logs: [] }); // Initialize logs as an empty array
});

// Start the UI server
server.listen(PORT, () => {
  console.log(`UI Server running at http://localhost:${PORT}`);
});

// Array to store event logs
const logs = [];

// Connect to the WebSocket server on Heroku
const socket = ioClient("https://micic-fc43cdd8f709.herokuapp.com");

socket.on("connect", () => {
  console.log("Connected to WebSocket server");
  addLog("Connected to WebSocket server");
});

socket.on("performClick", () => {
  console.log("Click event received");
  robot.mouseClick(); // Simulate a mouse click on the PC
  addLog("Click event received");
});

socket.on("disconnect", () => {
  console.log("Disconnected from WebSocket server");
  addLog("Disconnected from WebSocket server");
});

// Function to add logs and send them to the UI
function addLog(message) {
  const timestamp = new Date();
  logs.push({ timestamp, message });
  updateUI();
}

// Function to update the UI by emitting logs to all connected clients
function updateUI() {
  io.emit("updateLogs", logs); // Emit the updated logs to the UI clients
}
