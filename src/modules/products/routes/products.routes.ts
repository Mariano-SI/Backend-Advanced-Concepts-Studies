import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import ProductController from "../controller/ProductController";
import isAuthenticated from "../../../shared/http/middlewares/isAuthenticated";

const productsRoutes = Router();

const productsController = new ProductController();

productsRoutes.use(isAuthenticated);
productsRoutes.get("/", productsController.index);

productsRoutes.get(
    "/:id",
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }), 
    productsController.listById);

productsRoutes.post(
    "/",
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            price: Joi.number().precision(2).required(),
            quantity: Joi.number().required(),
        },
    }),
    productsController.create);

productsRoutes.patch(
    "/:id",
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
        [Segments.BODY]: {
            name: Joi.string().optional(),
            price: Joi.number().optional(),
            quantity: Joi.number().optional(),
        }
    }),
    productsController.update);

productsRoutes.delete(
    "/:id",
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }), 
    productsController.delete);

export default productsRoutes;