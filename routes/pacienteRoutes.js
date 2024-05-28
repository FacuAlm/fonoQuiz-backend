import { Router } from "express";
import {
  crearPaciente,
  obtenerPacientes,
  obtenerPaciente,
  actualizarPaciente,
  eliminarPaciente,
} from "../controllers/PacienteController.js";

import {
  crearDiagnostico,
  obtenerDiagnosticos,
  obtenerDiagnostico,
  actualizarDiagnostico,
  eliminarDiagnostico,
} from "../controllers/DiagnosticoController.js";

import checkAuth from "../middlewares/checkAuth.js";

const router = Router();

router.post("/", checkAuth, crearPaciente);
router.get("/", checkAuth, obtenerPacientes);
router.get("/:id", checkAuth, obtenerPaciente);
router.put("/:id", checkAuth, actualizarPaciente);
router.delete("/:id", checkAuth, eliminarPaciente);

router.post("/:id/diagnosticos", checkAuth, crearDiagnostico);
router.get("/:id/diagnosticos", checkAuth, obtenerDiagnosticos);
router.get("/:id/diagnosticos/:diagnosticoId", checkAuth, obtenerDiagnostico);
router.put("/:id/diagnosticos/:diagnosticoId", checkAuth, actualizarDiagnostico);
router.delete("/:id/diagnosticos/:diagnosticoId", checkAuth, eliminarDiagnostico);

export default router;
