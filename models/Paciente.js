import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    fechaIngreso: {
      type: Date,
      default: Date.now,
    },
    nombre: {
      type: String,
      trim: true,
    },
    apellido: {
      type: String,
      trim: true,
    },
    fechaNacimiento: {
      type: Date,
    },

    edad: {
      type: Number,
      trim: true,
    },
    motivoConsulta:{
      type: String,
      trim: true,
    },
    diagnostico: {
      type: String,
      trim: true,
    },
    diagnosticos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Diagnostico",
      },
    ],
    creador: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
    },
  },
  { timestamps: true }
);

const Paciente = mongoose.model("Paciente", patientSchema);

export default Paciente;
