import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import {
  userRouter,
  carRouter,
  insuranceRouter,
} from "./api/routes/index.js";
import "dotenv/config";

//config enviroments 
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// dotenv.config({
//   path:path.resolve(__dirname, `${process.env.NODE_ENV}.env`)
// })

/**
 * Mongoose
 */

// Connect to db
const dbConnection = process.env.ENV_DB_CONNECTION;
console.log(dbConnection)

await mongoose.connect(dbConnection);

// Listener to connection error
mongoose.connection.on("error", function (e) {
  console.error("ERROR: ", e);
});

/**
 * Express
 */
const app = express();

//Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (request, response) => {
  response.send("API SEGURO-VEHICULAR-TRACKING");
});

app.use("/api/users", userRouter);
app.use("/api/data", carRouter);
app.use("/api/data", insuranceRouter);

const PORT = 5001;
// Launch server
app.listen(PORT, () => {
  console.log("Iniatialized server!!");
});

