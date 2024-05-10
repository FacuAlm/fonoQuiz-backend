import mongoose from "mongoose";

const gameSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    diagnostico: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Diagnosis",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Game", gameSchema);
