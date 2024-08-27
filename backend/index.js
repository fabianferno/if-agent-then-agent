const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

app.use(express.json()); // Middleware to parse JSON request bodies

// Example route to make an API call
app.get("/api/data", async (req, res) => {
  try {
    const response = await axios.get("https://api.example.com/data");
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
