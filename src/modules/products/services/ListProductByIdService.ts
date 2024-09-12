import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../infra/typeorm/repositories/ProductsRepository";
import Product from "../infra/typeorm/entities/Product";
import AppError from "../../../shared/errors/AppError";

interface IRequest{
    id: string;
}

class ListProductByIdService{
    public async execute({id}: IRequest): Promise<Product | undefined>{
        const productsRepository = getCustomRepository(ProductRepository);
        const product = await productsRepository.findOne(id);
        
        if(!product){
            throw new AppError('Product not found.', 404);
        }

        return product;
    }
}

export default ListProductByIdService;