import mongoose from "mongoose";

// Valida y ademas crea el modelo de como estara estructura si tiene name, email, age estaria bien pero si añades o colocas algo mas no servira y te tirara error
// en otro caso esto lo q haces es subir ya la estructura de como estara en una coleccion de mongodb lo que puede ser bueno y a la vez malo.
const UserSchema = new mongoose.Schema({
    name:{type:String,required:true,trim:true},
    email:{type:String,required:true,unique:true,lowercase:true,trim:true},
    age:{type:Number,min:0}
},{timestamps:true});


/*
------ Clase de dominio -----
*/

class UserClass{

// literal crea la clase para la edad para saber si es mayor
    get isAdult(){
        return ( this.age ?? 0) >=18;
    }

    static async findByEmail(email){
        return this.findOne({email});
    }
}

UserSchema.loadClass(UserClass);
export const UserModel = mongoose.model("User",UserSchema);