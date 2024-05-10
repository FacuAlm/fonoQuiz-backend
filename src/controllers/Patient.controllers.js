import Patient from "../models/Patient.js";


export class PatientController {
  static createPatient = async (req, res) => {
    const patient = new Patient(req.body);

    try {
      await patient.save();
      return res.send("Paciente creado correctamente");
    } catch (error) {
      console.log(error);
    }
  };

  static getAllPatients = async (req, res) => {
    try {
      const patients = await Patient.find();
      return res.json(patients);
    } catch (error) {
      console.log(error);
    }
  };

  static getPatientById = async (req, res) => {
    try {
      const patient = await Patient.findById(req.params.id).populate("diagnosticos");
      if (!patient) {
        const error = new Error("Paciente no encontrado");
        return res.status(404).json({ message: error.message });
      }
      return res.json(patient);
    } catch (error) {
      console.log(error);
    }
    return res.send("Get patient by id");
  };

  static updatePatient = async (req, res) => {
    try {
      const patient = await Patient.findByIdAndUpdate(req.params.id, req.body);
      if (!patient) {
        const error = new Error("Paciente no encontrado");
        return res.status(404).json({ message: error.message });
      }
      await patient.save();
      return res.send("Paciente actualizado correctamente");
    } catch (error) {
      console.log(error);
    }
  };

  static deletePatient = async (req, res) => {
    try {
      const patient = await Patient.findByIdAndDelete(req.params.id);
      if (!patient) {
        const error = new Error("Paciente no encontrado");
        return res.status(404).json({ message: error.message });
      }
      return res.send("Paciente eliminado correctamente");
    } catch (error) {
      console.log(error);
    }
  };
}
