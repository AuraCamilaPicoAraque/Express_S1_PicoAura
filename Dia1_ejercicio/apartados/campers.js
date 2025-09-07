// Importar módulos necesarios
const express = require("express");
const fs = require("fs");
const router = express.Router();


// Utilizamos router de express para definir las rutas de campers ya que si se utiliza app se genera conflicto con las otras rutas cuando se importan en app.js


//  ====== Funciones auxiliares para manejar JSON  ======

function readDB() {
  return JSON.parse(fs.readFileSync("./data_json/BaseDatosCampus.json", "utf-8")); // Lee el archivo JSON y lo convierte en un objeto
}

// Necesitamos el modulo fs para manejar archivos

function writeDB(data) {
  fs.writeFileSync("./data_json/BaseDatosCampus.json", JSON.stringify(data, null, 2)); // Convierte el objeto en JSON y lo escribe en el archivo
}




// ------------------ RUTAS CAMPERS ------------------


// ==== Ver todos los campers ====

router.get("/", (req, res) => {
  const db = readDB(); // Lee la base de datos
  res.json(db.campers); // Devuelve la lista de campers en formato JSON
});




// ==== Registrar nuevo camper ====

router.post("/", (req, res) => { // Ruta para registrar un nuevo camper
  const db = readDB(); // Lee la base de datos

  const nuevoCamper = {
    identificacion: db.campers.length > 0 ? db.campers[db.campers.length - 1].identificacion + 1 : 1, // le pone un ID al camper cuando se registra
    nombres: req.body.nombres, 
    apellidos: req.body.apellidos,
    direccion: req.body.direccion,
    telefonos: req.body.telefonos,
    acudiente: req.body.acudiente,
    "estado del estudiante": { estado: "en proceso de inscripción", riesgo: "Bajo" }, // Estado inicial del camper
    jornada: req.body.jornada, 
    Ruta: "" 
  };

  db.campers.push(nuevoCamper); // Añade el nuevo camper a la base de datos
  writeDB(db); // Guarda los cambios en el archivo JSON

  res.json({ mensaje: "Camper inscrito ", camper: nuevoCamper }); // Respuesta de confirmacion
});





// ==== Iniciar para el camper ====

//  ====== Login camper  ======

router.post("/login", (req, res) => {
  const db = readDB(); // Lee la base de datos
  const { identificacion } = req.body; // Obtiene la identificación del cuerpo de la solicitud
  const camper = db.campers.find(c => c.identificacion == identificacion); // Busca el camper por ID

  if (!camper) return res.status(404).json({ error: "Camper no encontrado" }); // Si no se encuentra, devuelve un error 404

  res.json({ mensaje: `Bienvenido ${camper.nombres} ${camper.apellidos}`, camper }); // Si se encuentra, devuelve un mensaje de bienvenida y los datos del camper
});



module.exports = router;
