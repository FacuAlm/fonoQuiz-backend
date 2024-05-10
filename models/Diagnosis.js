import mongoose from "mongoose";

const diagnosisSchema = new mongoose.Schema(
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

export default mongoose.model("Diagnosis", diagnosisSchema);
