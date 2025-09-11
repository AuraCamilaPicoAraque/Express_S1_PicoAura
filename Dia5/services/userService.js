import { UserRepository } from "../repositories/userRepository";

export class UserService{
    constructor(UserRepository){
        this.repo=UserRepository
    }

    async createUser(dto){
        /*
        Logica para cuando se ingrese e correo, 
        pues no este existente..
        */
    }

    async listUser(){
        /*
        Limitar a exportar a maximo 10 
        */
    }

    async getUser(id){
        return this.repo.findByID(id);
        
    }
}