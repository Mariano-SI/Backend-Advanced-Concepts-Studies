import { getCustomRepository } from "typeorm";
import Customer from "../typeorm/entities/Customer";
import CustomersRepository from "../typeorm/repositories/CustomersRepository";
import AppError from "../../../shared/errors/AppError";

interface IRequest{
    name: string,
    email: string,
}

export default class CreateCustomerService{
    public async execute({name, email}: IRequest): Promise<Customer>{
        const customersRepository = getCustomRepository(CustomersRepository);

        const emailAlreadyInUse = await customersRepository.findByEmail(email);

        if(emailAlreadyInUse){
            throw new AppError("Email address already in use", 409);
        }

        const customer = customersRepository.create({
            name, 
            email
        })

        await customersRepository.save(customer);

        return customer;
    }
}