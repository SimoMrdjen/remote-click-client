const io = require("socket.io-client");
const robot = require("robotjs");

// Connect to the Heroku WebSocket server
const socket = io("https://micic-fc43cdd8f709.herokuapp.com"); // Use your Heroku app's URL

socket.on("connect", () => {
  console.log("Connected to WebSocket server");
  updateUI("Connected to WebSocket server");
});

socket.on("performClick", () => {
  console.log("Click event received");
  updateUI("Click event received");
  robot.mouseClick(); // Simulate mouse click on the PC
});

socket.on("disconnect", () => {
  console.log("Disconnected from WebSocket server");
  updateUI("Disconnected from WebSocket server");
});

// Function to update the UI
function updateUI(message) {
  // Send updates to the server which will be reflected on the front-end
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/log", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify({ message }));
}
