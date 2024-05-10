import Patient from "../models/Patient.js";
import Diagnosis from "../models/Diagnosis.js";
import Game from "../models/Game.js";

export class GameController {
  static createGame = async (req, res) => {
    const diagnosis = await Diagnosis.findById(req.params.diagnosisid);
    if (!diagnosis) {
      return res.status(404).json({ message: "Diagnóstico no encontrado" });
    }

    try {
      const game = new Game(req.body);
      game.diagnostico = diagnosis.id;
      await game.save();
      return res.send("Juego creado correctamente");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static getDiagnosisGames = async (req, res) => {
    try {
      const games = await Game.find({
        diagnostico: req.params.diagnosisid,
      }).populate("diagnostico");
      res.json(games);
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static getGameById = async (req, res) => {
    try {
      const game = await Game.findById(req.params.gameid).populate(
        "diagnostico"
      );
      if (!game) {
        return res.status(404).json({ message: "Juego no encontrado" });
      }

      if (game.diagnostico.id !== req.params.diagnosisid) {
        return res.status(404).json({ message: "Juego no encontrado" });
      }

      res.json(game);
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static updateGame = async (req, res) => {
    try {
      const game = await Game.findByIdAndUpdate(req.params.gameid, req.body);

      if (!game) {
        return res.status(404).json({ message: "Juego no encontrado" });
      }

      if (game.diagnostico.id !== req.params.diagnosisid) {
        return res.status(404).json({ message: "Juego no encontrado" });
      }

      res.send("Juego actualizado correctamente");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static deleteGame = async (req, res) => {
    try {
      const game = await Game.findByIdAndDelete(req.params.gameid);
      if (!game) {
        return res.status(404).json({ message: "Juego no encontrado" });
      }

      if (game.diagnostico.id !== req.params.diagnosisid) {
        return res.status(404).json({ message: "Juego no encontrado" });
      }

      res.send("Juego eliminado correctamente");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };
  
}
