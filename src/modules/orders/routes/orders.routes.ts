import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import OrdersController from "../controllers/OrdersController";
import isAuthenticated from "../../../shared/http/middlewares/isAuthenticated";

const ordersRouter = Router();
const ordersController = new OrdersController();

ordersRouter.use(isAuthenticated);

ordersRouter.get('/:id', celebrate({
    [Segments.PARAMS]:{
        id: Joi.string().uuid().required()
    }
}), ordersController.listById);

ordersRouter.post('/', celebrate({
    [Segments.BODY]:{
        customerId: Joi.string().uuid().required(),
        products: Joi.array().items(
            Joi.object().keys({
                id: Joi.string().uuid().required(),
                quantity: Joi.number().integer().min(1).required()
            })
        ).required()
    }
}), ordersController.create);

export default ordersRouter;