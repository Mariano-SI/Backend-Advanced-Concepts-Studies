import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";

class ListUsersServices{
    public async execute(): Promise<User[]>{
        const usersRepository = getCustomRepository(UsersRepository);

        return await usersRepository.find();
    }
}

export default ListUsersServices;