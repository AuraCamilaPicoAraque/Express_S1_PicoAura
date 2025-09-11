import mongoose, { mongo } from "mongoose";  // conexion para la importacion de mongoose 



export class Database{
    constructor(uri){
        this.uri=uri;
    }

    async connect(){
        try{
            mongoose.set("strictQuery", true);
            await mongoose.connect(this.uri);
            
        }catch(err){
            console.log("Error de conexión MongoDB"+err.mensaje);
            
        }
    }

    async disconnect(){
        try{
            await mongoose.disconnect();
            console.log("Base de datos Desconectada!");
            
        }catch{
            console.log("Error en MongoDB"+err.mensaje);
            
        }
    }
}