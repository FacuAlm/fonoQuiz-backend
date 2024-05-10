import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import PatientRoutes from "./routes/Patient.Routes.js";
import UserRoutes from "./routes/User.Routes.js";
import cors from "cors";

dotenv.config();

connectDB();

const app = express();
app.use(cors({ origin: "*" }));

app.use(express.json());

//routes
app.use("/api/users", UserRoutes);
app.use("/api/patients", PatientRoutes);

export default app;
