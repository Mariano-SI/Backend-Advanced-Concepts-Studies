import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import AppError from "../../../shared/errors/AppError";
import { hash } from "bcryptjs";


interface IRequest{
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}
class CreateUserService{
    public async execute({name, email, password, confirmPassword}: IRequest): Promise<User>{
        const usersRepository = getCustomRepository(UsersRepository);

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&+=-])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!passwordRegex.test(password)) {
            throw new AppError('Password does not meet the requirements.', 400);
        }

        if(password !== confirmPassword){
            throw new AppError('Password and confirm password does not match.', 400);
        }

        const hashedPassword = await hash(password, 8);

        const emailAlreadyInUse = await usersRepository.findByEmail(email);

        if(emailAlreadyInUse){
            throw new AppError('Email address already in use.', 409);
        }

        const user = usersRepository.create({
            name, 
            email,
            password: hashedPassword
        })

        await usersRepository.save(user);

        return user;
    }
}

export default CreateUserService;