import express from "express";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import PatientRoutes from "../routes/Patient.Routes.js";
import UserRoutes from "../routes/User.Routes.js";
import cors from "cors";

dotenv.config();

connectDB();

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

//routes
app.use("/api/users", UserRoutes);
app.use("/api/patients", PatientRoutes);


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
