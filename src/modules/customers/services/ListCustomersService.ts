import { getCustomRepository } from "typeorm";
import Customer from "../infra/typeorm/entities/Customer";
import CustomersRepository from "../infra/typeorm/repositories/CustomersRepository";

export default class ListCustomersService{
    public async execute(): Promise<Customer[]>{
        const customersRepository = getCustomRepository(CustomersRepository);
        const customers = await customersRepository.find();

        return customers;
    }
}