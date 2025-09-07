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

// Funciones para manejar grupos {jornada_manana: [], jornada_tarde: []
function readGrupos() {
  return JSON.parse(fs.readFileSync("./data_json/grupos.json", "utf-8")); // Lee el archivo JSON y lo convierte en un objeto
}

// Necesitamos el modulo fs para manejar archivos
function writeGrupos(data) {
  fs.writeFileSync("./data_json/grupos.json", JSON.stringify(data, null, 2)); // Convierte el objeto en JSON y lo escribe en el archivo
}





// ------------------ RUTAS COORDINADOR ------------------



// ====== Login coordinador ======

router.post("/login", (req, res) => {
  const db = readDB(); // Lee la base de datos
  const { usuario, contrasena } = req.body; // Obtiene usuario y contraseña del cuerpo de la solicitud

  if (usuario === db.coordinadora.usuario && contrasena === db.coordinadora.contrasena) { // Si las credenciales son correctas
    return res.json({ mensaje: "Bienvenida coordinadora Karen :)" }); // Devuelve un mensaje de bienvenida
  }

  res.status(401).json({ error: "Credenciales inválidas" }); // Si las credenciales son incorrectas, devuelve un error 401
});




// ====== Ver campers ======

router.get("/campers", (req, res) => {
  const db = readDB(); // Lee la base de datos
  res.json(db.campers); // Devuelve la lista de campers en formato JSON
});




// ====== Ver trainers ======

router.get("/trainers", (req, res) => {
  const db = readDB(); // Lee la base de datos
  res.json(db.trainers);  // Devuelve la lista de trainers en formato JSON
});





// ====== Crear nueva ruta ======

router.post("/rutas", (req, res) => {
  const db = readDB(); // Lee la base de datos
  const { nombreRuta, modulos } = req.body; // Obtiene el nombre de la ruta y los módulos del cuerpo de la solicitud

  if (!nombreRuta || !Array.isArray(modulos)) { // Validación básica
    return res.status(400).json({ error: "Formato inválido" });   // Si el formato es inválido, devuelve un error 400
  }

  db.Rutas[nombreRuta] = modulos; // Agrega la nueva ruta a la base de datos
  writeDB(db);
  res.json({ mensaje: "Ruta creada ", ruta: db.Rutas[nombreRuta] }); // Devuelve un mensaje de éxito con la nueva ruta
});





//  ====== Asignar camper a grupo según su jornada y estado de estudiante ======

router.post("/grupos/asignar", (req, res) => {
  const db = readDB(); // Lee la base de datos
  const grupos = readGrupos(); // Lee los grupos
  const { idCamper } = req.body; // Obtiene el ID del camper del cuerpo de la solicitud
  const camper = db.campers.find(c => c.identificacion == idCamper); // Busca el camper por su ID

  if (!camper) return res.status(404).json({ error: "Camper no encontrado" }); // Si no se encuentra el camper, devuelve un error 404

  if (camper["estado del estudiante"].estado !== "Aprobado") { // Si el estado del estudiante no es aprobado
    return res.json({ mensaje: "El camper no está aprobado para grupos" }); // Devuelve un mensaje indicando que no está aprobado
  }

  const keys = Object.keys(grupos); // Obtiene las claves de los grupos
  const grupoSeleccionado = keys.find(k => k.includes(camper.jornada)); // Selecciona el grupo según la jornada del camper
  grupos[grupoSeleccionado][0].Miembro.push(`${camper.nombres} ${camper.apellidos}`); // Agrega el camper al grupo correspondiente
  writeGrupos(grupos); // Escribe los cambios en el archivo de grupos

  res.json({ mensaje: `Camper asignado al grupo ${grupoSeleccionado} ` }); // Devuelve un mensaje de éxito
});

module.exports = router;
