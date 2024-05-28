import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import pacienteRoutes from "./routes/pacienteRoutes.js";
// import diagnosticoRoutes from "./routes/diagnosticoRoutes.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import cors from "cors";

const app = express();
app.use(express.json());
dotenv.config();

app.use(cors());
connectDB();

app.get("/", (req, res) => {
  res.send("Hello World");
});

//routes
app.use("/api/pacientes", pacienteRoutes);
// app.use("/api/diagnosticos", diagnosticoRoutes);
app.use("/api/usuarios", usuarioRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
