import { Router } from "express";
import {celebrate, Joi, Segments} from 'celebrate';
import isAuthenticated from "../../../../../shared/infra/http/middlewares/isAuthenticated";
import ProfileController from "../controller/ProfileController";


const profileRoutes = Router();
const profileController = new ProfileController();

profileRoutes.use(isAuthenticated);

profileRoutes.get('/', profileController.show);
profileRoutes.put(
    '/',
    celebrate(
        {
            [Segments.BODY]:{
                name: Joi.string().required(),
                email: Joi.string().email().required(),
                oldPassword: Joi.string(),
                password: Joi.string().optional(),
                passwordConfirmation: Joi.string()
                .valid(Joi.ref('password'))
                .when('password', {is: Joi.exist(), then: Joi.required()})

            }
        }
    ),
profileController.update)

export default profileRoutes;