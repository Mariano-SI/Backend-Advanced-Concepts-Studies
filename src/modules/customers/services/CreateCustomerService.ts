import { inject, injectable } from "tsyringe";
import AppError from "../../../shared/errors/AppError";
import { ICreateCustomer } from "../domain/models/ICreateCustomer";
import { ICustomer } from "../domain/models/ICustomer";
import { ICustomersRepository } from "../domain/repositories/ICustomersRepository";

@injectable()
export default class CreateCustomerService{

    constructor(
        @inject("CustomersRepository")
        private customersRepository: ICustomersRepository
    ){}

    public async execute({name, email}: ICreateCustomer): Promise<ICustomer>{
        
        const emailAlreadyInUse = await this.customersRepository.findByEmail(email);

        if(emailAlreadyInUse){
            throw new AppError("Email address already in use", 409);
        }

        const customer = await this.customersRepository.create({
            name, 
            email
        });

        return customer;
    }
}