import Patient from "../models/Patient.js";
import Diagnosis from "../models/Diagnosis.js";

export class DiagnosisController {
  static createDiagnosis = async (req, res) => {
    const patient = await Patient.findById(req.params.patientid);
    if (!patient) {
      return res.status(404).json({ message: "Paciente no encontrado" });
    }

    try {
      const diagnosis = new Diagnosis(req.body);
      diagnosis.paciente = patient.id;
      patient.diagnosticos.push(diagnosis.id);
      await Promise.allSettled([diagnosis.save(), patient.save()]);
      return res.send("Diagnóstico creado correctamente");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static getPacientDiagnosis = async (req, res) => {
    try {
      const diagnosis = await Diagnosis.find({
        paciente: req.params.patientid,
      }).populate("paciente");
      return res.json(diagnosis);
    } catch (error) {
      return res.status(500).json({ error: "Hubo un error" });
    }
  };

  static getDiagnosisById = async (req, res) => {
    try {
      const diagnosis = await Diagnosis.findById(
        req.params.diagnosisid
      ).populate("paciente");
      if (!diagnosis) {
        return res.status(404).json({ message: "Diagnóstico no encontrado" });
      }

      if (diagnosis.paciente.id !== req.params.patientid) {
        return res.status(404).json({ message: "Diagnóstico no encontrado" });
      }
      return res.json(diagnosis);
    } catch (error) {
      return res.status(500).json({ error: "Hubo un error" });
    }
  };

  static updateDiagnosis = async (req, res) => {
    try {
      const diagnosis = await Diagnosis.findByIdAndUpdate(
        req.params.diagnosisid,
        req.body
      );

      if (!diagnosis) {
        return res.status(404).json({ message: "Diagnóstico no encontrado" });
      }

      return res.send("Diagnóstico actualizado correctamente");
    } catch (error) {
      return res.status(500).json({ error: "Hubo un error" });
    }
  };

  static deleteDiagnosis = async (req, res) => {
    try {
      const diagnosis = await Diagnosis.findByIdAndDelete(
        req.params.diagnosisid
      );
      if (!diagnosis) {
        return res.status(404).json({ message: "Diagnóstico no encontrado" });
      }

      const patient = await Patient.findById(req.params.patientid);
      patient.diagnosticos = patient.diagnosticos.filter(
        (id) => id.toString() !== req.params.diagnosisid
      );
      await patient.save();
      return res.send("Diagnóstico eliminado correctamente");
    } catch (error) {
      return res.status(500).json({ error: "Hubo un error" });
    }
  };
}
