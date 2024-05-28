import Paciente from "../models/Paciente.js";
import Diagnostico from "../models/Diagnostico.js";

const crearDiagnostico = async (req, res) => {
  const { id } = req.params;
  const diagnostico = req.body;

  const nuevoDiagnostico = new Diagnostico(diagnostico);
  nuevoDiagnostico.paciente = id;

  try {
    await nuevoDiagnostico.save();

    const paciente = await Paciente.findById(id);
    paciente.diagnosticos.push(nuevoDiagnostico._id);

    await paciente.save();

    res.status(201).json(nuevoDiagnostico);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const obtenerDiagnosticos = async (req, res) => {
  const { id } = req.params;

  try {
    const paciente = await Paciente.findById(id).populate("diagnosticos");

    res.status(200).json(paciente.diagnosticos);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const obtenerDiagnostico = async (req, res) => {
  const { id, diagnosticoId } = req.params;

  try {
    const diagnostico = await Diagnostico.findById(diagnosticoId);

    res.status(200).json(diagnostico);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const actualizarDiagnostico = async (req, res) => {
  const { id, diagnosticoId } = req.params;

  try {
    const diagnostico = await Diagnostico.findByIdAndUpdate(
      diagnosticoId,
      req.body,
      { new: true }
    );

    if (!diagnostico) {
      return res.status(404).json({ message: "Diagnóstico no encontrado" });
    }

    res.json(diagnostico);
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor", error });
  }
};

const eliminarDiagnostico = async (req, res) => {
  const { id, diagnosticoId } = req.params;

  try {
    const diagnostico = await Diagnostico.findByIdAndDelete(diagnosticoId);

    if (!diagnostico) {
      return res.status(404).json({ message: "Diagnóstico no encontrado" });
    }

    const paciente = await Paciente.findById(id);
    paciente.diagnosticos = paciente.diagnosticos.filter(
      (diagnostico) => diagnostico.toString() !== diagnosticoId
    );

    await paciente.save();

    res.json({ message: "Diagnóstico eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor", error });
  }
};

export {
  crearDiagnostico,
  obtenerDiagnosticos,
  obtenerDiagnostico,
  actualizarDiagnostico,
  eliminarDiagnostico,
};

// export class DiagnosisController {
//   static createDiagnosis = async (req, res) => {
//     const patient = await Patient.findById(req.params.patientid);
//     if (!patient) {
//       return res.status(404).json({ message: "Paciente no encontrado" });
//     }

//     try {
//       const diagnosis = new Diagnosis(req.body);
//       diagnosis.paciente = patient.id;
//       patient.diagnosticos.push(diagnosis.id);
//       await Promise.allSettled([diagnosis.save(), patient.save()]);
//       return res.send("Diagnóstico creado correctamente");
//     } catch (error) {
//       res.status(500).json({ error: "Hubo un error" });
//     }
//   };

//   static getPacientDiagnosis = async (req, res) => {
//     try {
//       const diagnosis = await Diagnosis.find({
//         paciente: req.params.patientid,
//       }).populate("paciente");
//       return res.json(diagnosis);
//     } catch (error) {
//       return res.status(500).json({ error: "Hubo un error" });
//     }
//   };

//   static getDiagnosisById = async (req, res) => {
//     try {
//       const diagnosis = await Diagnosis.findById(
//         req.params.diagnosisid
//       ).populate("paciente");
//       if (!diagnosis) {
//         return res.status(404).json({ message: "Diagnóstico no encontrado" });
//       }

//       if (diagnosis.paciente.id !== req.params.patientid) {
//         return res.status(404).json({ message: "Diagnóstico no encontrado" });
//       }
//       return res.json(diagnosis);
//     } catch (error) {
//       return res.status(500).json({ error: "Hubo un error" });
//     }
//   };

//   static updateDiagnosis = async (req, res) => {
//     try {
//       const diagnosis = await Diagnosis.findByIdAndUpdate(
//         req.params.diagnosisid,
//         req.body
//       );

//       if (!diagnosis) {
//         return res.status(404).json({ message: "Diagnóstico no encontrado" });
//       }

//       return res.send("Diagnóstico actualizado correctamente");
//     } catch (error) {
//       return res.status(500).json({ error: "Hubo un error" });
//     }
//   };

//   static deleteDiagnosis = async (req, res) => {
//     try {
//       const diagnosis = await Diagnosis.findByIdAndDelete(
//         req.params.diagnosisid
//       );
//       if (!diagnosis) {
//         return res.status(404).json({ message: "Diagnóstico no encontrado" });
//       }

//       const patient = await Patient.findById(req.params.patientid);
//       patient.diagnosticos = patient.diagnosticos.filter(
//         (id) => id.toString() !== req.params.diagnosisid
//       );
//       await patient.save();
//       return res.send("Diagnóstico eliminado correctamente");
//     } catch (error) {
//       return res.status(500).json({ error: "Hubo un error" });
//     }
//   };
// }
