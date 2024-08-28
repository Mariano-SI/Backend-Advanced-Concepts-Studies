import { getCustomRepository } from "typeorm";

import AppError from "../../../shared/errors/AppError";
import Order from "../typeorm/entities/Order";
import OrdersRepository from "../typeorm/repositories/OrdersRepository";

interface IRequest{
    id: string
}

export default class ShowOrderById{
    public async execute({id}: IRequest): Promise<Order>{
        const ordersRepository = getCustomRepository(OrdersRepository);
        
        const order = await ordersRepository.findById(id);

        if(!order){
            throw new AppError("Could not find any order with the given id", 404);
        }

        return order;  
    }
}