/*
-- DIA 1 - EJERCICIO CON BBDD CAMPUSLAND
*/


// Importacion de express en variable app

const express = require("express"); // Importa el framework Express
const fs = require("fs"); // Importa el módulo de sistema de archivos
const app = express();

app.use(express.json());

// Configura la respuesta JSON para que sea más legible
app.set("json spaces", 2);

// Definimos el puerto
const PORT = 3000;



// Importacion de rutas
const campersApartados = require('./apartados/campers');
const trainersApartados = require('./apartados/trainer');
const coordinadorApartados = require('./apartados/coordinador');

// Importacion de express en variable app

app.use('/campers', campersApartados);
app.use('/trainer', trainersApartados);
app.use('/coordinador', coordinadorApartados);


// === INICIO SERVIDOR ===

// Funciones auxiliares para manejar JSON

function readBD() {
    return JSON.parse(fs.readFileSync("./data_json/BasedDatosCampus.json", "utf-8")); // Lee el archivo JSON y lo convierte en un objeto
}

// Necesitamos el modulo fs para manejar archivos

function writeDB(data) {
    fs.writeFileSync("./data_json/BaseDatosCampus.json", JSON.stringify(data, null, 2)); // Convierte el objeto en JSON y lo escribe en el archivo
}






// ------------------ RUTAS CAMPERS ------------------


//  === Ver datos de los campers ===

app.get('/campers', (req, res) => {
    const db = readBD(); // Lee la base de datos
    res.json(db.campers); // Devuelve la lista de campers en formato JSON
});





//  ==== Registra nuevos campers ====

app.post('/campers', (req, res) => {
    const db = readBD(); // Lee la base de datos
    const nuevoCamper = req.body; // Obtiene los datos del nuevo camper del cuerpo de la solicitud

    nuevoCamper.identificacion = db.campers.length + 1; // le pone un ID al camper cuando se registra
    db.campers.push(nuevoCamper); // Añade el nuevo camper a la base de datos
    writeDB(db); // Escribe los cambios en la base de datos

    // Respuesta de confirmacion
    res.json({mensaje: "Camper a sido registrado", camper: nuevoCamper}); 
});





// ==== Buscar campers por identificación y devolver error si no existe  ====

app.get('/campers/:id', (req, res) => {
    const db = readBD(); // Lee la base de datos
    const camper = db.campers.find(c => c.identificacion == req.params.id); // Busca el camper por ID

    if (!camper) return res.status(404).json({error: "Camper no se encontro"}); // Si no se encuentra, devuelve un error 404
    res.json(camper); // Si se encuentra, devuelve los datos del camper
})





// ==== Actualizar datos de un camper por identificación ====

app.put('/campers/:id', (req, res) => {
    const db = readBD(); // Lee la base de datos
    const camper = db.campers.find(c => c.identificacion == req.params.id); // Busca el camper por ID

    if (!camper) return res.status(404).json({error: "Camper no ha sido encontrado"}); // Si no se encuentra, devuelve un error 404

    Object.assign(camper, req.body); // Mezcla los datos nuevos con los viejos
    writeDB(db); // Escribe los cambios en la base de datos

    res.json({mensaje: "Camper ha sido actualizado", camper}); // Devuelve una respuesta de confirmación
})





// ==== Eliminar un camper por identificación ====

app.delete('/campers/:id', (req, res) => {
    const db = readBD(); // Lee la base de datos
    const index = db.campers.findIndex(c => c.identificacion == req.params.id); // Busca el índice del camper por ID

    if (index === -1) return res.status(404).json({error: "Camper no ha sido encontrado"}); // Si no se encuentra, devuelve un error 404

    db.campers.splice(index, 1); // Elimina el camper de la base de datos
    writeDB(db); // Escribe los cambios en la base de datos

    res.json({mensaje: "Camper ha sido eliminado"}); // Devuelve una respuesta de confirmación
});




// ====== SERVIDOR ======

app.listen(PORT, () => {
  console.log(`EL servidor esta inicilizando`);
});