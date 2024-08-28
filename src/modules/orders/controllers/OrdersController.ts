import { Request, Response } from 'express';
import ShowOrderById from '../services/ShowOrderById';
import CreateOrderService from '../services/CreateOrderService';

export default class OrdersController{
    public async listById(request: Request, response: Response): Promise<Response>{
        const showOrderById = new ShowOrderById();
        const id = request.params.id;

        const order = await showOrderById.execute({id});

        return response.status(200).json(order);
    }

    public async create(request: Request, response: Response): Promise<Response>{
        const createOrder = new CreateOrderService();
        const {customerId, products} = request.body;

        const order = await createOrder.execute({customerId, products});

        return response.status(201).json(order);
    }
}