import { getCustomRepository } from "typeorm";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import AppError from "../../../shared/errors/AppError";
import UserTokensRepository from "../typeorm/repositories/UserTokensRepository";
import EtherealMail from "../../../config/mail/EtherealMail";

interface IRequest{
    email: string;
}

class SendForgotPasswordEmailService{
    public async execute({email}: IRequest): Promise<void>{
        const usersRepository = getCustomRepository(UsersRepository);
        const userTokenRepository = getCustomRepository(UserTokensRepository);

        const user = await usersRepository.findByEmail(email);

        if(!user){
            throw new AppError('User does not exist.', 404);
        }
        

        const token = await userTokenRepository.generate(user.id);

        await EtherealMail.sendMail({to: email, body: 'Solicitação de recuperação de senha recebida. Token: ' + token.token});

        //console.log(token)


    }
}

export default SendForgotPasswordEmailService;