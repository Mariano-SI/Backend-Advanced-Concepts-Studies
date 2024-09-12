import { getCustomRepository } from "typeorm";
import UsersRepository from "../infra/typeorm/repositories/UsersRepository";
import AppError from "../../../shared/errors/AppError";
import {isAfter, addHours} from "date-fns"
import UserTokensRepository from "../infra/typeorm/repositories/UserTokensRepository";
import { hash } from "bcryptjs";

interface IRequest{
    token: string;
    newPassword: string;
}

class ResetPasswordService{
    public async execute({newPassword, token}: IRequest): Promise<void>{
        const usersRepository = getCustomRepository(UsersRepository);
        const userTokenRepository = getCustomRepository(UserTokensRepository);

        const userToken = await userTokenRepository.findByToken(token);

        if(!userToken){
            throw new AppError('Token does not exist.', 404);
        }

        const user = await usersRepository.findById(userToken.user_id);

        if(!user){
            throw new AppError('User does not exist.', 404);
        }

        const tokenMaxDuration = addHours(userToken.created_at, 2);

        if(isAfter(Date.now(), tokenMaxDuration)){
            throw new AppError('Token expired.', 401);
        }
        
        user.password = await hash(newPassword, 8);


        usersRepository.save(user);

    }
}

export default ResetPasswordService;