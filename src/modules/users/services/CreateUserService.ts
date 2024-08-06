import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import AppError from "../../../shared/errors/AppError";

interface IRequest{
    name: string;
    email: string;
    password: string;
}
class CreateUserService{
    public async execute({name, email, password}: IRequest): Promise<User>{
        const usersRepository = getCustomRepository(UsersRepository);

        const emailAlreadyInUse = await usersRepository.findByEmail(email);

        if(emailAlreadyInUse){
            throw new AppError('Email address already in use.', 409);
        }

        const user = usersRepository.create({
            name, 
            email,
            password
        })

        await usersRepository.save(user);

        return user;
    }
}

export default CreateUserService;