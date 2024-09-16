import AppError from "../../../shared/errors/AppError";
import { ICreateCustomer } from "../domain/models/ICreateCustomer";
import { ICustomer } from "../domain/models/ICustomer";
import { ICustomersRepository } from "../domain/repositories/ICustomersRepository";

export default class CreateCustomerService{

    private customersRepository: ICustomersRepository;

    constructor(customersRepository: ICustomersRepository){
        this.customersRepository = customersRepository;
    }

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