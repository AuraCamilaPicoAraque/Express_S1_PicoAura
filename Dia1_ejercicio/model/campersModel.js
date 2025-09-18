const mongoose = require("mongoose");

const CamperSchema = new mongoose.Schema({
  nombres: { type: String, required: true },
  apellidos: { type: String, required: true },
  direccion: String,
  telefonos: Number,
  acudiente: String,
  jornada: Number,
  estado: {
    type: String,
    default: "En proceso de inscripción",
  },
  riesgo: {
    type: String,
    default: "Bajo",
  },
});

module.exports = mongoose.model("Camper", CamperSchema);
