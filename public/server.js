const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

// Create an Express app
const app = express();

// Create an HTTP server
const server = http.createServer(app);

// Attach socket.io to the HTTP server
const io = socketIo(server);

// Use Heroku's dynamic port, or fallback to 3000 for local development
const PORT = process.env.PORT || 3000;

// Serve a simple message for the root route
app.get("/", (req, res) => {
  res.send("WebSocket test server is running!");
});

// Handle WebSocket connections
io.on("connection", (socket) => {
  console.log("Client connected");

  // Listen for 'click' events from any client (e.g., mobile app)
  socket.on("click", () => {
    console.log("Received click event");
    io.emit("performClick"); // Broadcast the click event to all connected clients (PC, etc.)
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Start the server and listen on the specified port
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
