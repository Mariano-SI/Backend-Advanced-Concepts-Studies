import { getCustomRepository } from "typeorm";
import Customer from "../typeorm/entities/Customer";
import CustomersRepository from "../typeorm/repositories/CustomersRepository";
import AppError from "../../../shared/errors/AppError";

interface IRequest{
    customerId: string;
}
export default class ListCustomerByIdService{
    public async execute({customerId}: IRequest): Promise<Customer>{
        const customersRepository = getCustomRepository(CustomersRepository);

        const customer = await customersRepository.findById(customerId);

        if(!customer){
            throw new AppError("Customer not found", 404);
        }

        return customer;
    }
}