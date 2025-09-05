/*
-- DIA 1 --
*/
//Imporacion de express en variabe app

const express = require('express');
const app = express();

app.use(express.json());

require('dotenv').config();

// Definimos el puerto
const PORT = process.env.PORT;

//Ruta principal -> Endpoint
app.get('/', (req,res) =>{
    res.send('Holiiiis!! Bienvenido a express!')

})

// ejemplo de otro utilizando lo que seria /Mensaje1 en el localhost:3000/Mensaje1
app.get('/Mensaje1', (req,res) =>{
    res.send('Este es otro edpoint')
})

// En este caso lo que hacemos es utilizar en ves de get utilzamos el POST para comprobar el puesto , 
// entonces ahora lanzamos en la terminal y no nos saldra un codigo HTML sino el codigo de post falso.
app.post('/Mensaje1', (req,res) =>{
    res.send('Un post falso')

})

// CONVERTIMOS AHORA LA RESPUESTA EN UN ARCHIVO JSON para el puerto GET
app.get('/Mensaje2', (req,res) =>{
    res.json({
        "mensaje":"Holiii"
    })
})

// Ruta con respuesta en formato JSON
// ahora utilizaremos un let para darle variables
app.get('/Mensaje2', (req,res) =>{
    let jsonsito={
        "mensaje":"Holiii"
    };
    // res.send ('este es otro endpoitn')
    res.json(jsonsito);
})

//rUTA CON PARAMETROS
app.get('/mensajePersonalizado/:nombre', (req,res) =>{
    const nombre = req.params.nombre;
    res.send(`!Hola ${nombre}!`);
})

// RUTA POST que recibe un servidor
app.post('/mensajeJSON',(req,res) =>{
    const menJson=req.body;
    console.log(menJson);
    res.send(`!Hola ${menJson["nombre"]}, el cual tiene ${menJson["edad"]} año/s!!`);
})



// Iniciamos el servidor
app.listen(PORT,() => {
    console.log("Servidor inicializado!");
})