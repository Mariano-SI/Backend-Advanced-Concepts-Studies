import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";
import AppError from "../../../shared/errors/AppError";
import Product from "../typeorm/entities/Product";
import RedisCache from "../../../shared/cache/RedisCache";

interface IRequest{
    id: string;
    name: string;
    price: number;
    quantity: number;
}

class UpdateProductService{
    public async execute({id, name, price, quantity}: IRequest): Promise<Product>{
        const productsRepository = getCustomRepository(ProductRepository);
        const product = await productsRepository.findOne(id);

        if(!product){
            throw new AppError('Product not found.', 404);
        }

        if(name){
            const newNameAlreadyExists = await productsRepository.findByName(name);

            if(newNameAlreadyExists){
                throw new AppError('There is already one product with this name', 409);
            }

            product.name = name;
        }

        if(price !== undefined){
            product.price = price;
        }

        if(quantity !== undefined){
            product.quantity = quantity;
        }

        const redisCache = new RedisCache();
        await redisCache.invalidate('api-vendas-PRODUCT_LIST');
        await productsRepository.save(product);

        return product;
    }
}

export default UpdateProductService;