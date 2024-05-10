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
    patologias: {
      type: String,
      trim: true,
    },
    diagnosticos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Diagnosis",
      },
    ],
  },
  { timestamps: true }
);

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;
