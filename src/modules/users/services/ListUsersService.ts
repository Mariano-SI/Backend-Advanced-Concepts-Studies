import { getCustomRepository } from "typeorm";
import User from "../infra/typeorm/entities/User";
import UsersRepository from "../infra/typeorm/repositories/UsersRepository";

class ListUsersService{
    public async execute(): Promise<User[]>{
        const usersRepository = getCustomRepository(UsersRepository);

        return await usersRepository.find();
    }
}

export default ListUsersService;