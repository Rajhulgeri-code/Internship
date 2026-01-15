import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// Inline health route for testing
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend is running 🚀"
  });
});

export default app;