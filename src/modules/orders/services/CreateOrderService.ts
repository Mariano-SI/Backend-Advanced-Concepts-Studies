import { getCustomRepository } from "typeorm";

import AppError from "../../../shared/errors/AppError";
import Order from "../typeorm/entities/Order";
import OrdersRepository from "../typeorm/repositories/OrdersRepository";
import CustomersRepository from "../../customers/typeorm/repositories/CustomersRepository";
import { ProductRepository } from "../../products/typeorm/repositories/ProductsRepository";

interface IProduct{
    id: string;
    quantity: number;
}

interface IRequest{
    customerId: string,
    products: IProduct[],
}

export default class CreateOrderService{
    public async execute({customerId, products}: IRequest): Promise<Order>{
        const ordersRepository = getCustomRepository(OrdersRepository);
        const customerRepository = getCustomRepository(CustomersRepository);
        const productsRepository = getCustomRepository(ProductRepository);

        const customer = await customerRepository.findById(customerId);

        if(!customer){
            throw new AppError("Could not find any customer with the given id", 404);
        }

        const existsProducts = await productsRepository.findAllByIds(products);

        if(!existsProducts.length){
            throw new AppError("Could not find any products with the given ids", 404);
        }

        const existsProductsIds = existsProducts.map(product => product.id);

        const checkInexistentProducts = products.filter((product) => !existsProductsIds.includes(product.id));

        if(checkInexistentProducts.length){
            throw new AppError(`Could not find the following products: ${checkInexistentProducts.join(', ')}`, 404);
        }

        const quantityAvailable = products.filter((product) => existsProducts.filter(p => p.id === product.id)[0].quantity < product.quantity);

        if(quantityAvailable.length){
            throw new AppError(`The quantity ${quantityAvailable[0].quantity} is not available for ${quantityAvailable[0].id}`)
        }

        const formattedProducts = products.map((product) => ({
            product_id: product.id,
            quantity: product.quantity,
            price: existsProducts.filter(p => p.id === product.id)[0].price
        }))

        const order = await ordersRepository.createOrder({
            customer,
            products: formattedProducts
        });

        const {order_products} = order;

        const updatedProductQuantity = order_products.map(product => ({
            id: product.product_id,
            quantity:
              existsProducts.filter(p => p.id === product.product_id)[0].quantity -
              product.quantity,
        }));

        await productsRepository.save(updatedProductQuantity);

        return order;
        
    }
}