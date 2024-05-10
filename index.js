import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import PatientRoutes from "./routes/patientsRoutes.js";
import UserRoutes from "./routes/userRoutes.js";
import cors from "cors";

const app = express();
app.use(express.json());
dotenv.config();

connectDB();

const CorsOptions = {
  origin: function (origin, callback) {
    const whitelist = ["https://fono-quiz-frontend.vercel.app"];

    if (process.argv[2] === "--api") {
      whitelist.push(undefined);
    }

    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Error de CORS"));
    }
  },
};

app.use(cors(CorsOptions));

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
