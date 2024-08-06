import { getCustomRepository } from "typeorm";
import { compare } from "bcryptjs";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import AppError from "../../../shared/errors/AppError";

interface IRequest{
    email: string;
    password: string;
}

interface IResponse{
    user: User;
    token?: string;
} 
class CreateSessionService{
    public async execute({email, password}: IRequest): Promise<IResponse>{
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findByEmail(email);

        if(!user){
            throw new AppError('Invalid login credentials.', 401);
        }

        const passowrdMatch = await compare(password, user.password);

        if(!passowrdMatch){
            throw new AppError('Invalid login credentials.', 401);
        }
        
        return {user};
    }
}

export default CreateSessionService;