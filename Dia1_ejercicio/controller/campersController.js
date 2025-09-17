// ------------------ RUTAS CAMPERS ------------------


//  === Ver datos de los campers ===

app.get('/campers', (req, res) => {
    const db = connectDB(); // Lee la base de datos
    res.json(db.camper); // Devuelve la lista de campers en formato JSON
    disconnectDB(); // Cierra la conexión a la base de datos
});



//  ==== Registra nuevos campers ====

app.post('/campers', (req, res) => {
    const db = connectDB(); // Lee la base de datos
    const nuevoCamper = req.body; // Obtiene los datos del nuevo camper del cuerpo de la solicitud

      // Validacion de datos
    nuevoCamper.identificacion = db.campers.length + 1; // le pone un ID al camper cuando se registra
    db.campers.push(nuevoCamper); // Añade el nuevo camper a la base de datos
    getDB(db); // Escribe los cambios en la base de datos

    // Respuesta de confirmacion
    res.json({ mensaje: "Camper a sido registrado", camper: nuevoCamper });

});





// ==== Buscar campers por identificación y devolver error si no existe  ====

app.get('/campers/:id', (req, res) => {
    const db = connectDB(); // Lee la base de datos
    const camper = db.campers.find(c => c.identificacion == req.params.id); // Busca el camper por ID

    if (!camper) return res.status(404).json({ error: "Camper no se encontro" }); // Si no se encuentra, devuelve un error 404
    res.json(camper); // Si se encuentra, devuelve los datos del camper
})





// ==== Actualizar datos de un camper por identificación ====

app.put('/campers/:id', (req, res) => {
    const db = connectDB(); // Lee la base de datos
    const camper = db.campers.find(c => c.identificacion == req.params.id); // Busca el camper por ID

    if (!camper) return res.status(404).json({ error: "Camper no ha sido encontrado" }); // Si no se encuentra, devuelve un error 404

    Object.assign(camper, req.body); // Mezcla los datos nuevos con los viejos
    getDB(db); // Escribe los cambios en la base de datos

    res.json({ mensaje: "Camper ha sido actualizado", camper }); // Devuelve una respuesta de confirmación
})





// ==== Eliminar un camper por identificación ====

app.delete('/campers/:id', (req, res) => {
    const db = connectDB(); // Lee la base de datos
    const index = db.campers.findIndex(c => c.identificacion == req.params.id); // Busca el índice del camper por ID

    if (index === -1) return res.status(404).json({ error: "Camper no ha sido encontrado" }); // Si no se encuentra, devuelve un error 404

    db.campers.splice(index, 1); // Elimina el camper de la base de datos
    writeDB(db); // Escribe los cambios en la base de datos

    res.json({ mensaje: "Camper ha sido eliminado" }); // Devuelve una respuesta de confirmación
});

