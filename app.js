import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import http from "http";
import router from "./routes/auth.routes.js";

// Load environment variables from config.env file
dotenv.config({ path: "./config.env" });

// Initialize the Express app
const app = express();

// Middleware setup
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  cors({
    origin: "*",
    methods: ["GET", "PATCH", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define a simple route
app.get("/", (req, res) => {
  res.send("Hello, This is android backend...");
});

// Use routes from the routes directory
app.use("/api/android/",router);

// Replace <password> in DBURI with the actual password from environment variables
const DB = process.env.DBURI.replace("<db_password>", process.env.DBPASSWORD);

// Function to connect to the database
const connectDB = async () => {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB connection is successful");
  } catch (err) {
    console.error("DB connection failed:", err.message);
    process.exit(1); // Exit process with failure
  }
};

// Connect to the database
connectDB();

// Create the HTTP server
const server = http.createServer(app);

// Start the server
const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log(`App running on port ${port} ...`);
});

export default app;
