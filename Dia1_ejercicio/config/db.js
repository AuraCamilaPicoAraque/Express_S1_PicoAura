//Conexíon hacia la BBDD
require('dotenv').config();

const {MongoClient} = require('mongodb');

const uri = process.env.URI;
const dbName = process.env.DB_NAME;

let client;
let db;

async function connect(){
    if(db) return db; //Retorna la variable si tiene alguna conexión
    client = new MongoClient(uri);//Importa MongoClient a client
    await client.connect(); //Abre la conexión
    db = client.db(dbName);//Selecciona y anida la BBDD
    return db; // Retorna la conexión anidada a la BBDD
}

async function disconnect(){
    if(client) await client.close();
}

module.exports={connect, disconnect};