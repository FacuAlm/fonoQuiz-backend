import mongoose from "mongoose";

const DiagnosticoSchema = new mongoose.Schema(
  {
    fechaDiagnostico: {
      type: Date,
    },
    descripcion: {
      type: String,
      trim: true,
    },
    paciente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
    },
    juego: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Game",
      },
    ],
  },
  { timestamps: true }
);

const Diagnostico = mongoose.model("Diagnostico", DiagnosticoSchema);

export default Diagnostico;
