import { Request, Response } from 'express';
import ListProductsService from '../services/ListProductsService';
import ListProductByIdService from '../services/ListProductByIdService';
import CreateProductService from '../services/CreateProductService';
import UpdateProductService from '../services/UpdateProductService';
import DeleteProductService from '../services/DeleteProductService';

export default class ProductController{
    public async index(request: Request, response: Response): Promise<Response>{
        const listProducts = new ListProductsService();

        const products = await listProducts.execute();

        return response.status(200).json(products);
    }

    public async listById(request: Request, response: Response): Promise<Response>{
        const listById = new ListProductByIdService();
        const id = request.params.id;

        const product = await listById.execute({id});

        return response.status(200).json(product);
    }

    public async create(request: Request, response: Response): Promise<Response>{
        const createProduct = new CreateProductService();
        const {name, price, quantity} = request.body;

        const product = await createProduct.execute({name, price, quantity});

        return response.status(201).json(product);
    }

    public async update(request: Request, response: Response): Promise<Response>{
        const updateProduct = new UpdateProductService();
        const {id} = request.params;
        const {name, price, quantity} = request.body;

        const product = await updateProduct.execute({id, name, price, quantity});

        return response.status(200).json(product);
    }

    public async delete(request: Request, response: Response): Promise<Response>{
        const deleteProduct  = new DeleteProductService();
        const {id} = request.params;

        await deleteProduct.execute({id});

        return response.status(204).end();
    }
}