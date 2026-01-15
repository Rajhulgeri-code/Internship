// src/server.ts
import app from "./app";
import { connectDB } from "./config/db";
import { config } from "./config/env";

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Start server
    const PORT = config.PORT;
    app.listen(PORT, () => {
      console.log("✅ Server running on port " + PORT);
      console.log("🚀 Health check: http://localhost:" + PORT + "/api/health");
      console.log("🔐 Auth endpoints:");
      console.log("   - POST http://localhost:" + PORT + "/api/auth/register");
      console.log("   - POST http://localhost:" + PORT + "/api/auth/login");
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();