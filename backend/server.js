import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import { connectDB } from "./db/db.js";
import { router as todoRoutes } from "./routes/todoRoutes.js";
import { router as userRoutes } from "./routes/userRoutes.js";

const app = express();
app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true,
  }));
const port = 3000;
app.use(express.json());
app.use(cookieParser());

// database connection
connectDB();

app.get("/", (_, res) => res.send("Live server"));

app.use("/api/todos", todoRoutes);
app.use("/api/users", userRoutes);

app.listen(port, () =>
  console.log(`server listening on port http://localhost:${port}`),
);
