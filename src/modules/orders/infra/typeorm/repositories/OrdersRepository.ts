import { EntityRepository, Repository } from "typeorm";
import Order from "../entities/Order";
import { IOrdersRepository } from "../../../domain/repositories/IOrdersRepository";
import { ICreateOrder } from "../../../domain/models/ICreateOrder";

@EntityRepository(Order)
class OrdersRepository extends Repository<Order> implements IOrdersRepository {
    public async findById(id: string): Promise<Order | undefined> {
        const order = await this.findOne(id, {
            relations: ['order_products', 'customer']
        });

        return order;
    }

    public async createOrder({customer, products}:ICreateOrder): Promise<Order> {
        const order = this.create({
            customer,
            order_products: products,
        });

        await this.save(order);

        return order;
    }
}

export default OrdersRepository;