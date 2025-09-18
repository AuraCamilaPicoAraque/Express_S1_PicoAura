const Camper = require("../model/campersModel");

class CamperController {
  // Obtener todos los campers
  async getCampers(req, res) {
    try {
      const campers = await Camper.find();
      res.json(campers);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener campers", error });
    }
  }

  // Crear un camper
  async createCamper(req, res) {
    try {
      const nuevoCamper = new Camper(req.body);
      await nuevoCamper.save();
      res.status(201).json({ message: "Camper creado", camper: nuevoCamper });
    } catch (error) {
      res.status(400).json({ message: "Error al crear camper", error });
    }
  }

  // Editar camper
  async updateCamper(req, res) {
    try {
      const camper = await Camper.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!camper) {
        return res.status(404).json({ message: "Camper no encontrado" });
      }
      res.json({ message: "Camper actualizado", camper });
    } catch (error) {
      res.status(400).json({ message: "Error al actualizar camper", error });
    }
  }

  // Eliminar camper
  async deleteCamper(req, res) {
    try {
      const camper = await Camper.findByIdAndDelete(req.params.id);
      if (!camper) {
        return res.status(404).json({ message: "Camper no encontrado" });
      }
      res.json({ message: "Camper eliminado" });
    } catch (error) {
      res.status(400).json({ message: "Error al eliminar camper", error });
    }
  }
}

module.exports = new CamperController();
