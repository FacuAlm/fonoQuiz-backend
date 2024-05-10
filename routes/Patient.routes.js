import { Router } from "express";
import { body, param } from "express-validator";
import { PatientController } from "../controllers/Patient.controllers.js";
import { DiagnosisController } from "../controllers/Diagnosis.controllers.js";
import { GameController } from "../controllers/Game.controllers.js";
import { handleInputErrors } from "../middlewares/validation.js";
import checkAuth from "../middlewares/checkAuth.js";

const router = Router();
// routes for patients
router.post(
  "/",
  checkAuth,
  body("nombre").notEmpty().withMessage("El nombre es requerido"),
  body("apellido").notEmpty().withMessage("El apellido es requerido"),
  handleInputErrors,
  PatientController.createPatient
);
router.get("/", PatientController.getAllPatients);
router.get(
  "/:id",
  checkAuth,
  param("id").isMongoId().withMessage("El id no es válido"),
  handleInputErrors,
  PatientController.getPatientById
);

router.put(
  "/:id",
  checkAuth,
  param("id").isMongoId().withMessage("El id no es válido"),
  body("nombre").notEmpty().withMessage("El nombre es requerido"),
  body("apellido").notEmpty().withMessage("El apellido es requerido"),
  handleInputErrors,
  PatientController.updatePatient
);

router.delete(
  "/:id",
  checkAuth,
  param("id").isMongoId().withMessage("El id no es válido"),
  handleInputErrors,
  PatientController.deletePatient
);

// routes for diagnosis

router.post(
  "/:patientid/diagnosticos",
  checkAuth,
  param("patientid").isMongoId().withMessage("El id no es válido"),
  body("descripcion").notEmpty().withMessage("La descripción es requerida"),
  handleInputErrors,
  DiagnosisController.createDiagnosis
);

router.get(
  "/:patientid/diagnosticos",
  checkAuth,
  param("patientid").isMongoId().withMessage("El id no es válido"),
  handleInputErrors,
  DiagnosisController.getPacientDiagnosis
);

router.get(
  "/:patientid/diagnosticos/:diagnosisid",
  checkAuth,
  param("patientid").isMongoId().withMessage("El id no es válido"),
  param("diagnosisid").isMongoId().withMessage("El id no es válido"),
  handleInputErrors,
  DiagnosisController.getDiagnosisById
);

router.put(
  "/:patientid/diagnosticos/:diagnosisid",
  checkAuth,
  param("patientid").isMongoId().withMessage("El id no es válido"),
  param("diagnosisid").isMongoId().withMessage("El id no es válido"),
  body("descripcion").notEmpty().withMessage("La descripción es requerida"),
  handleInputErrors,
  DiagnosisController.updateDiagnosis
);

router.delete(
  "/:patientid/diagnosticos/:diagnosisid",
  checkAuth,
  param("patientid").isMongoId().withMessage("El id no es válido"),
  param("diagnosisid").isMongoId().withMessage("El id no es válido"),
  handleInputErrors,
  DiagnosisController.deleteDiagnosis
);

// routes for games

//Crear un juego seria asignar un juego a un paciente. Ya van a tener un juego creado, no es necesario crear un juego. Los pacientes van a jugar cada vez que vayan a un diagnóstico.
router.post(
  "/:diagnosisid/juegos",
  checkAuth,
  param("diagnosisid").isMongoId().withMessage("El id no es válido"),
  handleInputErrors,
  GameController.createGame
);

router.get(
  "/:diagnosisid/juegos",
  checkAuth,
  param("diagnosisid").isMongoId().withMessage("El id no es válido"),
  handleInputErrors,
  GameController.getDiagnosisGames
);

router.get(
  "/:diagnosisid/juegos/:gameid",
  checkAuth,
  param("diagnosisid").isMongoId().withMessage("El id no es válido"),
  param("gameid").isMongoId().withMessage("El id no es válido"),
  handleInputErrors,
  GameController.getGameById
);

router.put(
  "/:diagnosisid/juegos/:gameid",
  checkAuth,
  param("diagnosisid").isMongoId().withMessage("El id no es válido"),
  param("gameid").isMongoId().withMessage("El id no es válido"),
  body("puntaje").notEmpty().withMessage("El puntaje es requerido"),
  handleInputErrors,
  GameController.updateGame
);

router.delete(
  "/:diagnosisid/juegos/:gameid",
  checkAuth,
  param("diagnosisid").isMongoId().withMessage("El id no es válido"),
  param("gameid").isMongoId().withMessage("El id no es válido"),
  handleInputErrors,
  GameController.deleteGame
);

export default router;
