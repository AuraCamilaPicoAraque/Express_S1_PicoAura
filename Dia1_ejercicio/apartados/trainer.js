// Importar módulos necesarios
const express = require("express");
const fs = require("fs");
const router = express.Router();


// Utilizamos router de express para definir las rutas de trainers ya que si se utiliza app se genera conflicto con las otras rutas cuando se importan en app.js




//  ====== Funciones auxiliares para manejar JSON  ======

function readDB() {
  return JSON.parse(fs.readFileSync("./data_json/BaseDatosCampus.json", "utf-8"));  // Lee el archivo JSON y lo convierte en un objeto
}

// Necesitamos el modulo fs para manejar archivos
function writeDB(data) {
  fs.writeFileSync("./data_json/BaseDatosCampus.json", JSON.stringify(data, null, 2)); // Convierte el objeto en JSON y lo escribe en el archivo
}

// Funciones auxiliares para manejar notas
function readNotas() {
  return JSON.parse(fs.readFileSync("./data_json/notas.json", "utf-8")); // Lee el archivo JSON y lo convierte en un objeto
}

// Necesitamos el modulo fs para manejar archivos
function writeNotas(data) {
  fs.writeFileSync("./data_json/notas.json", JSON.stringify(data, null, 2)); // Convierte el objeto en JSON y lo escribe en el archivo
}





// ------------------ RUTAS TRAINERS ------------------


// ====== Ver todos los trainers ======

router.get("/", (req, res) => {
  const db = readDB(); // Lee la base de datos
  res.json(db.trainers); // Devuelve la lista de trainers en formato JSON
});





// ======== Registrar nuevo trainer ========

router.post("/", (req, res) => {
  const db = readDB(); // Lee la base de datos

  const nuevoTrainer = { 
    ID: db.trainers.length > 0 ? db.trainers[db.trainers.length - 1].ID + 1 : 1, // le pone un ID al trainer cuando se registra
    nombres: req.body.nombres, 
    Ruta: "",
    "Jornada del trainer": req.body.jornada 
  };

  db.trainers.push(nuevoTrainer); // Añade el nuevo trainer a la base de datos
  writeDB(db); // Guarda los cambios en el archivo JSON

  res.json({ mensaje: "Trainer registrado ", trainer: nuevoTrainer }); // Respuesta de confirmacion
});





// ====== Login trainer ======

router.post("/login", (req, res) => {
  const db = readDB(); // Lee la base de datos
  const { ID } = req.body; // Obtiene la identificación del cuerpo de la solicitud
  const trainer = db.trainers.find(t => t.ID == ID); // Busca el trainer por ID

  if (!trainer) return res.status(404).json({ error: "Trainer no encontrado" }); // Si no se encuentra, devuelve un error 404

  res.json({ mensaje: `Bienvenido ${trainer.nombres}`, trainer }); // Si se encuentra, devuelve un mensaje de bienvenida y los datos del trainer
});





// ===== Ver notas de campers ======
router.get("/notas", (req, res) => {
  const notas = readNotas(); // Lee las notas desde el archivo JSON
  res.json(notas.NotasCamper);  // Devuelve la lista de notas en formato JSON
});






// ==== Asignar notas a campers ======

router.post("/notas", (req, res) => {
  const db = readDB(); // Lee la base de datos
  const notas = readNotas(); // Lee las notas desde el archivo JSON
  const { nombre, proyecto, filtro, otros } = req.body; // Obtiene los datos del cuerpo de la solicitud

  const registro = notas.NotasCamper.find(n => n.Nombre === nombre); // Busca el registro del camper por nombre
  if (!registro) return res.status(404).json({ error: "Camper no encontrado en notas" }); // Si no se encuentra, devuelve un error 404 que significa que no existe

  // Calcula la nota final y actualiza el registro

  const notaFinal = (proyecto * 0.6) + (filtro * 0.3) + (otros * 0.1); // Ejemplo de cálculo de nota final
  registro.Notas = { proyecto, filtro, otros, "Nota Final": notaFinal }; // Actualiza las notas en el registro

  const camper = db.campers.find(c => c.nombres === nombre); // Busca el camper por nombre para actualizar su estado

  if (camper) { // Si se encuentra el camper, actualiza su estado basado en la nota final
    if (notaFinal >= 60) {
      camper["estado del estudiante"].estado = notaFinal === 60 ? "Cursando" : "Aprobado"; // Si la nota es exactamente 60, el estado es "Cursando", de lo contrario es "Aprobado"
      registro.Notas.Riesgo = notaFinal === 60 ? "Medio" : "Bajo"; // Riesgo "Medio" si la nota es 60, "Bajo" si es mayor

    } else {
      camper["estado del estudiante"].estado = "Reprobado"; // Si la nota es menor a 60, el estado es "Reprobado"
      registro.Notas.Riesgo = "Alto"; // Riesgo "Alto" si la nota es menor a 60
    }
  }

  writeNotas(notas); // Guarda las notas actualizadas
  writeDB(db); // Guarda los cambios en la base de datos  

  res.json({ mensaje: "Nota asignada ", camper: nombre, notaFinal }); // Respuesta de confirmacion
}); 




module.exports = router;
