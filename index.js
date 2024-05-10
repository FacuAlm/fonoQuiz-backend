import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import PatientRoutes from "./routes/patientsRoutes.js";
import UserRoutes from "./routes/userRoutes.js";
import cors from "cors";


const app = express();
app.use(express.json());
dotenv.config();

app.use(cors())
connectDB();




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
