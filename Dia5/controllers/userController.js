export class UserController{
    constructor(userService){
        this.service=userService;
    }

    // OJITOOO -> Ya estamos manejando aqui el bod/parametros/etc.... del request
    create = async (req,res)=>{};
    list = async (req,res)=>{};
    get = async (req,res)=>{}; // Obtener por ID desde el Enpoint 
    update = async (req,res)=>{};
    delete = async (req,res)=>{};
}