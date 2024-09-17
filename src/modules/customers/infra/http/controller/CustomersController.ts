import { Request, Response } from 'express';
import ListCustomersService from '../../../services/ListCustomersService';
import ListCustomerByIdService from '../../../services/ListCustomerByIdService';
import CreateCustomerService from '../../../services/CreateCustomerService';
import UpdateCustomerService from '../../../services/UpdateCustomerService';
import DeleteCustomerService from '../../../services/DeleteCustomerService';
import CustomersRepository from '../../typeorm/repositories/CustomersRepository';
import { container } from 'tsyringe';

export default class CustomersController{
    public async index(request: Request, response: Response): Promise<Response>{
        const listCustomers = new ListCustomersService();

        const customers = await listCustomers.execute();

        return response.status(200).json(customers);
    }

    public async listById(request: Request, response: Response): Promise<Response>{
        const listById = new ListCustomerByIdService();
        const id = request.params.id;

        const customer = await listById.execute({customerId: id});

        return response.status(200).json(customer);
    }

    public async create(request: Request, response: Response): Promise<Response>{
        
        const createProduct = container.resolve(CreateCustomerService);

        const {name, email} = request.body;

        const customer = await createProduct.execute({name, email});

        return response.status(201).json(customer);
    }

    public async update(request: Request, response: Response): Promise<Response>{
        const updateCustomer = new UpdateCustomerService();
        const {id} = request.params;
        const {name, email} = request.body;

        const customer = await updateCustomer.execute({id, name, email});

        return response.status(200).json(customer);
    }

    public async delete(request: Request, response: Response): Promise<Response>{
        const deleteCustomer  = new DeleteCustomerService();
        const {id} = request.params;

        await deleteCustomer.execute({id});

        return response.status(204).end();
    }
}