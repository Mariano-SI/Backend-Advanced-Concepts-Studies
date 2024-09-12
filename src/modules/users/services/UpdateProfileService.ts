import { getCustomRepository } from "typeorm";
import User from "../infra/typeorm/entities/User";
import UsersRepository from "../infra/typeorm/repositories/UsersRepository";
import AppError from "../../../shared/errors/AppError";
import {compare, hash} from "bcryptjs"

interface IRequest{
    userId: string;
    name: string;
    email: string;
    password?: string;
    oldPassword?: string;
}

class UpdateProfileService{
    public async execute({
        userId,
        name,
        email,
        password,
        oldPassword
    }:IRequest): Promise<User>{
        const usersRepository = getCustomRepository(UsersRepository);
        const user = await usersRepository.findById(userId);

        if(!user){
            throw new AppError('User not found');
        }

        const emailAlreadyInUse = await usersRepository.findByEmail(email);

        if(emailAlreadyInUse && emailAlreadyInUse.id !== userId){
            throw new AppError('There is already one user with this email');
        }

        if(password && !oldPassword){
            throw new AppError('Old password is required', 400);
        }

        if(password && oldPassword){
            const checkOldPassword = await compare(oldPassword, user.password);
            if(!checkOldPassword){
                throw new AppError("Old password does not match", 401);
            }

            user.password = await hash(password, 8);
        }

        user.name = name;
        user.email = email;

        await usersRepository.save(user);

        return user;
    }
}

export default UpdateProfileService;