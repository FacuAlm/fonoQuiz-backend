import Paciente from "../models/Paciente.js";
import Diagnostico from "../models/Diagnostico.js";

const crearPaciente = async (req, res) => {
  const paciente = req.body;
  paciente.creador = req.usuario._id;

  const nuevoPaciente = new Paciente(paciente);

  try {
    await nuevoPaciente.save();

    res.status(201).json(nuevoPaciente);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const obtenerPacientes = async (req, res) => {
  try {
    const pacientes = await Paciente.find()
      .where("creador")
      .equals(req.usuario._id);

    res.json(pacientes);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const obtenerPaciente = async (req, res) => {
  const { id } = req.params;

  try {
    const paciente = await Paciente.findById(id).populate("diagnosticos");

    res.status(200).json(paciente);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const actualizarPaciente = async (req, res) => {
  try {
    const paciente = await Paciente.findByIdAndUpdate(req.params.id, req.body);

    if (!paciente) {
      return res.status(404).json({ message: "Paciente no encontrado" });
    }

    await paciente.save();

    res.json(paciente);
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor", error });
  }
};

const eliminarPaciente = async (req, res) => {
  // const { id } = req.params;

  // if (!mongoose.Types.ObjectId.isValid(id))
  //   return res.status(404).send(`No existe un paciente con el id: ${id}`);

  // await Paciente.findByIdAndRemove(id);

  // res.json({ message: "Paciente eliminado exitosamente." });

  const paciente = await Paciente.findById(req.params.id);

  if (!paciente) {
    return res.status(404).json({ message: "Paciente no encontrado" });
  }

  try {
    // Eliminar pacientes, diagnósticos y mediciones
    await Paciente.deleteOne({ _id: paciente._id });
    await Diagnostico.deleteMany({ _id: { $in: paciente.diagnosticos } });

    res.json({ message: "Paciente eliminado exitosamente." });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor", error });
  }
};

export {
  crearPaciente,
  obtenerPacientes,
  obtenerPaciente,
  actualizarPaciente,
  eliminarPaciente,
};
