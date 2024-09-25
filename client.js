const io = require("socket.io-client");
const robot = require("robotjs"); // Use this to simulate a mouse click on the PC

// Connect to the Heroku WebSocket server (use your Heroku app's URL)
const socket = io("https://micic-fc43cdd8f709.herokuapp.com");

socket.on("connect", () => {
  console.log("Connected to WebSocket server");
  updateUI("Connected to WebSocket server");
});

// Listen for 'performClick' events broadcasted by the server
socket.on("performClick", () => {
  console.log("Click event received");
  updateUI("Click event received");
  robot.mouseClick(); // Simulate a mouse click on the PC
});

// Handle disconnection
socket.on("disconnect", () => {
  console.log("Disconnected from WebSocket server");
  updateUI("Disconnected from WebSocket server");
});

// Function to update the UI (using basic logging here, but you can expand it to your actual UI)
function updateUI(message) {
  console.log("UI Update:", message);
}
