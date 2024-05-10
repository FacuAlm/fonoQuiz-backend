import express from "express";
import { registrar, autenticar, perfil } from "../controllers/usuarioController.js";
import checkAuth from "../middlewares/checkAuth.js";

const router = express.Router();

router.post("/", registrar);
router.post("/login", autenticar);

router.get("/perfil", checkAuth, perfil);



export default router;
