import { getCustomRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken"
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import AppError from "../../../shared/errors/AppError";

interface IRequest{
    email: string;
    password: string;
}

interface IResponse{
    user: User;
    token: string;
} 
class CreateSessionService{
    public async execute({email, password}: IRequest): Promise<IResponse>{
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findByEmail(email);

        if(!user){
            throw new AppError('Invalid login credentials.', 401);
        }

        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch){
            throw new AppError('Invalid login credentials.', 401);
        }
  
        const token = sign({id:user.id}, process.env.JWT_SECRET, {
            subject: user.id,
            expiresIn: '1d'
        })
        console.log("token", token);
        return {user, token};
    }
}

export default CreateSessionService;