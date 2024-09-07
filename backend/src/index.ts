import express, { Application, Request, Response } from "express";
import axios from "axios";
import cors from "cors";
import { fetchRawTextByFname } from "./util/farcaster";
import dotenv from "dotenv";

const app: Application = express();
const PORT = process.env.PORT || 3000;
dotenv.config();
// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Health check route
app.get("/health", (req: Request, res: Response) => {
  res.status(200).send("OK");
});

// Example route to make an API call
app.get("/api/data", async (req: Request, res: Response) => {
  try {
    // You can define a type for response data if known
    const response = await axios.get("https://api.example.com/data");
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.post("/api/data", (req: Request, res: Response) => {
  console.log("worked");
  console.log(process.env.PRIVATE_KEY);
  res.json("Worked");
});

app.get("/api/social/farcaster", async (req: Request, res: Response) => {
  try {
    const fname = req.query.fname as string;
    const response = await fetchRawTextByFname(fname);
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
